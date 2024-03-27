import { Stack, Box, Button } from "@mui/material";
import { NoDataImg } from "../Images";
import { Heading24 } from "./CustomComponent";
import { AddIcon } from "../icons";

const NoData = ({icon, variant, message, btnText, onBtnClick, NoBorder}) => {

  return (
    <Stack
      sx={{ border:`${NoBorder?'':"2px solid #E7E7E7" }`, borderRadius: "12px", p: 5, my:5}}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
    >
      <Box component="img" src={NoDataImg} width="150px" />
      <Heading24 sx={{ fontWeight: "500", color: "#ADADAD" }}>
        {message}
      </Heading24>
      <Button
        variant={variant || "text"}
        sx={{
          fontSize: "16px",
          padding: "5px 15px",
          textTransform: "capitalize",
        }}
        startIcon={icon === "add" ? <AddIcon fontSize="large" /> : null}
        onClick={onBtnClick}
      >
        {btnText}
      </Button>
    </Stack>
  );
};

export default NoData;
