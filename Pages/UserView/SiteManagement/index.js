import React, { useState } from "react";
import {
  AppLayout,
  TabPaneV2,
  CustomTable,
  CustomPagination,
  CustomModal,
} from "../../../components";
import { ViewButton } from "../../../components/CustomComponent";
import { Box, Stack } from "@mui/material";
import AddSiteModalContent from "./AddSiteModalContent";
import { useNavigate } from "react-router-dom";

const UserSiteManagement = () => {
  const [paginationPageNo, setPaginationPageNo] = useState(1);
  const pageCount = 10;
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  
  const headData = ["alert name", "device name", "alert value", "action"];
  const rowData = [
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
    },
    {
      alertName: "Soil is too dry",
      deviceName: "Branch Manager 1",
      alertValue: "25%",
      action: [<ViewButton>View</ViewButton>],
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
    <AppLayout headerTabsData={headerTabsData}>
      <Stack direction={"column"} gap={5}>
        <TabPaneV2
          paneText="site management"
          paneTextColor="#000"
          btnText="add site"
          onBtnClick={() => navigate("/user/add-site")}
        />
        <CustomTable
          headBackgroundColor="#EAF2E6"
          tableHeadData={headData}
          tableRowData={rowData}
        />
        <Box sx={{ alignSelf: "flex-end" }}>
          <CustomPagination
            size="large"
            page={paginationPageNo}
            count={pageCount}
            onPageChange={(pageNo) => setPaginationPageNo(pageNo)}
          />
        </Box>
      </Stack>
      <CustomModal
        content={<AddSiteModalContent />}
        openModal={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </AppLayout>
  );
};

export default UserSiteManagement;
