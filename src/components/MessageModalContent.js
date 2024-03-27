import { Box, Stack, Button } from "@mui/material";
import { Heading24 } from "./CustomComponent";
import { InfoOutlinedIcon } from "../icons";
import { useTheme } from "@emotion/react";
// { onCancel, onConfirm }
const MessageModalContent = ({onCancel, onConfirm}) => {
  const theme = useTheme();
  return (
    <Stack direction={"column"} alignItems={"center"} p={2} py={5} gap={2}>
      <InfoOutlinedIcon
        sx={{ color: theme.palette.error.main, fontSize: "5rem" }}
      />
      <Heading24
        sx={{
          textAlign: "center",
          textTransform: "none",
          fontWeight:'500'
        }}
      >
        Are you sure you want to delete?
      </Heading24>
      <Box sx={{width:'100%', display:'flex', gap:2}}>
        <Button variant="outlined"  sx={{width:'100%'}} size="large" onClick={onCancel}>
          No
        </Button>
        <Button variant="outlined"  sx={{width:'100%'}} size="large" onClick={onConfirm}>
          Yes
        </Button>
      </Box>
    </Stack>
  );
};

export default MessageModalContent;
