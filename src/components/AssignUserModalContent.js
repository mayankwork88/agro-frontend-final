import { Box, Button, Stack } from "@mui/material";
import { Heading20, Heading24 } from "./CustomComponent";
import {
  CustomPagination,
  SearchInput,
  AssignUserCard,
  CustomAlert,
  NoData,
  Spinner,
} from "./";
import { useTheme } from "@emotion/react";
import { useState } from "react";

const AssignUserModalContent = ({
  title,
  checkbox,
  data,
  onChange,
  selectedValues,
  handleCancel,
  handleSubmit,
  customError,
  insideStepper,
  searchLabel,
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 500);
  return (
    <Stack width="100%">
      {insideStepper ? (
        <Heading20 sx={{ p: theme.spacing(3, 2, 0, 2) }}>{title}</Heading20>
      ) : (
        <Heading24
          sx={{
            background: theme.palette.primary.light,
            fontWeight: "500",
            p: theme.spacing(1, 2),
          }}
        >
          {title}
        </Heading24>
      )}

      <Stack direction="column" p={2} gap={2}>
        {customError?.error ? (
          <CustomAlert
            type={customError?.type}
            message={customError?.message}
          />
        ) : null}
        <SearchInput
          placeholder={searchLabel}
          name="search"
          onChange={() => {}}
        />
      </Stack>
      {!loading ? (
        <Stack
          p={2}
          direction="row"
          flexWrap="wrap"
          justifyContent={data?.length > 3 ? "space-evenly" : "center"}
        >
          {data?.length ? (
            data?.map((ele) => (
              <Box m={data?.length > 3 ? 0 : 2}>
                <AssignUserCard
                  key={ele?._id}
                  name={ele?.name}
                  id={ele?.uid}
                  value={ele?._id}
                  handleChange={onChange}
                  checkbox={checkbox}
                  checkboxValue={
                    checkbox
                      ? selectedValues?.some((el) => el === ele?._id)
                      : null
                  }
                  selectedValue={selectedValues?.some((el) => el === ele?._id)}
                />
              </Box>
            ))
          ) : (
            <NoData message="Nothing to show" />
          )}
        </Stack>
      ) : (
        <Spinner />
      )}

      <Stack
        width="100%"
        direction="row"
        justifyContent="flex-end"
        p={2}
        py={4}
      >
        {/* <CustomPagination
          size="large"
          page={1}
          count={10}
          onPageChange={(pageNo) => {}}
        /> */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            sx={{ minWidth: "100px" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ minWidth: "100px" }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AssignUserModalContent;
