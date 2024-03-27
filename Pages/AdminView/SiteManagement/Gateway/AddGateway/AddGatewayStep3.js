import { Stack, Box } from "@mui/material";
import { Heading20 } from "../../../../../components/CustomComponent";
import { CustomTextField, GetMap, SelectCheckMarkInput } from "../../../../../components";

const AddGatewayStep3 = () => {
  return (
    <Stack direction={"row"} sx={{ background: "#fff" }} p={2} gap={4}>
      <Stack width="50%" gap={2}>
        <Heading20>Add Node Details 1</Heading20>
        <Box sx={{ display: "flex", gap: 4 }}>
          <CustomTextField
            placeholder="Node ID"
            disabled={false}
            name="nodeId"
            select={false}
            label="Node ID"
            value={""}
            onInputChange={() => {}}
          />
          <CustomTextField
            placeholder="Node Name"
            disabled={false}
            name="nodeName1"
            select={false}
            label="Node Name"
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

export default AddGatewayStep3;