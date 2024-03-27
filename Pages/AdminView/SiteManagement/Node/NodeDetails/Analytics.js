import { useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";
import { Heading16 } from "../../../../../components/CustomComponent";
import { useTheme } from "@emotion/react";
import { CustomChart, CustomTextField } from "../../../../../components";
import DatePicker from "../../../../../components/DatePicker";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";
import { parameterData } from "../../../../../Data/parameterData";
import useFormattedDate from "../../../../../hooks/useFormattedDate";
import { useParams } from "react-router-dom";
const depth = [
  {
    label: "6",
    value: "6",
  },
  {
    label: "12",
    value: "12",
  },
  {
    label: "18",
    value: "18",
  },
];

const Analytics = () => {
  const [selectedParameter, setSelectedParameter] = useState("oxygen");
  const [selectedDepth, setSelectedDepth] = useState("6");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const theme = useTheme();
  const { id } = useParams();
  const { getSensorDetails, sensorsDetails } = useViewSiteContext();
  const { getFormattedTime } = useFormattedDate();

  const option = {
    labels: sensorsDetails?.map((data) => getFormattedTime(data?.updatedAt)),
    datasets: [
      {
        label: "Depth Vise Data",
        data: sensorsDetails?.map((data) => data[selectedParameter]),
        backgroundColor: [theme.palette.primary.main],
        borderColor: theme.palette.primary.main,
        borderWidth: 1,
      },
    ],
    options: {
      aspectRatio: 1,
    },
  };

  useEffect(() => {
    const filter = { depth: selectedDepth, deviceId: id };
    getSensorDetails(filter, selectedDate);
  }, [selectedDepth, selectedDate, id]);

  return (
    <Stack direction={"column"} gap={5}>
      <Box
        sx={{
          background: theme.palette.primary.light,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: theme.spacing(1, 2),
        }}
      >
        <Heading16>Depth Vise Data</Heading16>
      </Box>
      <Stack
        sx={{
          width: "100%",
          border: "1px solid #dddddd",
          borderRadius: "8px",
          p: 2,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", width: "30%", gap: 2 }}>
            <CustomTextField
              disabled={false}
              name="parameter"
              select={true}
              value={selectedParameter}
              selectData={parameterData}
              onInputChange={(e) => setSelectedParameter(e.target.value)}
            />
            <CustomTextField
              disabled={false}
              sx={{width:70}}
              name="depth"
              select={true}
              value={selectedDepth}
              selectData={depth}
              onInputChange={(e) => setSelectedDepth(e.target.value)}
            />
          </Box>
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Box>
        <Box sx={{ height: "40vh" }}>
          <CustomChart chartData={option} />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Analytics;
