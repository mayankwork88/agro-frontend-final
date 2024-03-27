import { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  TextField,
  Box,
  InputAdornment,
  Button,
} from "@mui/material";
import "./index.css";
// import { BtnGroup } from "../../ComponentsV2";
// import { ButtonPrimary } from "../../ComponentsV2/themeComponents";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validationSchema";
import { Heading32, Heading16 } from "../../components/CustomComponent";

// import { DashboardNoData } from "../../assets";
import { VisibilityOutlinedIcon } from "../../icons";

const ShowForm = ({ onChange, onSubmit, value }) => {
  const [isLoginActive, setIsLoginActive] = useState(true);

  const theme = useTheme();
  // const isLoginActive = true; isLogin === "log in";
  // const schema = isLoginActive ? loginSchema : signUpSchema;
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = onChange;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({ resolver: yupResolver(loginSchema) });
  const getInput = (
    placeholder,
    disabled,
    name,
    select,
    label,
    value,
    onInputChange
  ) => (
    <>
      <Heading16 sx={{ mb: "-10px" }}>{label}</Heading16>
      <TextField
        sx={{ background: "transparent", textTransform: "capitalize" }}
        disabled={disabled}
        fullWidth
        id={name}
        select={select}
        variant="outlined"
        size="large"
        value={value}
        name={name}
        type={name === "password" && !showPassword ? "password" : "text"}
        InputProps={{
          sx: { borderRadius: "8px !important", height: "5vh" },
          endAdornment:
            name === "password" ? (
              <InputAdornment
                position="end"
                onClick={() => setShowPassword(!showPassword)}
              >
                <VisibilityOutlinedIcon />
              </InputAdornment>
            ) : null,
        }}
        {...register(name, { required: true })}
        onChange={onInputChange}
        error={errors?.[name] ? true : false}
        helperText={errors?.[name]?.message}
      />
    </>
  );
  // const submit = isLoginActive ? handleUserLoginSubmit : handleUserSignUpSubmit;
  // const change = isLoginActive
  //   ? handleUserCredentialChange
  //   : handleUserSignUpCredentialChange;

  useEffect(() => {
    setValue("email", value?.email);
    setValue("password", value?.password);
  }, [value])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        sx={{
          minWidth: isLoginActive ? 352 : 600,
          minHeight: 460,
          p: theme.spacing(4, 5),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(4),
        }}
      >
        <Heading32>{isLoginActive ? "Login to your account" : "S"}</Heading32>
        <Stack width={"100%"} gap={theme.spacing(2)}>
          {isLoginActive ? (
            <>
              {getInput(
                "Enter Email",
                false,
                "email",
                false,
                "Email",
                value.email,
                handleChange
              )}
              {getInput(
                "Enter Password",
                false,
                "password",
                false,
                "password",
                value.password,
                handleChange
              )}
            </>
          ) : (
            <>
              {getInput(
                "Full Name",
                false,
                "fullName",
                false,
                "Full Name",
                false,
                () => {}
              )}
              {getInput(
                "Enter Email",
                false,
                "email",
                false,
                "Email",
                false,
                () => {}
              )}
              {getInput(
                "Phone",
                false,
                "phone",
                false,
                "phone",
                false,
                () => {}
              )}
              {getInput(
                "Enter Password",
                false,
                "password",
                false,
                "password",
                false,
                () => {}
              )}
            </>
          )}
          {isLoginActive ? (
            <Typography
              variant="body"
              sx={{
                textAlign: "right",
                cursor: "pointer",
                color: theme.palette.primary.main,
                mt: "-10px",
              }}
            >
              Forgot password?
            </Typography>
          ) : null}
        </Stack>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={theme.spacing(1)}
        >
          <Button
            sx={{
              width: "100%",
              fontSize: "1.5rem",
              textTransform: "capitalize",
              display: "flex",
              justifyContent: "center",
              p: theme.spacing(1, 0),
              borderRadius: "8px",
            }}
            variant="contained"
            type="submit"
          >
            {isLoginActive ? "login" : "get started"}
          </Button>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            gap={theme.spacing(0.5)}
            mt="5px"
          >
            <Typography variant="body">
              {isLoginActive
                ? "Don't have an account?"
                : "Already have an account?"}
            </Typography>
            <Typography
              variant="body"
              sx={{
                cursor: "pointer",
                color: theme.palette.primary.main,
                fontWeight: "600",
              }}
              component="span"
              onClick={() => setIsLoginActive(!isLoginActive)}
            >
              {isLoginActive ? "Sign up" : "Sign in"}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </form>
  );
};

export default ShowForm;
