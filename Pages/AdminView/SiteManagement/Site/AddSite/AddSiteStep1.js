import { Stack, Box, Button } from "@mui/material";
import { Heading20 } from "../../../../../components/CustomComponent";
import { CustomTextField } from "../../../../../components";
import useAddSiteContext from "../../../../../hooks/Admin/useAddSiteContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addSiteDetailsSchema } from "../../../../../utils/validationSchema";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";

const AddSiteStep1 = () => {
  const {
    addSiteDetails,
    handleChange,
    setActiveStep,
    handleAddSiteSubmit,
    inputLoader,
    pinCodeErrorMessage,
  } = useAddSiteContext();
  const { onSnackbarAlertOpen } = useViewSiteContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addSiteDetailsSchema) });

  const validation = { register, errors };

  const handleStep1 = async () => {
    if (!pinCodeErrorMessage?.error) {
      const result = await handleAddSiteSubmit();
      if (result === 200) {
        onSnackbarAlertOpen("success", "Site Successfully Created");
        setActiveStep(1);
      } else alert(result);
    }
  };
  

  return (
    <Stack direction={"column"} sx={{ background: "#fff" }} p={2}>
      <form
        onSubmit={handleSubmit(handleStep1)}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "24px",
        }}
      >
        <Stack width="100%" gap={2}>
          <Heading20>Add Site Details</Heading20>
          <Box sx={{ display: "flex", gap: 4 }}>
            <CustomTextField
              placeholder="UID"
              disabled={false}
              name="uid"
              select={false}
              label="UID"
              value={addSiteDetails?.uid}
              onInputChange={handleChange}
              validation={validation}
            />
            <CustomTextField
              placeholder="Name"
              disabled={false}
              name="name"
              select={false}
              label="Name"
              value={addSiteDetails?.name}
              onInputChange={handleChange}
              validation={validation}
            />
          </Box>
          <CustomTextField
            placeholder="Address"
            disabled={false}
            name="address"
            select={false}
            label="Address"
            value={addSiteDetails?.address}
            onInputChange={handleChange}
            validation={validation}
            type="textArea"
          />
          <Box sx={{ display: "flex", gap: 4 }}>
            <CustomTextField
              placeholder="Pin code"
              disabled={false}
              name="pinCode"
              type="number"
              select={false}
              label="Pin code"
              inputLoading={inputLoader}
              pinCodeErrorMessage={pinCodeErrorMessage}
              value={addSiteDetails?.pinCode}
              onInputChange={handleChange}
              validation={validation}
            />
            <CustomTextField
              placeholder="City"
              disabled={true}
              name="city"
              select={false}
              label="City"
              value={addSiteDetails?.city}
              onInputChange={() => {}}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <CustomTextField
              placeholder="State"
              disabled={true}
              name="state"
              select={false}
              label="State"
              value={addSiteDetails?.state}
              onInputChange={() => {}}
            />{" "}
            <CustomTextField
              placeholder="Country"
              disabled={true}
              name="country"
              select={false}
              label="Country"
              value={addSiteDetails?.country}
              onInputChange={() => {}}
            />
          </Box>
        </Stack>
        <Button variant="contained" type="submit" sx={{ px: 2, py: 1 }}>
          Assign Gateway
        </Button>
      </form>

      {/* <Stack width="50%" gap={2}>
        <Heading20>Mark position on map</Heading20>
        <GetMap
          mapWidth="100%"
          mapHeight="475px"
          locationCoordinates={{ lat: 28.517122, lng: 77.411541 }}
        />
      </Stack> */}
    </Stack>
  );
};

export default AddSiteStep1;
