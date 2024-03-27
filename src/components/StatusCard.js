import React from "react";
import { Box, Stack } from "@mui/material";
import { Heading16 } from "./CustomComponent";

const StatusCard = ({text, status, icon, statusColor,suffix}) => {
  return (
    <Stack width="100%" direction="row" justifyContent='space-between' sx={{border:'1px solid #DDDDDD',p:1.8, borderRadius:2, background:'#F7F8FD'}}>
      <Box sx={{display:'flex', alignItems:'center'}}>
        {icon}
        <Heading16 variant="h5">{text}</Heading16>
      </Box>
      <Heading16 variant="h5" sx={{display:'flex', alignItems:'center',color:statusColor}}>{status?.includes("undefined")?"N/A":`${status}${suffix}`}</Heading16>
    </Stack>
  );
};

export default StatusCard;
