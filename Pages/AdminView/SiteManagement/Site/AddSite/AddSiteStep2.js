import { Stack } from "@mui/material";
import { Heading20 } from "../../../../../components/CustomComponent";
import { CustomTextField, GetMap } from "../../../../../components";

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

export default AddSiteStep2;
