import React, { useState, useEffect } from "react";
import { Heading16 } from "../../../../../components/CustomComponent";
import {
  CustomTable,
  CustomPagination,
  NoData,
  DateRangeTabPane,
} from "../../../../../components";
import { Stack, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import { alertsFormattedData } from "../../../FormattedData";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";

const Alerts = () => {
  const theme = useTheme();
  const { getDeviceAlerts, allAlerts, allAlertsDataLength } =
    useViewSiteContext();
  const { id } = useParams();
  const [pagination, setPagination] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const filters = { deviceId: id };
    getDeviceAlerts(filters, pagination, selectedDate);
  }, [pagination, selectedDate]);

  const headData = [
    "alert name",
    "UID",
    "device name",
    "Timestamp",
    "parameters",
    "threshold value",
    "alert value",
  ];

  return (
    <Stack direction={"column"} gap={5}>
      <DateRangeTabPane
        tabText={`showing ${
          allAlertsDataLength > 10 ? 10 : allAlertsDataLength
        } out of ${allAlertsDataLength}`}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {allAlertsDataLength ? (
        <CustomTable
          paneText="Alerts"
          headBackgroundColor="#EAF2E6"
          tableHeadData={headData}
          tableRowData={alertsFormattedData(allAlerts)}
        />
      ) : (
        <NoData message="No Data Found" />
      )}
      {allAlertsDataLength > 10 ? (
        <Box sx={{ alignSelf: "flex-end" }}>
          <CustomPagination
            size="large"
            page={pagination}
            count={Math.ceil(allAlertsDataLength / 10)}
            onPageChange={(pageNo) => setPagination(pageNo)}
          />
        </Box>
      ) : null}
    </Stack>
  );
};

export default Alerts;
