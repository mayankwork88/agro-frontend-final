import React, { useEffect, useState } from "react";
import {
  AppLayout,
  TabPaneV2,
  CustomTable,
  CustomPagination,
  CustomModal,
  MessageModalContent,
  AssignUserModalContent,
  NoData,
  TableSkeleton,
} from "../../../components";
import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { headerTabsData } from "../Data";
import { useTheme } from "@emotion/react";
import useUserManagementContext from "../../../hooks/Admin/useUserManagementContext";
import AddUserModalContent from "./AddUserModalContent";
import { getUserFormattedData } from "../FormattedData";
import useAddSiteContext from "../../../hooks/Admin/useAddSiteContext";

const UserManagement = () => {
  const [actionUserId, setActionUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    users,
    totalDataCount,
    paginationPageNo,
    setPaginationPageNo,
    openAddUserModal,
    setOpenAddUserModal,
    openBackdropLoader,
    handleSearch,
    handleDeleteUser,
    userModalContentType,
    setUserModalContentType,
    customError,
    handleItemChange,
    resetItems,
    selectedItems,
    handleAssignSiteToUser,
    showMessageModalNew,
    handleShowMessageNewModalClose,
    addUserInitialState,
    setNewUserDetail,
  } = useUserManagementContext();
  const { getFreeSites, freeSites } = useAddSiteContext();

  const pageCount = totalDataCount / 10;

  const headData = [
    "UID",
    "user name",
    "site",
    "View Details",
    "Assign Site",
    "Delete",
  ];

  useEffect(() => {
    const filter = { assignedUser: { $exists: false } };
    getFreeSites(filter);
  }, []);

  const onViewClick = (userId) =>
    navigate(`/admin/user-management/view-user/${userId}`);

  const onAssignSiteClick = (userId) => {
    handleModal("assignSite");
    setSelectedUser(userId);
  };

  const onDeleteClick = (userId) => {
    handleModal("deleteUser");
    setActionUserId(userId);
  };
  const handleModal = (type) => {
    setUserModalContentType(type);
    setOpenAddUserModal(true);
  };

  const getModalContent = (type) => {
    if (type === "addUser") return <AddUserModalContent />;
    else if (type === "assignSite") {
      return (
        <AssignUserModalContent
          checkbox={true}
          title="Assign Site"
          searchLabel="Search by Site Name/UID"
          data={freeSites}
          selectedValues={selectedItems}
          customError={customError}
          onChange={handleItemChange}
          handleCancel={() => {
            setOpenAddUserModal(false);
            resetItems();
          }}
          handleSubmit={() => handleAssignSiteToUser(selectedUser)}
        />
      );
    } else if (type === "deleteUser")
      return (
        <MessageModalContent
          onCancel={() => setOpenAddUserModal(false)}
          onConfirm={() => handleDeleteUser(actionUserId)}
        />
      );
    else return <MessageModalContent />;
  };

  const handleModalClose = (type) => {
    setOpenAddUserModal(false);
    if (type === "addUser") {
      setNewUserDetail(addUserInitialState);
    } else if (type === "assignSite") {
      resetItems();
    }
  };

  return (
    <AppLayout
      headerTabsData={headerTabsData}
      successModalMessage={showMessageModalNew?.message}
      openMessageModal={showMessageModalNew?.open}
      setOpenMessageModal={handleShowMessageNewModalClose}
      modalContentType={showMessageModalNew?.type}
      onDeleteModalYes={() => {}}
      onDeleteModalNo={() => {}}
    >
      <Stack direction={"column"} gap={5}>
        <TabPaneV2
          paneText="User Management"
          paneTextColor="#000"
          btnText="add user"
          onBtnClick={() => handleModal("addUser")}
          searchLabel="Search User Name/UID"
          onSearch={handleSearch}
        />
        {openBackdropLoader ? (
          <TableSkeleton
            rowNumber={new Array(10).fill(0)}
            tableCell={new Array(6).fill("18%")}
            actions={new Array(1).fill("5%")}
          />
        ) : users?.length > 0 ? (
          <CustomTable
            headBackgroundColor="#EAF2E6"
            tableHeadData={headData}
            tableRowData={getUserFormattedData(
              users,
              theme,
              onViewClick,
              onAssignSiteClick,
              onDeleteClick
            )}
          />
        ) : (
          <NoData message="Nothing to show" />
        )}
        {!openBackdropLoader && totalDataCount > 10 ? (
          <Box sx={{ alignSelf: "flex-end" }}>
            <CustomPagination
              size="large" // total number of item
              page={paginationPageNo} //current page number
              count={Math.ceil(pageCount)} // total number of pages = number of item/page limit
              onPageChange={(pageNo) => setPaginationPageNo(pageNo)} // send a request on page change
            />
          </Box>
        ) : null}
      </Stack>
      <CustomModal
        content={getModalContent(userModalContentType)}
        openModal={openAddUserModal}
        handleClose={() => handleModalClose(userModalContentType)}
        customWidth={userModalContentType === "deleteUser" ? "25%" : null}
        background={true}
      />
    </AppLayout>
  );
};

export default UserManagement;
