import { Stack, Alert} from "@mui/material";
import React from "react";

const CustomAlert = ({message,type}) => {
  return (
    <Stack>
      <Alert
        variant="filled"
        severity={type}
        sx={{ width: "100%" }}
      >
       {message}
      </Alert>
    </Stack>
  );
};

export default CustomAlert;
