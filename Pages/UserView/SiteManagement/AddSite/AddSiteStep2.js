import { Stack, Box } from "@mui/material";
import { Heading20 } from "../../../../components/CustomComponent";
import { CustomTextField, GetMap } from "../../../../components";

const AddSiteStep2 = () => {
  return (
    <Stack direction={"row"} sx={{ background: "#fff" }} p={2} gap={4}>
      <Stack width="50%" gap={2}>
        <Heading20>Add Gateway Details</Heading20>
        <CustomTextField
          placeholder="UID"
          disabled={false}
          name="uid"
          select={false}
          label="UID"
          value={""}
          onInputChange={() => {}}
        />
        <CustomTextField
          placeholder="Branch Manager Name"
          disabled={false}
          name="branchManagerName"
          select={false}
          label="Branch Manager Name"
          value={""}
          onInputChange={() => {}}
        />
        <CustomTextField
          placeholder="Address"
          disabled={false}
          name="address"
          select={false}
          label="Address"
          value={""}
          onInputChange={() => {}}
          type="textArea"
        />
        <Box sx={{display:"flex", gap:4}}>
          <CustomTextField
            placeholder="Pincode"
            disabled={false}
            name="pincode"
            select={false}
            label="Pincode"
            value={""}
            onInputChange={() => {}}
          />{" "}
          <CustomTextField
            placeholder="City"
            disabled={false}
            name="city"
            select={false}
            label="City"
            value={""}
            onInputChange={() => {}}
          />
        </Box>
        <Box sx={{display:"flex", gap:4}}>
          <CustomTextField
            placeholder="State"
            disabled={false}
            name="state"
            select={false}
            label="State"
            value={""}
            onInputChange={() => {}}
          />
          <CustomTextField
            placeholder="Country"
            disabled={false}
            name="country"
            select={false}
            label="Country"
            value={""}
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

export default AddSiteStep2;
