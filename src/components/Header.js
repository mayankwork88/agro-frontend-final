import { Stack, Box, Paper, Container } from "@mui/material";
import { Logo } from "../Images";
import { NotificationsDropdown, ProfileMenu, HeaderTabs } from "../components";
import { useNavigate } from "react-router-dom";

const Header = ({ headerTabsData }) => {
  const navigate = useNavigate();
  const nav = window?.location?.pathname === "/admin/dashboard";
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: "7vh",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box
          component="img"
          py={1}
          src={Logo}
          alt="livestock-monitoring-logo"
          onClick={() => (!nav ? navigate("/") : null)}
        />
        <HeaderTabs data={headerTabsData} />
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <NotificationsDropdown />
          <ProfileMenu />
        </Stack>
      </Container>
    </Paper>
  );
};

export default Header;
