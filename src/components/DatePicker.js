import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { addDays } from "date-fns";
import { useEffect, useState, useRef } from "react";
import { Stack, TextField, InputAdornment } from "@mui/material";
import { CalendarMonthIcon } from "../icons";
import useFormattedDate from "../hooks/useFormattedDate";

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const [open, setOpen] = useState(false);
  const calenderRef = useRef(null);

  const { getFormattedDate } = useFormattedDate();

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    document?.addEventListener("click", handleClickOutsideTheCalender, true);
  }, []);

  const handleClickOutsideTheCalender = (e) => {
    if (calenderRef.current && !calenderRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleSelect = (date) => {
    setSelectedDate(date);
    setOpen(false);
  };
  return (
    <div>
      <Stack sx={{ position: "relative" }}>
        <Stack direction="row" gap={1}>
          {selectedDate ? (
            <TextField
              //   value={paginationDateFormat(selectedDate,"date")}
              value={getFormattedDate(selectedDate,"d")}
              placeholder="MM/DD/YYYY"
              sx={{ width: 150, fontSize: "0.8rem" }}
              size="small"
              onClick={() => setOpen(!open)}
              InputProps={{
                sx: { fontSize: "1rem" },
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          ) : null}
        </Stack>
        <Stack
          ref={calenderRef}
          sx={{
            position: "absolute",
            top: "40px",
            left: "-170px",
            zIndex: "1000000",
          }}
        >
          {open && (
            <Calendar
              date={new Date()}
              onChange={handleSelect}
              className="calendarElement"
              maxDate={addDays(new Date(), 0)}
            />
          )}
        </Stack>
      </Stack>
    </div>
  );
};

export default DatePicker;
