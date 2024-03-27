import { Stack, Box } from "@mui/material";
import { Heading20 } from "../../../../components/CustomComponent";
import { CustomTextField, GetMap } from "../../../../components";
import useAddSiteContext from "../../../../hooks/Admin/useAddSiteContext";

const AddSiteStep1 = () => {
  const {addSiteDetails} = useAddSiteContext();
  return (
    <Stack direction={"row"} sx={{ background: "#fff" }} p={2} gap={4}>
      <Stack width="50%" gap={2}>
        <Heading20>Add Site Details</Heading20>
        <CustomTextField
          placeholder="UID"
          disabled={false}
          name="uid"
          select={false}
          label="UID"
          value={addSiteDetails?.uid}
          onInputChange={() => {}}
        />
        <CustomTextField
          placeholder="Name"
          disabled={false}
          name="name"
          select={false}
          label="Name"
          value={addSiteDetails?.name}
          onInputChange={() => {}}
        />
        <CustomTextField
          placeholder="Address"
          disabled={false}
          name="address"
          select={false}
          label="Address"
          value={addSiteDetails?.address}
          onInputChange={() => {}}
          type="textArea"
        />
        <Box sx={{display:"flex", gap:4}}>
          <CustomTextField
            placeholder="Pincode"
            disabled={false}
            name="pinCode"
            select={false}
            label="Pincode"
            value={addSiteDetails?.pinCode}
            onInputChange={() => {}}
          />{" "}
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
        <Box sx={{display:"flex", gap:4}}>
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
      <Stack width="50%" gap={2}>
        <Heading20>Mark position on map</Heading20>
        <GetMap
          mapWidth="100%"
          mapHeight="475px"
          locationCoordinates={{ lat: 28.517122, lng: 77.411541 }}
        />
      </Stack>
    </Stack>
  );
};

export default AddSiteStep1;
