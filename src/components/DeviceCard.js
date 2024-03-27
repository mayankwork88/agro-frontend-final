import { Stack, Box } from "@mui/material";
import React, { useState } from "react";
import {
  TabPane,
  ParameterCard,
  ButtonGroupToggle,
  CustomLabel,
  NoData,
} from "../components";
import { useNavigate } from "react-router-dom";
import {
  Heading12,
  Heading16,
  Heading20,
  Heading24,
  ViewButton,
} from "../components/CustomComponent";
import { useTheme } from "@emotion/react";
import { parameterData } from "../Data/parameterData";

const DeviceCard = ({ deviceData, sensorData }) => {
  const [activeTab, setActiveTab] = useState("0");
  const theme = useTheme();
  const navigate = useNavigate();

  const exclude = [
    "_id",
    "siteId",
    "__v",
    "deviceId",
    "assignedGateway",
    "assignedBranchManager",
    "depth",
    "createdAt",
    "updatedAt",
    "battery",
  ];

  const activeSensorData = sensorData?.toSorted((a, b) => a.depth - b.depth)[
    activeTab === "0" ? 0 : Number(activeTab)
  ];

  console.log(deviceData, "dcjbdhbchdbhcbhbhbhbhbhbh");

  const onViewClick = (ele) => {
    const prev = JSON.parse(localStorage.getItem("breadcrumb"));
    const newData = [
      ...prev,
      {
        label: ele?.uid,
        link: `admin/site-management/${ele?.type}/${ele?._id}`,
      },
    ];
    localStorage.setItem("breadcrumb", JSON.stringify(newData));
    navigate(`/admin/site-management/${ele?.type}/${ele?._id}`);
    localStorage.setItem("currentTab", 0);
  };

  return (
    <Stack
      direction={"column"}
      width={"23%"}
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        my: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: theme.spacing(1, 2),
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Heading20 sx={{ display: "flex", alignItems: "center" }}>
            {deviceData?.uid}
            {/* <Heading16 sx={{ color: "#777777" }}>(BM)</Heading16> */}
          </Heading20>
          <ViewButton onClick={() => onViewClick(deviceData)}>
            See details
          </ViewButton>
        </Box>
        <CustomLabel
          sx={{ px: 1.5, py: 1.5 }}
          size="md"
          text={`${deviceData?.alerts || 0} Alerts`}
          type="error"
        />
      </Box>
      <ButtonGroupToggle activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeSensorData && Object?.keys(activeSensorData)?.length ? (
        <Stack direction={"row"} flexWrap={"wrap"}>
          {activeSensorData &&
            Object?.keys(activeSensorData)
              .filter((ele) => !exclude?.includes(ele))
              .map((key, ind) => (
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
                      (ele) => ele?.value?.toLowerCase() === key?.toLowerCase()
                    )?.label
                  }
                  value={activeSensorData[key]}
                  suffix={
                    parameterData?.find(
                      (ele) => ele.value?.toLowerCase() === key?.toLowerCase()
                    )?.unit
                  }
                />
              ))}
        </Stack>
      ) : (
        <Box sx={{ p: 2 }}>
          <NoData message="nothing to show" NoBorder={true} />
        </Box>
      )}
    </Stack>
  );
};

export default DeviceCard;
