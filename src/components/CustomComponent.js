import { styled, Box, Typography } from "@mui/material";

export const CustomAvatar = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "500",
  fontSize: "1rem",
}));

export const Heading32 = styled(Typography)(() => ({
  fontWeight: "600",
  textTransform: "capitalize",
  fontSize: "32px",
}));

export const Heading28 = styled(Typography)(() => ({
  fontWeight: "600",
  textTransform: "capitalize",
  fontSize: "28px",
}));

export const Heading24 = styled(Typography)(() => ({
  fontWeight: "600",
  textTransform: "capitalize",
  fontSize: "24px",
}));

export const Heading20 = styled(Typography)(() => ({
  fontWeight: "500",
  textTransform: "capitalize",
  fontSize: "20px",
}));

export const Heading16 = styled(Typography)(() => ({
  fontWeight: "500",
  textTransform: "capitalize",
  fontSize: "16px",
}));

export const Heading12 = styled(Typography)(() => ({
  fontWeight: "500",
  textTransform: "capitalize",
  fontSize: "12px",
}));

export const ActiveLine = styled(Box)(({ theme }) => ({
  width: "110%",
  height: 5,
  background: theme.palette.primary.main,
  borderTopLeftRadius: 50,
  borderTopRightRadius: 50,
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
}));

export const ViewButton = styled(Typography)(({ theme }) => ({
  fontWeight: "500",
  textTransform: "capitalize",
  fontSize: "16px",
  color: theme.palette.primary.main,
  cursor: "pointer",
}));

export const Label = styled(Typography)(({ theme }) => ({
  fontWeight: "500",
  fontSize: "16px",
  color: "#747474",
  background: "#F6F6F6",
  padding: "10px 25px",
  borderRadius: "8px",
}));
export const LabelLight = styled(Typography)(({ theme }) => ({
  fontWeight: "500",
  fontSize: "16px",
  color: "#747474",
  background: theme.palette.primary.light,
  padding: "10px 25px",
  borderRadius: "8px",
}));

export const CircleFill = styled(Box)(({ theme }) => ({
  width: "15px",
  height: "15px",
  borderRadius: "100%",
  background: "red",
  border:'2px solid black'
}));
