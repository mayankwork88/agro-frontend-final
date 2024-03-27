import React, { useEffect, useState } from "react";
import { AppLayout, BreadCrumps, CustomTabs } from "../../../../../components";
import { Stack, Box } from "@mui/material";
import { headerTabsData } from "../../../Data";
import { Label } from "../../../../../components/CustomComponent";
import Overview from "./Overview";
import Alerts from "./Alerts";
import Devices from "./Devices";
import Status from "./Status";
import Analytics from "./Analytics";

const BreadCrumbsData = [
  {
    label: "BM01",
    link: "",
  },
];

export const siteTabData = [
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
    child: <Alerts />,
  },
  {
    label: "devices",
    child: <Devices />,
  },
  {
    label: "status",
    child: <Status />,
  },
];

const ViewSiteBranchManagerDetail = () => {
  const [breadcrumb, setBreadcrumb] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("breadcrumb"));
    setBreadcrumb(data);
  }, []);
  return (
    <AppLayout headerTabsData={headerTabsData}>
      <Stack gap={3} sx={{ background: "#fff" }} p={4} pt={0}>
        <BreadCrumps
          root={{ link: "/admin/site-management", label: "site management" }}
          data={breadcrumb}
        />
        {/* <Box sx={{ display: "flex" }}>
          <Label>Site name : Site 1</Label>
        </Box> */}
        <CustomTabs tabData={siteTabData} />
      </Stack>
    </AppLayout>
  );
};

export default ViewSiteBranchManagerDetail;
