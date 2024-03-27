import React, { useEffect } from "react";
import {
  Heading12,
  Heading16,
  LabelLight,
  Label,
} from "../../../../../components/CustomComponent";
import {
  CustomTable,
  GetMap,
  NoData,
  ParameterCard,
} from "../../../../../components";
import { Stack, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";
import { useParams } from "react-router-dom";
import { parameterData, exclude } from "../../../../../Data/parameterData";
import useFormattedDate from "../../../../../hooks/useFormattedDate";
import useDeviceContext from "../../../../../hooks/Admin/useDeviceContext";
import { alertsFormattedData } from "../../../FormattedData";

const Overview = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { getFormattedDate } = useFormattedDate();
  const {
    getLastUpdatedSensorData,
    lastUpdatedSensorData,
    getDeviceAlerts,
    allAlerts,
    allAlertsDataLength,
  } = useViewSiteContext();
  const { getAllAssignedNodesOfABM, allAssignedNodesOfABM } =
    useDeviceContext();

  useEffect(() => {
    const filters = { assignedBranchManager: id };
    // getDeviceDetailByIdSiteContext(id);
    const filters2 = { assignedBranchManager: id };
    getLastUpdatedSensorData(filters2);
    getDeviceAlerts(filters);
    getAllAssignedNodesOfABM(id);
  }, [id]);

  const headData = [
    "alert name",
    "UID",
    "device name",
    "Timestamp",
    "parameters",
    "threshold value",
    "alert value",
  ];

  const rowData = [
    {
      alertName: [
        <Heading16 sx={{ color: theme.palette.error.main }}>
          Soil is too dry
        </Heading16>,
      ],
      uid: "908700",
      deviceName: "BM01",
      time: "23-09-2023, 09:09pm",
      parameters: "Moisture",
      thresholdValue: "25%",
      alertValue: "25%",
    },
  ];

  const getLocation = (devices) => {
    const loc = devices?.find(
      (ele) => ele?.type === "node"
    )?.location;
    return {
      lat: loc?.latitude,
      lng: loc?.longitude,
    };
  };

  return (
    <Stack direction={"column"} gap={5}>
      <Stack direction={"row"} gap={5}>
        <Stack
          direction={"column"}
          width={"30%"}
          sx={{
            border: "2px solid #eeeeee",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              background: theme.palette.primary.light,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: theme.spacing(1, 2),
            }}
          >
            <Heading16>Soil Parameter</Heading16>
            <Heading12>
              {lastUpdatedSensorData?.updatedAt ? "Updated on" : ""} <br />
              {lastUpdatedSensorData?.updatedAt &&
                getFormattedDate(lastUpdatedSensorData?.updatedAt)}
            </Heading12>
          </Box>
          {lastUpdatedSensorData &&
          Object.keys(lastUpdatedSensorData).length ? (
            <Stack direction={"row"} flexWrap={"wrap"}>
              {Object?.keys(lastUpdatedSensorData)
                ?.filter((ele) => !exclude?.includes(ele))
                ?.map((key, ind) => (
                  <ParameterCard
                    sx={{
                      borderBottom: "2px solid #eeeeee",
                      borderRight: `${
                        ind % 2 === 0 ? "2px solid #eeeeee" : null
                      }`,
                      p: theme.spacing(2, 3),
                      width: "50%",
                    }}
                    title={
                      parameterData?.find(
                        (ele) =>
                          ele?.value?.toLowerCase() === key?.toLowerCase()
                      )?.label
                    }
                    value={lastUpdatedSensorData[key]}
                    suffix={
                      parameterData?.find(
                        (ele) => ele.value?.toLowerCase() === key?.toLowerCase()
                      )?.unit
                    }
                  />
                ))}
            </Stack>
          ) : (
            <Stack
              height={"100%"}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <NoData NoBorder={true} message="nothing to show" />
            </Stack>
          )}
        </Stack>
        <Stack width={"70%"} gap={2}>
          {/* <LabelLight>Soil Type: Loamy Soil</LabelLight> */}
          <GetMap
            mapWidth="100%"
            mapHeight="550px"
            locationCoordinates={getLocation(allAssignedNodesOfABM)}
            markers={allAssignedNodesOfABM}
          />
        </Stack>
      </Stack>
      {/* <Label>
        <Heading16 sx={{ color: "#232323" }}>Description :</Heading16>
        <Heading12 sx={{ color: "#595959", fontSize: "14px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore.
        </Heading12>
      </Label> */}
      {allAlertsDataLength ? (
        <CustomTable
          paneText="sites"
          btnText="see all"
          onClick={() => {}}
          headBackgroundColor="#EAF2E6"
          tableHeadData={headData}
          tableRowData={alertsFormattedData(allAlerts)?.slice(0, 5)}
        />
      ):null}
    </Stack>
  );
};

export default Overview;
