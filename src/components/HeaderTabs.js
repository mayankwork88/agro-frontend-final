import { useState } from "react";
import { Stack, Box } from "@mui/material";
import { Heading16, ActiveLine } from "./CustomComponent";
import { useNavigate } from "react-router-dom";

const HeaderTabs = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = (ele) => {
    navigate(`/${ele?.link}`);
  };

  const getHighlighted = (link) => {
    const a = `/${link?.toLowerCase()}`;
    const b = window.location.pathname
      ?.toLowerCase()
      ?.split("/")
      ?.slice(0, 3)
      ?.join("/");
    return a === b ? true : false;
  };

  return (
    <Stack direction={"row"} gap={3}>
      {data?.map((ele) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => handleClick(ele)}
        >
          <Heading16>{ele?.label}</Heading16>
          {getHighlighted(ele?.link) ? <ActiveLine /> : null}
        </Box>
      ))}
    </Stack>
  );
};

export default HeaderTabs;
