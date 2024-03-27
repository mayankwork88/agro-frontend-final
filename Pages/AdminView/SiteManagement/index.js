import React, { useState } from "react";
import {
  AppLayout,
  TabPaneV2,
  CustomTable,
  CustomPagination,
  CustomModal,
  MessageModalContent,
  AssignUserModalContent,
  CustomLabel,
  TableSkeleton,
} from "../../../components";
import { ViewButton, Heading16 } from "../../../components/CustomComponent";
import { Box, Stack, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { headerTabsData } from "../Data";
import {
  AddCircleOutlineIcon,
  DeleteOutlineOutlinedIcon,
} from "../../../icons";
import { useTheme } from "@emotion/react";
import AddSite from "./Site/AddSite/AddSite";
import useAddSiteContext from "../../../hooks/Admin/useAddSiteContext";
import useUserManagementContext from "../../../hooks/Admin/useUserManagementContext";
import useViewSiteContext from "../../../hooks/Admin/useViewSiteContext";
import PairDevice from "./Site/PairDevice";
import { usePairDeviceContext } from "../../../context/Admin/Site/PairDeviceContext";

const AdminSiteManagement = () => {
  const [paginationPageNo, setPaginationPageNo] = useState(1);
  const [modalContentType, setModalContentType] = useState(null);
  const [selectedSiteForDeletion, setSelectedSiteForDeletion] = useState(null);

  const navigate = useNavigate();
  const theme = useTheme();
  const {
    adminSiteModal,
    setAdminSiteModal,
    allSites,
    selectedUserToAssignSite,
    setSelectedUserToAssignSite,
    handleAssignUserToSite,
    customError,
    setCustomError,
    handleDeleteSite,
    handleSiteQuery,
    allSitesDataLength,
    allSitePagination,
    setAllSitePagination,
    showMessageModal,
    handleShowMessageModalClose,
    openBackdropLoader,
    setAddSiteDetails,
    addSiteInitialState,
    setActiveStep,
  } = useAddSiteContext();
  const { setSelectedSite } = usePairDeviceContext();
  const { snackbarAlert, onSnackbarAlertClose } = useViewSiteContext();
  const { users } = useUserManagementContext();
  const pageCount = Math.ceil(allSitesDataLength / 10);

  const headData = [
    "UID",
    "name",
    "gateways",
    "devices",
    "alerts",
    "status",
    "View Details",
    "Assign User",
    "Delete",
  ];

  const getStatus = (str) => {
    if (str?.toUpperCase() === "PAIRED")
      return { status: "Paired", color: "success" };
    else if (str?.toUpperCase() === "NOT_PAIRED")
      return { status: "Not Paired", color: "warning" };
    else if (str?.toUpperCase() === "PAIRING")
      return { status: "Pairing...", color: "info" };
    else if (str?.toUpperCase() === "NOT_ASSIGNED")
      return { status: "Not Assigned", color: "error" };
    else return { status: "Error", color: "error" };
  };

  const getStatusInfo = (ele) => {
    if (ele?.status?.toUpperCase() === "NOT_PAIRED") {
      return [
        <Button
          variant="contained"
          sx={{
            background: theme.palette?.warning?.light,
            "&:hover": {
              background: theme.palette?.warning?.main,
            },
          }}
          onClick={() => {
            setSelectedSite(ele?._id);
            handleModal("pairDevice");
          }}
        >
          Not Paired
        </Button>,
      ];
    } else {
      return [
        <CustomLabel
          sx={{ width: "120px", mx: "auto", borderRadius: "4px" }}
          text={getStatus(ele?.status)?.status}
          type={getStatus(ele?.status)?.color}
        />,
      ];
    }
  };

  const onViewClick = (ele) => {
    navigate(`/admin/site-management/site/${ele?._id}`);
    localStorage.setItem("currentTab", 0);
  };
  const getFormattedData = (data) => {
    return data?.map((ele) => ({
      Uid: ele?.uid,
      siteName: ele?.name,
      Gateways: ele?.gatewayCount,
      devices: ele?.deviceCount,
      alerts: [
        <Heading16 sx={{ color: theme.palette.error.main }}>
          {ele?.alertCount}
        </Heading16>,
      ],
      status: getStatusInfo(ele),
      viewDetails: [
        <ViewButton onClick={() => onViewClick(ele)}>View</ViewButton>,
      ],
      assignUser: [
        <IconButton
          aria-label="add"
          disabled={ele?.assignedUser ? true : false}
          onClick={() => {
            handleModal("addUser");
            setSelectedUserToAssignSite({
              ...selectedUserToAssignSite,
              site: ele?._id,
            });
          }}
        >
          <AddCircleOutlineIcon
            fontSize="medium"
            sx={{ color: ele?.assignedUser ? "" : theme.palette.primary.main }}
          />
        </IconButton>,
      ],
      Delete: [
        <IconButton
          aria-label="delete"
          disabled={ele?.status !== "not_assigned"}
          onClick={() => {
            +handleModal("deleteSite");
            setSelectedSiteForDeletion(ele?._id);
          }}
        >
          <DeleteOutlineOutlinedIcon fontSize="medium" />
        </IconButton>,
      ],
    }));
  };

  const handleAssignUserToSiteCancel = () => {
    setSelectedUserToAssignSite({ site: null, user: null });
    setCustomError({
      error: false,
    });
  };

  const getModalContext = (type) => {
    if (type === "deleteSite")
      return (
        <MessageModalContent
          onCancel={() => setAdminSiteModal(false)}
          onConfirm={() => handleDeleteSite(selectedSiteForDeletion)}
        />
      );
    else if (type === "addUser")
      return (
        <AssignUserModalContent
          checkbox={false}
          title="Assign User"
          searchLabel="Search User by Id or name"
          data={users}
          selectedValues={[selectedUserToAssignSite?.user]}
          customError={customError}
          onChange={(e) =>
            setSelectedUserToAssignSite({
              ...selectedUserToAssignSite,
              user: e.target.value,
            })
          }
          handleCancel={() => {
            setAdminSiteModal(false);
            handleAssignUserToSiteCancel();
          }}
          handleSubmit={handleAssignUserToSite}
        />
      );
    else if (type === "addSite") return <AddSite />;
    else if (type === "pairDevice") return <PairDevice />;
  };

  const handleModal = (type) => {
    setModalContentType(type);
    setAdminSiteModal(true);
  };

  const handleModalClose = (type) => {
    setAdminSiteModal(false);

    if (type === "addSite") {
      setAddSiteDetails(addSiteInitialState);
      setActiveStep(0);
    } else if (type === "addUser") {
      handleAssignUserToSiteCancel();
    }
  };

  return (
    <AppLayout
      headerTabsData={headerTabsData}
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      onAlertClose={onSnackbarAlertClose}
      openBackdropLoader={openBackdropLoader}
      successModalMessage={showMessageModal?.message}
      openMessageModal={showMessageModal?.open}
      setOpenMessageModal={handleShowMessageModalClose}
      modalContentType={showMessageModal?.type}
      onDeleteModalYes={() => {}}
      onDeleteModalNo={() => {}}
    >
      <Stack direction={"column"} gap={5}>
        <TabPaneV2
          searchLabel="Search Site Name/UID"
          paneText="site management"
          paneTextColor="#000"
          btnText="add site"
          onBtnClick={() => handleModal("addSite")}
          onSearch={handleSiteQuery}
          // onBtnClick={() => navigate("/admin/add-site")}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 3,
          }}
        >
          {openBackdropLoader ? (
            <TableSkeleton
              rowNumber={new Array(10).fill(0)}
              tableCell={new Array(9).fill("10%")}
            />
          ) : (
            <CustomTable
              headBackgroundColor="#EAF2E6"
              tableHeadData={headData}
              tableRowData={getFormattedData(allSites)}
            />
          )}

          {!openBackdropLoader && allSitesDataLength > 10 ? (
            <Box sx={{ alignSelf: "flex-end" }}>
              <CustomPagination
                size="large"
                page={allSitePagination}
                count={pageCount}
                onPageChange={(pageNo) => setAllSitePagination(pageNo)}
              />
            </Box>
          ) : null}
        </Box>
        <CustomModal
          content={getModalContext(modalContentType)}
          openModal={adminSiteModal}
          handleClose={() => handleModalClose(modalContentType)}
          background="#fff"
          customWidth={modalContentType === "deleteSite" ? "22%" : null}
        />
      </Stack>
    </AppLayout>
  );
};

export default AdminSiteManagement;
