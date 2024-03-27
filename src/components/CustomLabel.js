import { Box } from "@mui/material";
import React from "react";
import { Heading12, Heading16 } from "./CustomComponent";

const CustomLabel = ({ text, type,sx,size }) => {

  const getColor = (ty) => {
    if (ty?.toLowerCase() === "success")
    return { main: "06b95f", light: "06b95f40" };
    if (ty?.toLowerCase() === "warning")
      return { main: "B99102", light: "FFF7CF" };
    if (ty?.toLowerCase() === "info")
      return { main: "328CED", light: "EBF5FF" };
    else return { main: "EF4242", light: "FFEFEF" };
  };
  return (
    <Box
      sx={{
        background: `#${getColor(type).light}`,
        color: `#${getColor(type).main}`,
        py: 1,
        borderRadius: "8px",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        ...sx
      }}
    >
      {
        size === "md"?<Heading16>{text}</Heading16>:<Heading12>{text}</Heading12>
      }
      
    </Box>
  );
};

export default CustomLabel;
