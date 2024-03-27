import React, { Fragment } from "react";
import { Container, Stack } from "@mui/material";
import Header from "../components/Header";
import { MessageModal, BackDropLoader, SnackbarAlert } from "../components";

const AppLayout = ({
  children,
  headerTabsData,
  openMessageModal,
  setOpenMessageModal,
  openBackdropLoader,
  openAlert,
  alertMessage,
  alertType,
  onAlertClose,
  successModalMessage,
  modalContentType,
  onDeleteModalYes, 
  onDeleteModalNo
}) => {
  return (
    <Stack>
      <Header headerTabsData={headerTabsData} />
      <BackDropLoader open={openBackdropLoader} />
      <SnackbarAlert
        open={openAlert}
        onAlertClose={onAlertClose}
        message={alertMessage}
        type={alertType}
      />
      <MessageModal
        open={openMessageModal}
        setOpen={setOpenMessageModal}
        successModalMessage={successModalMessage}
        modalContentType={modalContentType}
        onDeleteModalYes={onDeleteModalYes} 
        onDeleteModalNo={onDeleteModalNo}
      />
      <Container maxWidth="xl" sx={{ my: 5, minHeight: "80vh" }}>
        {children}
      </Container>
    </Stack>
  );
};

export default AppLayout;
