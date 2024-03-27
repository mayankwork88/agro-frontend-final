import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Stack } from "@mui/material";
import { Heading12, Heading16 } from "./CustomComponent";
import { useTheme } from "@emotion/react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["6", "12", "18"];

export default function SelectCheckMarkInput({
  name,
  label,
  checkboxValue,
  setNewCheckboxValue,
  validation,
  background,
  disabled
}) {
  const theme = useTheme();
  return (
    <Stack width="100%" gap="0.7" sx={{ position: "relative" }}>
      <Heading16>{label}</Heading16>
      <Select
        multiple
        displayEmpty
        value={checkboxValue}
        onChange={setNewCheckboxValue}
        disabled={disabled}
        name={name}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected?.length === 0) {
            return (
              <Heading16 sx={{ color: "rgba(0,0,0,0.3)" }}>{label}</Heading16>
            );
          }

          return selected?.join(", ");
        }}
        MenuProps={MenuProps}
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          height: "5vh",
          borderRadius: "8px",
          mt: "5px",
          background: background?background:"#fff",
        }}
        error={validation?.error}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={checkboxValue?.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
      {validation?.error ? (
        <Heading12
          sx={{
            color: theme.palette.error.main,
            position: "absolute",
            bottom: "-22px",
            left: "18px",
          }}
        >
          {validation?.message}
        </Heading12>
      ) : null}
    </Stack>
  );
}
