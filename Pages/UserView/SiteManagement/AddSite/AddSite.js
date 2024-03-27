import React from "react";
import { AppLayout, BreadCrumps, Stepper } from "../../../../components";
import AddSiteStep1 from "./AddSiteStep1";
import AddSiteStep2 from "./AddSiteStep2";
import AddSiteStep3 from "./AddSiteStep3";
import AddSiteStep4 from "./AddSiteStep4";
import { Button, Stack } from "@mui/material";
import { AddCircleOutlineIcon } from "../../../../icons";

const BreadCrumbsData = [
  {
    label: "add site",
    link: "user/add-site",
  },
];

//steps
const steps = [
  {
    label: "Site details",
    component: <AddSiteStep1 />,
  },
  {
    label: "Gateway details",
    component: <AddSiteStep2 />,
  },
  {
    label: "Branch Manager Details",
    component: <AddSiteStep3 />,
  },
  {
    label: "Node Details",
    component: (
      <Stack direction={'column'}>
        <AddSiteStep4 />
        <Button
          variant="text"
          sx={{
            fontSize: "16px",
            padding: "10px 15px",
            textTransform: "capitalize",
            borderRadius: "8px",
            minWidth: "130px",
            maxWidth:'140px',
            alignSelf:'flex-end'
          }}
          startIcon={<AddCircleOutlineIcon fontSize="large" />}
          onClick={() => {}}
        >
          Add Node
        </Button>
      </Stack>
    ),
  },
];

const AddSite = () => {
  return (
    <AppLayout>
      <Stack gap={3}>
        <BreadCrumps
          root={{ link: "/user/site-management", label: "site management" }}
          data={BreadCrumbsData}
        />
        <Stepper steps={steps} />
      </Stack>
    </AppLayout>
  );
};

export default AddSite;
