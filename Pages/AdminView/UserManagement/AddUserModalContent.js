import { Stack, Button, Box } from "@mui/material";
import { Heading20, Heading24 } from "../../../components/CustomComponent";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomTextField, CustomAlert, OtpInput } from "../../../components";
import useUserManagementContext from "../../../hooks/Admin/useUserManagementContext";
import { addUserByAdmin } from "../../../utils/validationSchema";

const AddUserModalContent = () => {
  const theme = useTheme();
  const {
    newUserDetail,
    handleAddNewUserChange,
    handleAddNewUserSubmit,
    setOpenAddUserModal,
    handleAddNewUserCancel,
    customError,
    verifyEmailLoader,
    verifyEmail,
    emailVerificationText,
    setEmailVerificationText,
    setEmailVerificationOTP
  } = useUserManagementContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addUserByAdmin) });

  const validation = { register, errors };

  const handleCancel = () => {
    setOpenAddUserModal(false);
    handleAddNewUserCancel();
    setEmailVerificationText("verify");
    setEmailVerificationOTP("")
  };
  
  return (
    <Stack width="100%">
      <Heading24
        sx={{
          background: theme.palette.primary.light,
          fontWeight: "500",
          p: theme.spacing(1, 2),
        }}
      >
        Add User
      </Heading24>
      <form onSubmit={handleSubmit(handleAddNewUserSubmit)}>
        <Stack p={4} gap={2}>
          {customError?.error ? (
            <CustomAlert
              type={customError?.type}
              message={customError?.message}
            />
          ) : null}

          <Heading20>Enter User Details</Heading20>
          <CustomTextField
            placeholder="User Name"
            disabled={false}
            name="name"
            select={false}
            label="User Name"
            value={newUserDetail?.name}
            onInputChange={handleAddNewUserChange}
            background="#fff"
            validation={validation}
          />
          <CustomTextField
            placeholder="Email"
            disabled={false}
            name="email"
            select={false}
            verify={true}
            verifyEmailLoader={verifyEmailLoader}
            onVerifyClick={verifyEmail}
            emailVerificationText={emailVerificationText}
            label="Email"
            value={newUserDetail?.email}
            onInputChange={handleAddNewUserChange}
            background="#fff"
            validation={validation}
          />
          {emailVerificationText?.toLowerCase() === "sent" ? (
            <OtpInput />
          ) : null}

          <CustomTextField
            placeholder="Phone"
            disabled={false}
            name="phone"
            select={false}
            label="Phone"
            type="number"
            value={newUserDetail?.phone}
            onInputChange={handleAddNewUserChange}
            background="#fff"
            validation={validation}
          />

          <CustomTextField
            placeholder="Password"
            disabled={false}
            name="password"
            select={false}
            label="Password"
            type="password"
            value={newUserDetail?.password}
            onInputChange={handleAddNewUserChange}
            background="#fff"
            validation={validation}
          />
          <CustomTextField
            placeholder="Confirm Password"
            disabled={false}
            name="confirmPassword"
            select={false}
            label="Confirm Password"
            type="password"
            value={newUserDetail?.confirmPassword}
            onInputChange={handleAddNewUserChange}
            background="#fff"
            validation={validation}
          />
          <Box sx={{ display: "flex", gap: 2, pt: 2, alignSelf: "flex-end" }}>
            <Button
              variant="outlined"
              sx={{ minWidth: "100px" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ minWidth: "100px" }}
              type="submit"
            >
              Add
            </Button>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};

export default AddUserModalContent;
