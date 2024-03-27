import { ViewButton, Heading16 } from "../../components/CustomComponent";
import { IconButton } from "@mui/material";
import {
  DeleteOutlineOutlinedIcon,
  AddCircleOutlineIcon,
  CancelPresentationIcon,
} from "../../icons";
import moment from "moment/moment";

const getFormattedDate = (dataString, type) => {
  const time = moment(dataString).format("LT");
  const date = moment(dataString).format("DD-MM-YYYY");
  return type === "d" ? date : type === "t" ? time : `${time}, ${date}`;
};

export const formattedSiteData = (data, theme, onViewClick, onDeleteClick) => {
  return data?.map((ele) => ({
    Uid: [<ViewButton onClick={() => {}}>{ele?.uid}</ViewButton>],
    siteName: ele?.name,
    gateway: ele?.gatewayCount,
    devices: ele?.deviceCount,
    alerts: [
      <Heading16 sx={{ color: theme.palette.error.main }}>
        {ele?.alertCount}
      </Heading16>,
    ],
    viewDetails: [
      <ViewButton onClick={() => onViewClick(ele?._id)}>View</ViewButton>,
    ],
    Unassign: [
      <IconButton aria-label="delete" onClick={() => onDeleteClick(ele?._id)}>
        <CancelPresentationIcon fontSize="medium" />
      </IconButton>,
    ],
  }));
};

export const getUserFormattedData = (
  data,
  theme,
  onViewClick,
  onAssignSiteClick,
  onDeleteClick
) => {
  return data?.map((user) => ({
    Uid: user?.uid,
    userName: user?.name,
    site: user?.sites || "0",
    viewDetails: [
      <ViewButton onClick={() => onViewClick(user?._id)}>View</ViewButton>,
    ],
    assignSite: [
      <IconButton aria-label="add" onClick={() => onAssignSiteClick(user?._id)}>
        <AddCircleOutlineIcon
          fontSize="medium"
          sx={{ color: theme.palette.primary.main }}
        />
      </IconButton>,
    ],
    delete: [
      <IconButton aria-label="delete" onClick={() => onDeleteClick(user?._id)}>
        <DeleteOutlineOutlinedIcon fontSize="medium" />
      </IconButton>,
    ],
  }));
};

export const alertsFormattedData = (data) => {
  if (!data) return [];
  return data?.map((ele) => ({
    alertName: [<Heading16 sx={{ color: "red" }}>{ele?.name}</Heading16>],
    uid: ele?.deviceId?.uid,
    deviceName: ele?.deviceId?.name,
    time: getFormattedDate(ele?.createdAt),
    parameters: ele?.type,
    thresholdValue: `${ele?.threshold} ${ele?.unit}`,
    alertValue: `${ele?.alertValue} ${ele?.unit}`,
  }));
};
