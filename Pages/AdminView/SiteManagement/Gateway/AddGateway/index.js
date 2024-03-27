import React from "react";
import { AppLayout, BreadCrumps, Stepper } from "../../../../../components";
import { Button, Stack } from "@mui/material";
import { AddCircleOutlineIcon } from "../../../../../icons";
import AddGatewayStep1 from "./AddGatewayStep1";
import AddGatewayStep2 from "./AddGatewayStep2";
import AddGatewayStep3 from "./AddGatewayStep3";
import { headerTabsData } from "../../../Data";

const BreadCrumbsData = [
  {
    label: "Site 1",
    link: "",
  },
  {
    label: "Gateway 1",
    link: "",
  },
];

//steps
const steps = [
  {
    label: "Gateway details ",
    component: <AddGatewayStep1 />,
  },
  {
    label: "Branch manager Details",
    component: <AddGatewayStep2 />,
  },
  {
    label: "Node Details",
    component: (
      <Stack direction={"column"}>
        <AddGatewayStep3 />
        <Button
          variant="outlined"
          sx={{
            fontSize: "16px",
            padding: "10px 15px",
            textTransform: "capitalize",
            borderRadius: "8px",
            minWidth: "130px",
            maxWidth: "200px",
            alignSelf: "flex-start",
          }}
          startIcon={<AddCircleOutlineIcon fontSize="large" />}
          onClick={() => {}}
        >
          Add Other Node
        </Button>
      </Stack>
    ),
  },
];

const AddGateway = () => {
  return (
    <AppLayout headerTabsData={headerTabsData}>
      <Stack gap={3}>
        <BreadCrumps
          root={{ link: "/admin/site-management", label: "site management" }}
          data={BreadCrumbsData}
        />
        <Stepper steps={steps} />
      </Stack>
    </AppLayout>
  );
};

export default AddGateway;
