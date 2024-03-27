import React from "react";
import { Stack, Button, Box } from "@mui/material";
import { Heading20, Heading24 } from "../../../../components/CustomComponent";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CustomTextField,
  CustomAlert,
  SelectCheckMarkInput,
  SuccessMessage,
} from "../../../../components";
import { addBranchManager } from "../../../../utils/validationSchema";
import useDeviceContext from "../../../../hooks/Admin/useDeviceContext";

const AddBranchManager = () => {
  const theme = useTheme();

  const {
    setOpenDeviceModal,
    addNewBranchManager,
    handleAddNewDeviceChange,
    handleAddNewDeviceSubmit,
    handleAddNewDeviceCancel,
    customError,
    selectCustomError,
    showSuccessModal,
  } = useDeviceContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addBranchManager) });

  const validation = { register, errors };

  const handleCancel = () => {
    setOpenDeviceModal(false);
    handleAddNewDeviceCancel("branch_manager");
  };

  const handleChange = (event) => {
    handleAddNewDeviceChange(event, "branch_manager");
  };

  const handleSubmitV2 = () => {
    handleAddNewDeviceSubmit("branch_manager");
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
        Add Branch manager
      </Heading24>
      {showSuccessModal ? (
        <SuccessMessage message="Branch Manager Successfully Added" />
      ) : (
        <form onSubmit={handleSubmit(handleSubmitV2)}>
          <Stack p={4} gap={2}>
            {customError?.error ? (
              <CustomAlert
                type={customError?.type}
                message={customError?.message}
              />
            ) : null}
            <Heading20>Add Branch manager Details</Heading20>
            <Box sx={{ display: "flex", gap: 4 }}>
              <CustomTextField
                placeholder="UID"
                disabled={false}
                name="uid"
                select={false}
                label="UID"
                value={addNewBranchManager?.uid}
                onInputChange={handleChange}
                background="#fff"
                validation={validation}
              />
              <CustomTextField
                placeholder="Name"
                disabled={false}
                name="name"
                select={false}
                label="Name"
                value={addNewBranchManager?.name}
                onInputChange={handleChange}
                background="#fff"
                validation={validation}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 4 }}>
              <CustomTextField
                placeholder="Mac ID"
                disabled={false}
                name="macId"
                select={false}
                label="Mac ID"
                value={addNewBranchManager?.macId}
                onInputChange={handleChange}
                background="#fff"
                validation={validation}
              />
              <SelectCheckMarkInput
                label="depth"
                name="depth"
                checkboxValue={addNewBranchManager?.depth}
                setNewCheckboxValue={handleChange}
                validation={selectCustomError}
              />
            </Box>
            <CustomTextField
              placeholder="Description"
              disabled={false}
              name="description"
              select={false}
              label="Description"
              type="textArea"
              value={addNewBranchManager?.description}
              onInputChange={handleChange}
              background="#fff"
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
      )}
    </Stack>
  );
};

export default AddBranchManager;
