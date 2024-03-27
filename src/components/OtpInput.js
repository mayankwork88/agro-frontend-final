import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button, Stack } from "@mui/material";
import useUserManagementContext from "../hooks/Admin/useUserManagementContext";

const OtpInput = () => {
  const {
    emailVerificationOTP,
    setEmailVerificationOTP,
    handleEmailVerificationOTPSubmit,
  } = useUserManagementContext();

  const handleChange = (newValue) => {
    setEmailVerificationOTP(newValue);
  };

  const validateChar = (value, index) => {
    const num = Number(value);
    return typeof num === "number" ? (num === 0 ? "0" : num) : "";
  };
  return (
    <Stack direction={"column"} alignItems={"flex-end"} gap={2}>
      <MuiOtpInput
        length={6}
        value={emailVerificationOTP}
        onChange={handleChange}
        TextFieldsProps={{ size: "small", placeholder: "-" }}
        validateChar={validateChar}
      />
      <Button
        variant="contained"
        sx={{ letterSpacing: "1px" }}
        onClick={handleEmailVerificationOTPSubmit}
      >
        Submit OTP
      </Button>
    </Stack>
  );
};

export default OtpInput;
