import React from "react";
import { StatusCard } from "../../../../../components";
import { Stack } from "@mui/material";
import {
  NetworkCellOutlinedIcon,
  Battery5BarOutlinedIcon,
} from "../../../../../icons";
import { Heading20 } from "../../../../../components/CustomComponent";

const statusCardData = [
  {
    text: "Power",
    status: "ONLINE",
    icon: (
      <Battery5BarOutlinedIcon
        fontSize="medium"
        sx={{ mr: 1, color: "#747474" }}
      />
    ),
    statusColor: "#347D00",
    suffix: "",
  },
  {
    text: "signal strength",
    status: "good",
    icon: (
      <NetworkCellOutlinedIcon
        fontSize="medium"
        sx={{ mr: 1, color:"#747474" }}
      />
    ),
    statusColor: "#FFB900",
    suffix: "",
  }
];

const Status = () => {
  return (
    <Stack gap={2}>
      <Heading20>Status</Heading20>
      <Stack direction={"row"} gap={4}>
        {statusCardData?.map((card) => (
          <StatusCard
            key={card.text}
            text={card.text}
            status={card.status}
            icon={card.icon}
            statusColor={card.statusColor}
            suffix={card.suffix}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Status;
