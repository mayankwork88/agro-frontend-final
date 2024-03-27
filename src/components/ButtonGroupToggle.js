import * as React from "react";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import LaptopIcon from "@mui/icons-material/Laptop";
import TvIcon from "@mui/icons-material/Tv";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ButtonGroupToggle({activeTab, setActiveTab}) {
  const [devices, setDevices] = React.useState(() => ["phone"]);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setActiveTab(newAlignment);
    }
  };

  const handleDevices = (event, newDevices) => {
    if (newDevices.length) {
      setDevices(newDevices);
    }
  };

  return (
    <ToggleButtonGroup
      value={activeTab}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton
        sx={{
          px: 2,
          fontSize: "18px",
          width: "100%",
          borderRadius: "0",
          borderLeft: "none",
        }}
        value="0"
        aria-label="left aligned"
      >
        6
      </ToggleButton>
      <ToggleButton
        sx={{ px: 2, fontSize: "18px", width: "100%" }}
        value="1"
        aria-label="centered"
      >
        12
      </ToggleButton>
      <ToggleButton
        sx={{
          px: 2,
          fontSize: "18px",
          width: "100%",
          borderRadius: "0",
          borderRight: "none",
        }}
        value="2"
        aria-label="right aligned"
      >
        18
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
