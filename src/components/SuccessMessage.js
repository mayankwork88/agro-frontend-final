import { Stack, Box, Button } from "@mui/material";
import { CheckMark } from "../Images";
import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";
import { Heading24 } from "./CustomComponent";
import useDeviceContext from "../hooks/Admin/useDeviceContext";

const SuccessMessage = ({ message, secondBtnText, onSecondBtnClick }) => {
  const { showSuccessModal } = useDeviceContext();
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
  };
  const confettiRef = useRef();

  const createConfetti = confetti.create(confettiRef.current, {
    resize: true,
    useWorker: true,
  });

  const showConfetti = () => {
    createConfetti({
      particleCount: 150,
      spread: 60,
      zIndex: 10000000,
      origin: { x: 0.5, y: 0.7 },
    });
  };

  useEffect(() => {
    showConfetti();
    return () => confetti.reset();
  }, [showSuccessModal]);
  return (
    <Stack
      sx={{
        px: 2,
        py: 4,
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        position: "relative",
        width: "100%",
      }}
    >
      <canvas ref={confettiRef} style={{ position: "absolute" }}></canvas>
      <Box
        sx={{
          ...style,
          width: "165px",
          height: "165px",
          border: "20px solid #66da6480",
        }}
      >
        <Box
          sx={{
            ...style,
            width: "120px",
            height: "120px",
            background: "#66da6480",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Box component="img" src={CheckMark} width="100px" height="100px" />
        </Box>
      </Box>
      <Heading24>{message}</Heading24>
      <Box
        display={"flex"}
        flexDirection={"column"}
        width="100%"
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
      >
        <Button
          variant="contained"
          sx={{ p: "10px 20px", width: "40%" }}
          onClick={() => window.location.reload()}
        >
          Continue
        </Button>
        {secondBtnText ? (
          <Button
            variant="text"
            sx={{ p: "10px 20px", width: "40%", fontWeight: "bold" }}
            onClick={onSecondBtnClick}
          >
            {secondBtnText}
          </Button>
        ) : null}
      </Box>
    </Stack>
  );
};

export default SuccessMessage;
