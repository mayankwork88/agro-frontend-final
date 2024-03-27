import { Box, Button, Stack } from "@mui/material";
import { Heading28 } from "./CustomComponent";
import { AddIcon } from "../icons";
import SearchInput from "./SearchInput";

const TabPaneV2 = ({ paneText, paneTextColor, btnText, onBtnClick, onSearch,searchLabel }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Heading28
        sx={{
          textTransform: "capitalize",
          color: paneTextColor,
          display: "flex",
        }}
      >
        {paneText} 
        {/* <Box sx={{ color: "#B7B7B7" }}>(10)</Box> */}
      </Heading28>

      <Box display="flex" justifyContent="center" alignItems="center" gap={2} minWidth={'40%'}>
        <SearchInput
          placeholder={searchLabel}
          value={null}
          onChange={onSearch}
        />
        <Button
          variant="contained"
          sx={{
            fontSize: "16px",
            padding: "10px 15px",
            textTransform: "capitalize",
            borderRadius: "8px",
            minWidth: "130px",
          }}
          startIcon={<AddIcon fontSize="large" />}
          onClick={onBtnClick}
        >
          {btnText}
        </Button>
      </Box>
    </Stack>
  );
};

export default TabPaneV2;
