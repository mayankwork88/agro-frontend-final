import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Stack,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { Heading16 } from "./CustomComponent";
import { VisibilityOutlinedIcon } from "../icons";
import { useTheme } from "@emotion/react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CustomTextField = ({
  placeholder,
  disabled,
  name,
  select,
  label,
  value,
  onInputChange,
  background,
  type,
  row,
  validation,
  verify,
  verifyEmailLoader,
  onVerifyClick,
  emailVerificationText,
  selectData,
  inputLoading,
  customHeight,
  pinCodeErrorMessage,
  sx
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  return (
    <Stack width={"100%"} gap={0.7}>
      <Heading16>{label}</Heading16>
      <TextField
        sx={{
          color: "#484848",
          textTransform: "capitalize",
          ...sx
        }}
        disabled={disabled}
        fullWidth
        id={name}
        placeholder={placeholder}
        select={select}
        variant="outlined"
        size="large"
        value={value}
        name={name}
        type={
          label?.toLowerCase()?.includes("password") && showPassword
            ? "text"
            : type
        }
        InputProps={{
          sx: {
            borderRadius: "8px !important",
            fontSize: "14px",
            color: "#484848",
            height: `${
              type === "textArea" ? null : customHeight ? customHeight : "5vh"
            }`,
            background: background,
          },
          endAdornment: label?.toLowerCase()?.includes("password") ? (
            <InputAdornment
              position="end"
              sx={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <VisibilityOutlinedIcon />
            </InputAdornment>
          ) : label?.toLowerCase() === "email" && verify ? (
            <InputAdornment
              position="end"
              sx={{ cursor: "pointer" }}
              onClick={onVerifyClick}
            >
              {verifyEmailLoader ? (
                <CircularProgress size={20} />
              ) : emailVerificationText?.toLowerCase() === "verified" ? (
                <CheckCircleIcon sx={{ color: theme.palette.primary.main }} />
              ) : (
                <Heading16
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: "14px",
                    fontWeight: "500",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {emailVerificationText}
                </Heading16>
              )}
            </InputAdornment>
          ) : label?.toLowerCase() === "pin code" ? (
            inputLoading ? (
              <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                <CircularProgress size={20} />
              </InputAdornment>
            ) : null
          ) : null,
        }}
        {...validation?.register(name, { required: true })}
        onChange={onInputChange}
        error={validation?.errors?.[name] || pinCodeErrorMessage?.error? true : false}
        helperText={validation?.errors?.[name]?.message ||pinCodeErrorMessage?.message}
        multiline={type === "textArea" ? true : false}
        rows={type === "textArea" ? row || 2 : 2}
        maxRows={type === "textArea" ? 11 : 2}
      >
        {selectData &&
          selectData?.map((ele) => (
            <MenuItem value={ele?.value} sx={{ textTransform: "capitalize" }}>
              {ele?.label}
            </MenuItem>
          ))}
      </TextField>
    </Stack>
  );
};

export default CustomTextField;
