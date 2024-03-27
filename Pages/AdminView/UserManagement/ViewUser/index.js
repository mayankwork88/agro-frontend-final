import React, { useEffect, useState } from "react";
import { AppLayout, BreadCrumps, CustomTabs } from "../../../../components";
import { Stack } from "@mui/material";
import { headerTabsData } from "../../Data";
import Overview from "./Overview";
import Sites from "./Sites";
import { useParams } from "react-router-dom";
import { apiRequest } from "../../../../apis";
import useUserManagementContext from "../../../../hooks/Admin/useUserManagementContext";
import useAddSiteContext from "../../../../hooks/Admin/useAddSiteContext";

const BreadCrumbsData = (data) => [
  {
    label: `${data?.user?.uid}`,
    link: `admin/view-user/${data?.user?._id}`,
  },
];

const ViewUser = () => {
  const [userDetail, setUserDetail] = useState({ user: null, sites: null });
  const { id } = useParams();

  const {
    setOpenBackdropLoader,
    snackbarAlert,
    onSnackbarAlertClose,
    showMessageModalNew,
    handleShowMessageNewModalClose,
    handleUnassignSiteToUser,
  } = useUserManagementContext();
  const {
    getUserSpecificSites,
    userSpecificSites,
    userSpecificSitesPagination,
  } = useAddSiteContext();

  const siteTabData = (data, sites) => [
    {
      label: "Overview",
      child: <Overview data={data} sites={sites} />,
    },
    {
      label: "Sites",
      child: <Sites data={data} sites={sites} />,
    },
  ];

  useEffect(() => {
    setOpenBackdropLoader(true);
    if (id) {
      apiRequest({
        url: `/api/user/getUserById/${id}`,
      })
        .then((res) => {
          if (res?.status === 200) {
            const user = res?.data;
            setUserDetail({ user: user.user, sites: user.assignedSites });
          } else {
            setUserDetail(null);
            throw new Error("Something went wrong");
          }
        })
        .catch((err) => console.log(err.message))
        .finally(() => setOpenBackdropLoader(false));
    }
    const filter = { assignedUser: id };
    getUserSpecificSites(filter);
  }, [id, userSpecificSitesPagination]);

  return (
    <AppLayout
      headerTabsData={headerTabsData}
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      onAlertClose={onSnackbarAlertClose}
      openMessageModal={showMessageModalNew?.open}
      successModalMessage={showMessageModalNew?.message}
      setOpenMessageModal={handleShowMessageNewModalClose}
      modalContentType={showMessageModalNew?.type}
      onDeleteModalYes={() => handleUnassignSiteToUser(id)}
      onDeleteModalNo={handleShowMessageNewModalClose}
    >
      <Stack gap={3} sx={{ background: "#fff" }} p={4}>
        <BreadCrumps
          root={{ link: "/admin/user-management", label: "user management" }}
          data={BreadCrumbsData(userDetail)}
        />
        <CustomTabs tabData={siteTabData(userDetail, userSpecificSites)} />
      </Stack>
    </AppLayout>
  );
};

export default ViewUser;
