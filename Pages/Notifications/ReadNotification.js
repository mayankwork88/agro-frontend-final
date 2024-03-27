import { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { Heading20 } from "../../components/CustomComponent";
import NotificationCard from "./NotificationCard";
import { CustomPagination, NoData } from "../../components";
import { useNotificationContext } from "../../context/NotificationContext";

const ReadNotification = () => {
  const {
    notifications,
    getAllNotification,
    dispatch,
    actions,
    clearAllNotification,
  } = useNotificationContext();
  const [clearNotification, setClearNotification] = useState(false);
  const dataLength = notifications?.readDataLength;
  const pagination = notifications?.readPagination;

  useEffect(() => {
    const filter = { status: "read" };
    getAllNotification(filter);
  }, [pagination, clearNotification]);

  const handleClearNotification = () => {
    clearAllNotification();
    setClearNotification(!clearNotification);
  };
  return (
    <Stack direction={"column"} gap={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignContent="center"
      >
        <Heading20 sx={{ fontWeight: 600 }}>
          Showing {dataLength < 10 ? dataLength : 10} of {dataLength}{" "}
          notifications
        </Heading20>

        <Button
          variant="contained"
          color="error"
          disabled={dataLength > 0 ? false : true}
          onClick={handleClearNotification}
        >
          Clear all
        </Button>
      </Stack>
      <Stack direction={"column"} gap={2}>
        {notifications?.allReadNotifications?.map((ele) => (
          <NotificationCard notification={ele} />
        ))}
      </Stack>
      {dataLength > 10 ? (
        <Box sx={{ alignSelf: "flex-end" }}>
          <CustomPagination
            size="large"
            page={pagination}
            count={Math.ceil(dataLength / 10)}
            onPageChange={(pageNo) =>
              dispatch({
                type: actions?.READ_PAGINATION_CHANGE,
                payload: pageNo,
              })
            }
          />
        </Box>
      ) : null}
      {!dataLength ? <NoData message="nothing to show" /> : null}
    </Stack>
  );
};

export default ReadNotification;
