import React from "react";
import { Stack, Button, Box } from "@mui/material";
import { Heading20, Heading24 } from "../../../../components/CustomComponent";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomTextField, CustomAlert, SuccessMessage} from "../../../../components";
import { addGateway } from "../../../../utils/validationSchema";
import useDeviceContext from "../../../../hooks/Admin/useDeviceContext";

const AddGateway = () => {
  const theme = useTheme();

  const {
    setOpenDeviceModal,
    addNewGateway,
    handleAddNewDeviceChange,
    handleAddNewDeviceSubmit,
    handleAddNewDeviceCancel,
    customError,
    showSuccessModal
  } = useDeviceContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addGateway) });

  const validation = { register, errors };

  const handleCancel = () => {
    setOpenDeviceModal(false);
    handleAddNewDeviceCancel("gateway");
  };

  const handleChange = (event) => {
    handleAddNewDeviceChange(event, "gateway");
  };

  const handleSubmitV2 = () => {
    handleAddNewDeviceSubmit("gateway");
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
        Add Gateway
      </Heading24>
      {showSuccessModal ? (
        <SuccessMessage message="Gateway Successfully Added" />
      ) : (
        <form onSubmit={handleSubmit(handleSubmitV2)}>
          <Stack p={4} gap={2}>
            {customError?.error ? (
              <CustomAlert
                type={customError?.type}
                message={customError?.message}
              />
            ) : null}

            <Heading20>Add Gateway Details</Heading20>
            <Box sx={{ display: "flex", gap: 4 }}>
              <CustomTextField
                placeholder="UID"
                disabled={false}
                name="uid"
                select={false}
                label="UID"
                value={addNewGateway?.uid}
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
                value={addNewGateway?.name}
                onInputChange={handleChange}
                background="#fff"
                validation={validation}
              />
            </Box>
            <CustomTextField
              placeholder="Mac ID"
              disabled={false}
              name="macId"
              select={false}
              label="Mac ID"
              value={addNewGateway?.macId}
              onInputChange={handleChange}
              background="#fff"
              validation={validation}
            />
            <CustomTextField
              placeholder="Description"
              disabled={false}
              name="description"
              select={false}
              label="Description"
              type="textArea"
              value={addNewGateway?.description}
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

export default AddGateway;
