import { Box, Button, Stack } from "@mui/material";
import { Heading20 } from "./CustomComponent";
import { AddIcon, DriveFileRenameOutlineOutlinedIcon } from "../icons";
import SearchInput from "./SearchInput";
import CustomTextField from "./TextField";

const TabPane = ({
  paneText,
  paneTextColor,
  btnText,
  onBtnClick,
  variant,
  icon,
  type,
  searchLabel,
  onSearch,
  select,
  selectData,
  onSelectInputChange,
  selectValue
}) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Heading20
        sx={{
          textTransform: "capitalize",
          color: paneTextColor,
          display: "flex",
        }}
      >
        {paneText}
        {/* <Box sx={{ color: "#B7B7B7" }}>(10)</Box> */}
      </Heading20>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={2}
        width="50%"
      >
        <Box sx={{ width: "20%" }}>
          {select ? (
            <CustomTextField
              disabled={false}
              name="uid"
              select={true}
              value={selectValue}
              selectData={selectData}
              onInputChange={onSelectInputChange}
            />
          ) : null}
        </Box>
        <Box sx={{ width: "35%", mt: "5px" }}>
          {searchLabel ? (
            <SearchInput
              placeholder={searchLabel}
              value={null}
              onChange={onSearch}
            />
          ) : null}
        </Box>

        {btnText ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Button
              variant={variant || "text"}
              sx={{
                fontSize: "16px",
                padding: "5px 15px",
                textTransform: "capitalize",
              }}
              type={type}
              startIcon={
                icon === "add" ? (
                  <AddIcon fontSize="large" />
                ) :null
              }
              onClick={onBtnClick}
            >
              {btnText}
            </Button>
          </Box>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default TabPane;
