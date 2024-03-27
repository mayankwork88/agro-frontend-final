import React, { useEffect } from "react";
import {
  Heading12,
  Heading16,
  LabelLight,
  Label,
} from "../../../../../components/CustomComponent";
import { CustomTable, GetMap } from "../../../../../components";
import { Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
import useAddSiteContext from "../../../../../hooks/Admin/useAddSiteContext";
import { useParams } from "react-router-dom";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";
import { alertsFormattedData } from "../../../FormattedData";

const Overview = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { getAllDevicesConnectedWithGateway, allDevicesConnectedWithGateway } =
    useAddSiteContext();
  const { getDeviceAlerts, allAlerts, allAlertsDataLength } =
    useViewSiteContext();

  useEffect(() => {
    const filters = { assignedGateway: id };
    getDeviceAlerts(filters, 1, new Date());
    getAllDevicesConnectedWithGateway(id);
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
      alertName: (
        <Heading16 sx={{ color: theme.palette.error.main }}>
          Soil is too dry
        </Heading16>
      ),
      uid: "009871",
      deviceName: "BMO11",
      timestamp: "23-09-2023, 09:09pm",
      parameter: "Moisture",
      thresholdValue: "25%",
      alertValue: "25%",
    },
  ];

  const headerTabsData = [
    {
      label: "Dashboard",
      link: "user/dashboard",
    },
    {
      label: "site management",
      link: "user/site-management",
    },
  ];

  const getLocation = (devices) => {
    const loc = devices?.find(
      (ele) => ele?.type === "branch_manager"
    )?.location;
    return {
      lat: loc?.latitude,
      lng: loc?.longitude,
    };
  };

  return (
    <Stack direction={"column"} gap={5}>
      <Stack direction={"column"} gap={2}>
        {/* <LabelLight sx={{ color: "#000" }}>Soil Type: Loamy Soil</LabelLight> */}
        <GetMap
          mapWidth="100%"
          mapHeight="390px"
          locationCoordinates={getLocation(
            allDevicesConnectedWithGateway.devices
          )}
          markers={allDevicesConnectedWithGateway.devices}
        />
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
          paneText="alerts"
          headBackgroundColor="#EAF2E6"
          tableHeadData={headData}
          tableRowData={alertsFormattedData(allAlerts)?.slice(0, 5)}
        />
      ) : null}
    </Stack>
  );
};

export default Overview;
