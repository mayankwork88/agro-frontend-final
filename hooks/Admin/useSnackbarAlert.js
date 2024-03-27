import { useState } from "react";

const useSnackbarAlert = () => {
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const onSnackbarAlertClose = () => {
    setSnackbarAlert({ open: false, type: "", message: "" });
  };

  const onSnackbarAlertOpen = (type, message) => {
    setSnackbarAlert({ open: true, type, message });
  };

  return { snackbarAlert, onSnackbarAlertClose, onSnackbarAlertOpen };
};

export default useSnackbarAlert;
