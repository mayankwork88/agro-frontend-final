import { Paper, Box } from "@mui/material";
import { Heading16 } from "../../components/CustomComponent";
import useFormattedDate from "../../hooks/useFormattedDate";

const NotificationCard = ({ sx, notification, onClick }) => {
  const { getFormattedDate } = useFormattedDate();
  return (
    <Paper
      elevation={2}
      onClick={onClick}
      sx={{
        ...sx,
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Heading16 sx={{ fontWeight: 600 }}>{notification?.name}</Heading16>
        <Heading16 sx={{ fontWeight: 600 }}>
          {notification?.deviceId?.uid}
        </Heading16>
        {/* <Heading16 sx={{ fontWeight: 600 }}>{notification?.type} {notification?.unit}</Heading16> */}
      </Box>
      <Box>
        <Heading16 sx={{ fontWeight: 600 }}>
          {getFormattedDate(notification?.updatedAt, "d")}
        </Heading16>
        <Heading16 sx={{ fontWeight: 600 }}>
          {getFormattedDate(notification?.updatedAt, "t")}
        </Heading16>
      </Box>
    </Paper>
  );
};

export default NotificationCard;
