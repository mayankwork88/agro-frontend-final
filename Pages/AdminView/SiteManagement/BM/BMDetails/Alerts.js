import {useState, useEffect} from "react";
import {
  Heading16,
} from "../../../../../components/CustomComponent";
import {
  CustomTable,
  CustomPagination,
  NoData
} from "../../../../../components";
import { Stack, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";
import { useParams } from "react-router-dom";
import { alertsFormattedData } from "../../../FormattedData";

const Alerts = () => {
  const theme = useTheme();
  const { getDeviceAlerts, allAlerts, allAlertsDataLength } =
  useViewSiteContext();

  const { id } = useParams();
  const [pagination, setPagination] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const filters = { siteId: id };
    getDeviceAlerts(filters, pagination, selectedDate);
  }, [pagination, selectedDate]);
  
  const headData = [
    "alert name",
    "UID",
    "device name",
    "Time",
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

  return (
    <Stack direction={"column"} gap={5}>
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
