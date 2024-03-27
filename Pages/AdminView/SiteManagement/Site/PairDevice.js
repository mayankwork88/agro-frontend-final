import { Button, Stack } from "@mui/material";
import React from "react";
import { Heading20, Heading24 } from "../../../../components/CustomComponent";
import { useTheme } from "@emotion/react";
import { SuccessMessage, Spinner } from "../../../../components";
import { usePairDeviceContext } from "../../../../context/Admin/Site/PairDeviceContext";

const PairDevice = () => {
  const { handlePairDevice, getPairingStatus, pairDevice } =
    usePairDeviceContext();
  const theme = useTheme();

  const isPairing = pairDevice?.status === "pairing";
  return (
    <Stack width="100%">
      <Heading24
        sx={{
          background: theme.palette.primary.light,
          fontWeight: "500",
          p: theme.spacing(1, 2),
        }}
      >
        Pair Device
      </Heading24>
      {/* <SuccessMessage message={"Device Successfully Paired"} /> */}
      <Stack direction={"column"} alignItems="center" gap={6} p={4} pt={6}>
        {false ? (
          <Spinner />
        ) : (
          <Heading20>Pair the device to site by clicking connect now</Heading20>
        )}
        <Button
          disabled={isPairing}
          variant="contained"
          onClick={handlePairDevice}
          startIcon={isPairing && <Spinner size={30} />}
        >
          {isPairing ? "Pairing" : "Connect Now"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default PairDevice;
