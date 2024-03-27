import React, { useEffect, useState } from "react";
import { Stack, Box, Button } from "@mui/material";
import {
  Heading20,
  Label,
  CircleFill,
  Heading16,
} from "../../../../../components/CustomComponent";
import { GetMap, CustomAlert, SuccessMessage } from "../../../../../components";
import useAddSiteContext from "../../../../../hooks/Admin/useAddSiteContext";

const MarkPositions = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
    type: null,
  });
  const [isInsideCircle, setIsInsideCircle] = useState({
    error: false,
    message: null,
  });
  const {
    createdSiteDetail,
    handleAddDropPointOfDevice,
    setCustomError,
    customError,
    allDevicesConnectedWithGateway,
    devicesLatLng,
    getDevicesLatLng,
    setActiveStep: setAddSiteActiveStep,
    getAllPendingGateways,
  } = useAddSiteContext();

  useEffect(() => {
    getDevicesLatLng();
  }, [activeStep]);

  const devices = allDevicesConnectedWithGateway?.devices?.toSorted((a, b) =>
    a.type.localeCompare(b.type)
  );
  const sortedRes = [allDevicesConnectedWithGateway?.gateway, ...devices];

  const totalCount = sortedRes?.length;
  const isLastStep = totalCount === activeStep;
  const getActive = sortedRes[activeStep];
  const getType =
    getActive?.type === "branch_manager"
      ? "Branch manager"
      : getActive?.type || "Gateway";

  const handleNextStep = async () => {
    if (getActive._id && selectedLocation?.lat && selectedLocation?.lng) {
      const result = await handleAddDropPointOfDevice(
        getActive._id,
        selectedLocation?.lat,
        selectedLocation?.lng
      );
      // result - 200 - move forward else show error
      if (result === 200) {
        setActiveStep(activeStep + 1);
        setCustomError({
          error: null,
        });
        setSelectedLocation({ lat: null, lng: null });
      } else {
        console.log(result);
      }
    } else {
      const message =
        selectedLocation?.lat && selectedLocation?.lng
          ? "Something went wrong"
          : "Please select a location";
      setCustomError({
        error: true,
        type: "error",
        message,
      });
    }
  };

  const gatewayLocation = (isGateway) => {
    const gatewayId = sortedRes?.find((ele) => !ele?.type)?._id;
    const gatewayLocation = devicesLatLng?.find(
      (ele) => ele?._id === gatewayId
    )?.location;
    const lat = gatewayLocation?.latitude || createdSiteDetail?.siteCityLat;
    const lng = gatewayLocation?.longitude || createdSiteDetail?.siteCityLng;
    return isGateway ? gatewayLocation?.latitude : { lat, lng };
  };

  return (
    <>
      {!isLastStep ? (
        <Stack width="100%" gap={2} px={1} py={3}>
          <Heading20>
            Mark{" "}
            <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
              {getType}
            </span>{" "}
            position on map
          </Heading20>
          {customError?.error ? (
            <CustomAlert
              type={customError?.type}
              message={customError?.message}
            />
          ) : null}
          <Box display={"flex"} gap={2} sx={{ textTransform: "capitalize" }}>
            <Label>
              {getType} UID : {getActive?.uid}
            </Label>
            <Label sx={{ textTransform: "capitalize" }}>
              {getType} name : {getActive?.name}
            </Label>
          </Box>
          {isInsideCircle?.error ? (
            <CustomAlert type={"error"} message={isInsideCircle?.message} />
          ) : null}
          {gatewayLocation(true) ? (
            <Stack direction={"row"} gap={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <CircleFill
                  sx={{ background: "#FFD9D9", borderColor: "#FF0404" }}
                />
                <Heading16 sx={{ color: "rgba(0,0,0,0.6)" }}>Gateway</Heading16>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <CircleFill
                  sx={{ background: "#D9EDFF", borderColor: "#0487FF" }}
                />
                <Heading16 sx={{ color: "rgba(0,0,0,0.6)" }}>
                  Branch Manager
                </Heading16>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <CircleFill
                  sx={{ background: "#DFFCEC", borderColor: "#26EC81" }}
                />
                <Heading16 sx={{ color: "rgba(0,0,0,0.6)" }}>Node</Heading16>
              </Box>
            </Stack>
          ) : null}

          <GetMap
            mapWidth="100%"
            mapHeight="350px"
            clickOnMap={true}
            selectedLocation={selectedLocation}
            activeDevice={getActive}
            isInsideCircle={isInsideCircle}
            setIsInsideCircle={setIsInsideCircle}
            setLocationOnClick={(lat, lng, type) =>
              setSelectedLocation({ lat, lng, type })
            }
            locationCoordinates={gatewayLocation()}
            devicesCoordinates={sortedRes
              ?.map((ele) =>
                devicesLatLng?.find((ele2) => ele2._id === ele._id)
              )
              .filter((ele) => ele !== undefined)}
          />
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button
              variant="contained"
              type="submit"
              sx={{ px: 2, py: 1 }}
              onClick={handleNextStep}
            >
              {totalCount === activeStep + 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Stack>
      ) : (
        <SuccessMessage
          message={"Site Successfully created"}
          secondBtnText="add another gateway"
          onSecondBtnClick={() => {
            getAllPendingGateways();
            setAddSiteActiveStep(1);
          }}
        />
      )}
    </>
  );
};

export default MarkPositions;
