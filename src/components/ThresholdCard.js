import { Stack, Box } from "@mui/material";
import { Heading16, Heading12, Heading20 } from "../components/CustomComponent";
import { useTheme } from "@emotion/react";
import { CustomTextField } from "../components";

const ThresholdCard = ({ isEdit, title, thresholds, handleChange }) => {
  const theme = useTheme();

  const getFlex = (direction, justify, items, gap) => {
    return {
      display: "flex",
      flexDirection: direction,
      justifyContent: justify,
      alignItems: items,
      gap: gap || 0,
    };
  };

  const getThresholdValue = (depth, name, value, onChange) => {
    return (
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box
          width="30%"
          p={1.5}
          sx={{
            ...getFlex("row", "center", "center"),
            borderRight: "1px solid #dddddd",
          }}
        >
          <Heading20>{depth}`</Heading20>
        </Box>
        <Box width="70%" sx={getFlex("row", "space-evenly", "center")}>
          <Box sx={{ width: "60px" }}>
            <CustomTextField
              sx={{mt:-0.5}}
              placeholder="Min"
              customHeight={"3vh"}
              disabled={!isEdit}
              name={`${name}_min`}
              type={"number"}
              select={false}
              value={value?.min}
              onInputChange={onChange}
              background="#fff"
            />
          </Box>
          <Box sx={{ width: "60px" }}>
            <CustomTextField
              sx={{mt:-0.5}}
              placeholder="Max"
              type={"number"}
              customHeight={"3vh"}
              disabled={!isEdit}
              name={`${name}_max`}
              select={false}
              value={value?.max}
              onInputChange={onChange}
              background="#fff"
            />
          </Box>
        </Box>
      </Box>
    );
  };

  const getThresholdHeader = (title) => {
    return (
      <Box
        sx={{
          display: "flex",
          background: theme.palette.primary.light,
        }}
      >
        <Box
          width="30%"
          sx={{
            ...getFlex("column", "flex-start", "center", 0.5),
            p: 1.5,
            borderRight: "1px solid #dddddd",
          }}
        >
          <Heading16>Depth</Heading16>
          <Heading12 sx={{ color: "#8F8F8F" }}>(Inch)</Heading12>
        </Box>
        <Box
          width="70%"
          sx={{ ...getFlex("column", "space-between", "center", 1), p: 1.5 }}
        >
          <Heading16>{title}</Heading16>
          <Box width="100%" sx={getFlex("row", "space-evenly", "center")}>
            <Heading16 sx={{ color: "#8F8F8F" }}>Min</Heading16>
            <Heading16 sx={{ color: "#8F8F8F" }}>Max</Heading16>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Stack
      width="270px"
      sx={{
        border: "1px solid #DDDDDD",
        m: 1,
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {getThresholdHeader(title)}
      {Object.keys(thresholds).map((el) =>
        getThresholdValue(el, `${title}_${el}`, thresholds[el], handleChange)
      )}
    </Stack>
  );
};

export default ThresholdCard;
