import React, { useState, Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Badge,
  Divider,
  IconButton,
  styled,
  createTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiAvatar from "@mui/material/Avatar";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiMenu from "@mui/material/Menu";
import { NotificationsNoneIcon } from "../icons";
import { NoNotifications } from "../components";
import { useNotificationContext } from "../context/NotificationContext";
import useFormattedDate from "../hooks/useFormattedDate";
// import { NoNotifications } from "../ComponentsV2";
// import { NotificationContext } from "../context/NotificationContext";
// import useDateFormat from "../hooks/useDateFormat";

const theme = createTheme();
const Menu = styled(MuiMenu)(({ theme }) => ({
  "& .MuiMenu-paper": {
    width: 380,
    overflow: "hidden",
    marginTop: theme.spacing(4),
    [theme?.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  "& .MuiMenu-list": {
    padding: 0,
  },
}));
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));
const styles = {
  maxHeight: 349,
  overflowY: "scroll",
  "& .MuiMenuItem-root:last-of-type": {
    border: 0,
  },
};
const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: "1 1 100%",
  overflow: "hidden",
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  marginBottom: theme.spacing(0.75),
}));
const MenuItemSubtitle = styled(Typography)`
  flex: "1 1 100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
`;
const NotificationsDropdown = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  const { getFormattedDate } = useFormattedDate();
  const { getAllNotification } = useNotificationContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const { notifications, getNotificationCount } = useNotificationContext();

  const notification = () => {
    getNotificationCount().then((data) => {
      if (data?.status) {
        setNotificationCount(data?.count);
      } else {
        setNotificationCount(0);
      }
    });
  };

  useEffect(() => {
    notification();
    const interval = setInterval(notification, 30000);
    return () => clearInterval(interval);
  }, []);

  const hidden = useMediaQuery(theme.breakpoints.down("lg"));
  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
    const filter = { status: "unread" };
    getAllNotification(filter);
    // getAllUnreadNotification();
    // getAllReadNotification();
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return (
        <Box
          sx={{
            ...styles,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            ...styles,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      );
    }
  };

  const handleViewAll = () => {
    navigate("/notifications");
    setAnchorEl(null);
  };

  const handleNotificationClick = (liveStockId, alertId) => {
    // navigate(`/livestocks/${liveStockId}`);
    // handleDropdownClose();
    // localStorage.setItem("currentTab", 3);
    // setUnreadToReadNotification(alertId);
  };
  return (
    <Fragment>
      <IconButton
        color="inherit"
        aria-haspopup="true"
        onClick={handleDropdownOpen}
        aria-controls="customized-menu"
      >
        <Badge
          className="badge"
          max={999}
          badgeContent={notificationCount}
          color="primary"
        >
          <NotificationsNoneIcon sx={{ fontSize: "28px" }} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            my: 2,
          }}
        >
          <Typography
            align="center"
            sx={{ fontSize: "1.5rem", fontWeight: 600, width: "100%" }}
          >
            Notifications
          </Typography>
        </Box>
        <Divider />
        <ScrollWrapper>
          {notifications?.allUnreadNotifications?.length > 0 ? (
            <>
              {notifications?.allUnreadNotifications?.map((item) => {
                return (
                  <>
                    <MenuItem
                      onClick={() =>
                        handleNotificationClick(item?.liveStock, item?._id)
                      }
                      key={item?._id}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {/* <Avatar alt={item?.name} src="/images/avatars/4.png" size="large" /> */}
                        <Box
                          sx={{
                            flex: "1 1",
                            display: "flex",
                            overflow: "hidden",
                            flexDirection: "column",
                          }}
                        >
                          <MenuItemTitle sx={{ fontSize: "12px" }}>
                            {item?.name}
                          </MenuItemTitle>
                          <MenuItemTitle sx={{ fontSize: "12px" }}>
                            {item?.deviceId?.uid}
                          </MenuItemTitle>
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.disabled",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          {getFormattedDate(item?.createdAt, "d")}
                          <br />
                          {getFormattedDate(item?.createdAt, "t")}
                        </Typography>
                      </Box>
                    </MenuItem>
                  </>
                );
              })}
            </>
          ) : (
            <NoNotifications />
          )}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{
            padding: "16px 16px",
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            style={{
              fontSize: "0.9rem",
            }}
            onClick={handleViewAll}
          >
            View All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
export default NotificationsDropdown;
