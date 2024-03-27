import { Stack } from "@mui/material";
import { Heading16, Heading28 } from "./CustomComponent";

const ParameterCard = ({ title, value, suffix, sx }) => {
  return (
    <Stack sx={sx} width="100%" >
      <Heading16>{title}</Heading16>
      <Heading28 sx={{display:'flex', alignItems:'flex-end'}}>
        {value} <Heading16 sx={{textTransform:'none', color:"#8F8F8F",mb:0.6, ml:0.5}}>{suffix}</Heading16>
      </Heading28>
    </Stack>
  );
};

export default ParameterCard;
