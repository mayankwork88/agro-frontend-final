import React, { useState, useEffect } from "react";
import {
  CustomTable,
  CustomPagination,
  TabPane,
  CustomModal,
  AssignUserModalContent,
  NoData,
} from "../../../../components";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
import { formattedSiteData } from "../../FormattedData";
import { useNavigate, useParams } from "react-router-dom";
import useUserManagementContext from "../../../../hooks/Admin/useUserManagementContext";
import useAddSiteContext from "../../../../hooks/Admin/useAddSiteContext";

const Sites = ({ sites }) => {
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    handleItemChange,
    resetItems,
    selectedItems,
    customError,
    setShowMessageModalNew,
    setSelectedUnassignSiteId,
    handleAssignSiteToUser,
  } = useUserManagementContext();
  const {
    getFreeSites,
    freeSites,
    userSpecificSitesDataLength,
    userSpecificSitesPagination,
    setUserSpecificSitesPagination,
  } = useAddSiteContext();

  const pageCount = userSpecificSitesDataLength / 10;

  useEffect(() => {
    const filter = { assignedUser: { $exists: false } };
    getFreeSites(filter);
  }, []);

  const headData = [
    "UID",
    "site name",
    "branch manager",
    "devices",
    "alerts",
    "View Details",
    "Unassign",
  ];

  const onViewClick = (siteId) =>
    navigate(`/admin/site-management/site/${siteId}`);
  const onDeleteClick = (siteId) => {
    setSelectedUnassignSiteId(siteId);
    setShowMessageModalNew({ open: true, type: "delete" });
  };

  return (
    <Stack direction="column" gap={4}>
      <TabPane
        paneText="Assigned sites"
        paneTextColor="#000"
        btnText="Assign Site"
        variant="contained"
        icon="add"
        onBtnClick={() => setOpenModal(true)}
      />
      {sites?.length ? (
        <CustomTable
          headBackgroundColor="#EAF2E6"
          tableHeadData={headData}
          tableRowData={formattedSiteData(
            sites,
            theme,
            onViewClick,
            onDeleteClick
          )}
        />
      ) : (
        <NoData message={"Nothing to show!"} />
      )}
      {userSpecificSitesDataLength > 10 ? (
        <Box sx={{ alignSelf: "flex-end" }}>
          <CustomPagination
            size="large"
            page={userSpecificSitesPagination}
            count={Math.ceil(pageCount)}
            onPageChange={(pageNo) => setUserSpecificSitesPagination(pageNo)}
          />
        </Box>
      ) : null}

      <CustomModal
        content={
          <AssignUserModalContent
            checkbox={true}
            title="Assign Site"
            searchLabel="Search by Site Name/UID"
            data={freeSites}
            selectedValues={selectedItems}
            customError={customError}
            onChange={handleItemChange}
            handleCancel={() => {
              setOpenModal(false);
              resetItems();
            }}
            handleSubmit={() => handleAssignSiteToUser(id)}
          />
        }
        openModal={openModal}
        handleClose={() => setOpenModal(false)}
        background={true}
      />
    </Stack>
  );
};

export default Sites;
