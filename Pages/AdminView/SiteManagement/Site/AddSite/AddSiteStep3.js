import { Stack, Box } from "@mui/material";
import { Heading20 } from "../../../../../components/CustomComponent";
import {
  CustomTextField,
  GetMap,
  SelectCheckMarkInput,
} from "../../../../../components";

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
        <SelectCheckMarkInput label="Depth"/>
        <CustomTextField
          placeholder="Description"
          disabled={false}
          name="description"
          select={false}
          label="Description"
          value={""}
          onInputChange={() => {}}
          type="textArea"
          row={4}
        />
      </Stack>
      <Stack width="50%" gap={2}>
        <Heading20>Mark position on map</Heading20>
        <GetMap
          mapWidth="100%"
          mapHeight="330px"
          locationCoordinates={{ lat: 28.517122, lng: 77.411541 }}
        />
      </Stack>
    </Stack>
  );
};

export default AddSiteStep3;
