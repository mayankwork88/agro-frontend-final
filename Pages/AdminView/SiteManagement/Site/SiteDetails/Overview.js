import React, { useEffect } from "react";
import {
  Heading12,
  Heading16,
  LabelLight,
} from "../../../../../components/CustomComponent";
import {
  CustomTable,
  GetMap,
  NoData,
  ParameterCard,
  Skeleton,
  TableSkeleton,
} from "../../../../../components";
import { Stack, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";
import useFormattedDate from "../../../../../hooks/useFormattedDate";
import { parameterData, exclude } from "../../../../../Data/parameterData";
import { alertsFormattedData } from "../../../FormattedData";

const Overview = () => {
  const theme = useTheme();
  const { id } = useParams();
  const {
    getDeviceDetailByIdSiteContext,
    deviceDetails,
    getLastUpdatedSensorData,
    lastUpdatedSensorData,
    getDeviceAlerts,
    allAlerts,
    getDeviceBySiteId,
    getAllGateways,
    allAlertsDataLength,
    openBackdropLoader,
  } = useViewSiteContext();
  const { getFormattedDate } = useFormattedDate();

  useEffect(() => {
    const filters = { siteId: id };
    const filter2 = { siteId: id };
    getDeviceDetailByIdSiteContext(id);
    getLastUpdatedSensorData(filter2);
    getDeviceAlerts(filters, 1, new Date());
    getDeviceBySiteId(id, {});
  }, [id]);

  const headData = [
    "alert name",
    "UID",
    "device name",
    "Time",
    "parameters",
    "threshold value",
    "alert value",
  ];

  const getLocation = (devices) => {
    const loc = devices?.find((ele) => ele?.type === "gateway")?.location;
    return {
      lat: loc?.latitude,
      lng: loc?.longitude,
    };
  };
  return (
    <Stack direction={"column"} gap={5}>
      <Stack direction={"row"} gap={5}>
        {openBackdropLoader ? (
          <Skeleton width="30%" height={"55vh"} sx={{ borderRadius: "16px" }} />
        ) : (
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
                {lastUpdatedSensorData?.updatedAt ? "Updated on" : ""} <br />{" "}
                {lastUpdatedSensorData?.updatedAt &&
                  getFormattedDate(lastUpdatedSensorData?.updatedAt)}
              </Heading12>
            </Box>

            {lastUpdatedSensorData &&
            Object?.keys(lastUpdatedSensorData)?.length ? (
              <Stack direction={"row"} flexWrap={"wrap"}>
                {lastUpdatedSensorData &&
                  Object?.keys(lastUpdatedSensorData)
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
                            (ele) =>
                              ele.value?.toLowerCase() === key?.toLowerCase()
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
        )}
        {openBackdropLoader ? (
          <Skeleton width="70%" height={"55vh"} />
        ) : (
          <Stack width={"70%"} gap={2}>
            {/* <LabelLight>Soil Type: Loamy Soil</LabelLight> */}
            <GetMap
              mapWidth="100%"
              mapHeight="55vh"
              locationCoordinates={getLocation(getAllGateways)}
              markers={getAllGateways}
            />
          </Stack>
        )}
      </Stack>
      {openBackdropLoader ? (
        <TableSkeleton
          rowNumber={new Array(5).fill(0)}
          tableCell={new Array(7).fill("12%")}
        />
      ) : allAlertsDataLength ? (
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
