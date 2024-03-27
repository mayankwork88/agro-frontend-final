import { Box, Button, Stack } from "@mui/material";
import { Heading20 } from "../../components/CustomComponent";
import NotificationCard from "./NotificationCard";
import { CustomPagination, NoData } from "../../components";
import { useTheme } from "@emotion/react";
import { useNotificationContext } from "../../context/NotificationContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UnreadNotification = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    notifications,
    getAllNotification,
    dispatch,
    actions,
    readAllNotification,
    readNotification,
  } = useNotificationContext();
  const dataLength = notifications?.unReadDataLength;
  const pagination = notifications?.unReadPagination;

  useEffect(() => {
    const filter = { status: "unread" };
    getAllNotification(filter);
  }, [pagination]);

  const handleReadNotification = async (alert) => {
    const res = await readNotification(alert?._id);
    const isNode = alert?.deviceId?._id ? true : false;
    const url = `/admin/site-management/${isNode ? "node" : "branch_manager"}/${
      isNode ? alert?.deviceId?._id : alert?.assignedBranchManager
    }`;
    if (res) {
      navigate(url);
      localStorage.setItem("currentTab", 2);
    }
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
          disabled={dataLength > 0 ? false : true}
          onClick={()=>readNotification("readAll")}
        >
          Read all
        </Button>
      </Stack>
      <Stack direction={"column"} gap={2}>
        {notifications?.allUnreadNotifications?.map((ele) => (
          <NotificationCard
            onClick={() => handleReadNotification(ele)}
            sx={{ background: theme.palette.primary.light, cursor: "pointer" }}
            notification={ele}
          />
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
                type: actions?.UNREAD_PAGINATION_CHANGE,
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

export default UnreadNotification;
