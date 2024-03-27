import { Stack, IconButton, Button, Box } from "@mui/material";
import { Heading20, Label } from "../../../../../components/CustomComponent";
import { CloseIcon } from "../../../../../icons";
import { ThresholdCard } from "../../../../../components";
import { useEffect, useState } from "react";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";
import { useParams } from "react-router-dom";

const SetThreshold = ({ setOpenThresholdModal }) => {
  const {
    getThresholds,
    thresholds,
    setThresholds,
    setEditThresholds,
    editThreshold,
    setEditThreshold,
    thresholdSite,
  } = useViewSiteContext();
  const { id } = useParams();

  useEffect(() => {
    if (id) getThresholds(id);
  }, [id]);

  const getFlex = (direction, justify, items, gap) => {
    return {
      display: "flex",
      flexDirection: direction,
      justifyContent: justify,
      alignItems: items,
      gap: gap || 0,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameArray = name?.split("_");

    const updatedThresholds = {
      ...thresholds,
      [`${nameArray[0]}`]: {
        ...thresholds[`${nameArray[0]}`],
        [nameArray[1]]: {
          ...thresholds[nameArray[0]][nameArray[1]],
          [nameArray[2]]: parseInt(value) || 0,
        },
      },
    };

    setThresholds(updatedThresholds);
  };

  const th = {
    nitrate: {
      6: {
        min: 20,
        max: 60,
      },
      12: {
        min: 20,
        max: 60,
      },
      18: {
        min: 20,
        max: 60,
      },
    },
    oxygen: {
      6: {
        min: 20,
        max: 60,
      },
    },
  };
  return (
    <Stack width="100%" p={2}>
      <Box sx={getFlex("row", "space-between", "center")}>
        <Heading20>Threshold Values</Heading20>
        <IconButton
          aria-label="add"
          onClick={() => setOpenThresholdModal(false)}
        >
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>
      <Box sx={{ ...getFlex("row", "space-between", "center"), pb: 3, pt: 1 }}>
        <Label sx={{ fontSize: "14px" }}>
          Site Name: {thresholdSite?.name}
        </Label>
        <Box sx={getFlex("row", "center", "center", 2)}>
          <Button
            variant="outlined"
            onClick={() => setEditThresholds(id, "reset")}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              editThreshold
                ? setEditThresholds(id, "update")
                : setEditThreshold(!editThreshold)
            }
          >
            {editThreshold ? "Save" : "Edit"}
          </Button>
        </Box>
      </Box>
      <Stack
        direction={"row"}
        sx={{
          overflowY: "scroll",
          flexWrap: "wrap",
          height: "55vh",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
          px: 1,
        }}
      >
        {Object.keys(thresholds)?.toReversed()?.map((ele) => (
          <ThresholdCard
            isEdit={editThreshold}
            title={ele}
            thresholds={thresholds[ele]}
            data={thresholds}
            handleChange={handleChange}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default SetThreshold;
