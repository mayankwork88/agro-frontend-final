import { Button, Stack, Box } from "@mui/material";
import React, { useState } from "react";
import { Heading20 } from "./CustomComponent";
import DatePicker from "./DatePicker";

const DateRangeTabPane = ({
  tabText,
  btnText,
  onBtnClick,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100%"}
    >
      <Heading20>{tabText}</Heading20>
      <Box sx={{ display: "flex", gap: 2 }}>
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        {btnText && (
          <Button variant="contained" onClick={onBtnClick}>
            {btnText}
          </Button>
        )}
      </Box>
    </Stack>
  );
};

export default DateRangeTabPane;
