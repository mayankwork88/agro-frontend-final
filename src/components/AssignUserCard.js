import { Box, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import { Heading16, Heading12 } from "./CustomComponent";
import Checkbox from "@mui/material/Checkbox";

const AssignUserCard = ({
  name,
  id,
  value,
  handleChange,
  selectedValue,
  checkbox,
  checkboxValue
}) => {
  return (
    <Stack
      direction="row"
      sx={{
        borderRadius: "8px",
        border: "2px solid #EBE7E7",
        my: 2,
        p: 2,
        pl: 0.5,
        py: 1,
      }}
    >
      {checkbox ? (
        <Checkbox
          checked={checkboxValue}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <Radio
          sx={{ width: 40 }}
          checked={selectedValue}
          onChange={handleChange}
          value={value}
          name="radio-buttons"
          inputProps={{ "aria-label": "A" }}
        />
      )}

      <Box>
        <Heading12 sx={{ m: 0 }}>{id}</Heading12>
        <Heading16 sx={{ m: 0 }}>{name}</Heading16>
      </Box>
    </Stack>
  );
};

export default AssignUserCard;
