import { Stack, Box } from "@mui/material";
import { Heading20 } from "../../../../components/CustomComponent";
import { CustomTextField, GetMap } from "../../../../components";

const AddSiteStep3 = () => {
  return (
    <Stack direction={"row"} sx={{ background: "#fff" }} p={2} gap={4}>
      <Stack width="50%" gap={2}>
        <Heading20>Add Branch Manager Details</Heading20>
        <Box sx={{ display: "flex", gap: 4 }}>
          <CustomTextField
            placeholder="Branch Manager ID"
            disabled={false}
            name="branchManagerId"
            select={false}
            label="Branch Manager ID"
            value={""}
            onInputChange={() => {}}
          />
          <CustomTextField
            placeholder="Branch Manager UID"
            disabled={false}
            name="branchManagerUid"
            select={false}
            label="Branch Manager UID"
            value={""}
            onInputChange={() => {}}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <CustomTextField
            placeholder="Depth 1"
            disabled={false}
            name="depth1"
            select={false}
            label="Depth 1"
            value={""}
            onInputChange={() => {}}
          />
          <CustomTextField
            placeholder="Depth 2"
            disabled={false}
            name="depth2"
            select={false}
            label="Depth 2"
            value={""}
            onInputChange={() => {}}
          />
          <CustomTextField
            placeholder="Depth 3"
            disabled={false}
            name="depth3"
            select={false}
            label="Depth 3"
            value={""}
            onInputChange={() => {}}
          />
        </Box>
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
        <Box sx={{ display: "flex", gap: 4 }}>
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
        <Box sx={{ display: "flex", gap: 4 }}>
          <CustomTextField
            placeholder="State"
            disabled={false}
            name="state"
            select={false}
            label="State"
            value={""}
            onInputChange={() => {}}
          />{" "}
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

export default AddSiteStep3;
