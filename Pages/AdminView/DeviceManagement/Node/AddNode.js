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
import useUserManagementContext from "../../../../hooks/Admin/useUserManagementContext";
import { addBranchManager } from "../../../../utils/validationSchema";
import useDeviceContext from "../../../../hooks/Admin/useDeviceContext";

const AddNode = () => {
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
    handleAddNewDeviceCancel("node");
  };

  const handleChange = (event) => {
    handleAddNewDeviceChange(event, "node");
  };

  const handleSubmitV2 = () => {
    handleAddNewDeviceSubmit("node");
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
        Add Node
      </Heading24>
      {showSuccessModal ? (
        <SuccessMessage message="Node Successfully Added" />
      ) : (
        <form onSubmit={handleSubmit(handleSubmitV2)}>
          <Stack p={4} gap={2}>
            {customError?.error ? (
              <CustomAlert
                type={customError?.type}
                message={customError?.message}
              />
            ) : null}

            <Heading20>Add Node Details</Heading20>
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
      )}
    </Stack>
  );
};

export default AddNode;
