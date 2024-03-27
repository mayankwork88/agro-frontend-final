import { Heading20 } from "../components/CustomComponent";
import { Stack, Box, Divider } from "@mui/material";
import { PlayArrowIcon } from "../icons";
import { useTheme } from "@emotion/react";
import {SwitchButtonCard} from "../components";

const UserProfileCard = ({ title, children, toggle}) => {
    const theme = useTheme()
  return (
    <Stack sx={{ background: "#fff", borderRadius: "12px" }}>
      <Box sx={{ p: 2, display: "flex", gap: 2 }}>
        <PlayArrowIcon
          sx={{
            color: theme.palette.primary.main,
            transform: "translate(0) rotate(90deg)",
          }}
        />
        <Heading20>{title}</Heading20>
        {
            toggle? <SwitchButtonCard />:null
        }
       
      </Box>
      <Divider />
      {children}
    </Stack>
  );
};

export default UserProfileCard;
