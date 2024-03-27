import React, { useState, useEffect } from "react";
import {
  AppLayout,
  BreadCrumps,
  CustomTabs,
  CustomModal,
} from "../../../../../components";
import { Button, Stack, Box } from "@mui/material";
import { headerTabsData } from "../../../Data";
import { Label } from "../../../../../components/CustomComponent";
import Overview from "./Overview";
import Analytics from "./Analytics";
import Alerts from "./Alerts";
import Gateways from "./Gateways";
import Status from "./Status";
import SiteDetails from "./SiteDetails";
import SetThreshold from "./SetThreshold";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";
import AddSite from "../AddSite/AddSite";
import useAddSiteContext from "../../../../../hooks/Admin/useAddSiteContext";

const BreadCrumbsData = (data) => [
  {
    label: `${data?.uid}`,
    link: `admin/site-management/site/${data?._id}`,
  },
];

const SiteDetail = () => {
  const [openThresholdModal, setOpenThresholdModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { deviceDetails, snackbarAlert, onSnackbarAlertClose } =
    useViewSiteContext();
  const { getAllPendingGateways,   setActiveStep: setAddSiteActiveStep, setCreatedSiteDetail} = useAddSiteContext();

  const siteTabData = [
    {
      label: "Overview",
      child: <Overview />,
    },
    {
      label: "Analytics",
      child: <Analytics />,
    },
    {
      label: "alerts",
      child: (
        <Alerts
          setOpenThresholdModal={(ele) => {
            setOpenThresholdModal(ele);
            setModalContent("threshold");
          }}
        />
      ),
    },
    {
      label: "gateway",
      child: (
        <Gateways
          setOpenThresholdModal={(ele) => {
            setOpenThresholdModal(ele);
            setModalContent("addGateway");
            getAllPendingGateways();
            setAddSiteActiveStep(1);
            setCreatedSiteDetail({
              siteId: deviceDetails?._id,
              siteCityLat: deviceDetails?.location?.latitude,
              siteCityLng: deviceDetails?.location?.longitude,
            });
          }}
        />
      ),
    },
    {
      label: "status",
      child: <Status />,
    },
    {
      label: "site details",
      child: <SiteDetails />,
    },
  ];

  const getContent = (type) => {
    if (type === "threshold")
      return <SetThreshold setOpenThresholdModal={setOpenThresholdModal} />;
    else if (type === "addGateway") return <AddSite />;
  };

  useEffect(()=>{
    const data = BreadCrumbsData(deviceDetails);
    localStorage.setItem("breadcrumb", JSON.stringify(data))
  },[deviceDetails])
  return (
    <AppLayout
      headerTabsData={headerTabsData}
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      onAlertClose={onSnackbarAlertClose}
    >
      <Stack gap={3} sx={{ background: "#fff" }} p={4} pt={0}>
        <BreadCrumps
          root={{ link: "/admin/site-management", label: "site management" }}
          data={JSON.parse(localStorage.getItem("breadcrumb"))}
        />
        {/* <Box sx={{ display: "flex" }}>
          <Label>Site name : Site 1</Label>
        </Box> */}
        <CustomTabs tabData={siteTabData} />
        <CustomModal
          content={getContent(modalContent)}
          openModal={openThresholdModal}
          handleClose={() => setOpenThresholdModal(false)}
          customWidth={"50%"}
          background={true}
        />
      </Stack>
    </AppLayout>
  );
};

export default SiteDetail;
