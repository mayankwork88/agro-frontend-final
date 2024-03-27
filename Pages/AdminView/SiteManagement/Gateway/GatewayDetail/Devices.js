import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { TabPane, DeviceCard } from "../../../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";

const Devices = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = useParams();
  const { getDeviceWithSensorDate, deviceWithSensorDate } =
    useViewSiteContext();

  useEffect(() => {
    const filter = { assignedGateway: id };
    getDeviceWithSensorDate(filter);
  }, [id]);
  return (
    <Stack direction={"column"} gap={5}>
      <TabPane
        paneText="Showing 10 out of 20"
        paneTextColor="#000"
        searchLabel="Search by Name/UID"
        onSearch={() => {}}
      />
      <Stack
        direction={"row"}
        justifyContent={
          deviceWithSensorDate?.length > 3 ? "space-between" : "flex-start"
        }
        flexWrap={"wrap"}
        gap={deviceWithSensorDate?.length > 3 ? 0 : 4}
      >
        {deviceWithSensorDate?.map((ele) => (
          <DeviceCard
            deviceData={ele?.device}
            sensorData={ele?.lastSensorData}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Devices;
