import * as React from "react";
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { CustomAvatar } from "../components/CustomComponent";

export default function ProfileMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type) => {
    if (type === "profile") {
      navigate("/user/profile");
    } else if (type === "logout") {
      navigate("/login");
      localStorage.removeItem("user");
      localStorage.removeItem("currentTab");
      window.location.reload();
    }
    setAnchorEl(null);
  };

    const userName = JSON.parse(localStorage.getItem("user"))
      ?.userName?.charAt(0)
      .toUpperCase();
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <CustomAvatar>{userName}</CustomAvatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: "150px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem onClick={() => handleClose("profile")}>
          <CustomAvatar sx={{ marginRight: 1 }}>{userName}</CustomAvatar>{" "}
          Profile
        </MenuItem> */}
        {/* <Divider /> */}
        <MenuItem onClick={() => handleClose("logout")}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
