import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  CircleF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useTheme } from "@emotion/react";
import { Heading12, Heading16 } from "./CustomComponent";
import { Box } from "@mui/material";

const MAP_KEY = "AIzaSyBoq0tt73i_mEUB4gsGN8_ClQpD9d9RqFE";
const GetMap = ({
  mapWidth,
  mapHeight,
  locationCoordinates,
  setLocationOnClick,
  markers,
  clickOnMap,
  selectedLocation,
  devicesCoordinates,
  activeDevice,
  setIsInsideCircle,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAP_KEY,
    libraries: ["drawing"],
  });
  const theme = useTheme();

  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);

  const onLoad = useCallback((map) => {
    map?.setZoom(18);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const errorMessage = `You must choose ${
    activeDevice?.type === "branch_manager" ? "Branch Manager" : "Node"
  } location inside ${
    activeDevice?.type === "branch_manager" ? "Gateway" : "Branch Manager"
  } coverage circle`;

  const circleOptions = {
    strokeOpacity: 1,
    strokeWeight: 2,
    fillOpacity: 0.2,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
  };
  const handleCircleClick = (event, deviceLocation, radius) => {
    const clickedLatLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    const isActiveDeviceGatewayOrBM =
      activeDevice?.type === "branch_manager" || !activeDevice;
    const isActiveDeviceNode =
      activeDevice?.type === "node" &&
      deviceLocation?.type === "branch_manager";

    const distance =
      window.google.maps.geometry.spherical.computeDistanceBetween(
        {
          lat: Number(deviceLocation?.location?.latitude),
          lng: Number(deviceLocation?.location?.longitude),
        },
        clickedLatLng
      );
    if (distance <= radius) {
      if (isActiveDeviceGatewayOrBM) handleClick(event);
      else if (isActiveDeviceNode) handleClick(event);
      else {
        setIsInsideCircle({
          error: true,
          message: errorMessage,
        });
      }
    } else {
      setIsInsideCircle(false);
    }
  };

  const handleClick = (e) => {
    setLocationOnClick(e.latLng.lat(), e.latLng.lng(), activeDevice?.type);
    setIsInsideCircle({
      error: false,
      message: "",
    });
  };

  const getCircleConfig = (label) => {
    if (label === "agateway")
      return {
        strokeColor: "#FF0404",
        fillColor: "#FFD9D9",
        radius: 500,
      };
    else if (label === "branch_manager")
      return {
        strokeColor: "#0487FF",
        fillColor: "#D9EDFF",
        radius: 300,
      };
    else if (label === "node")
      return {
        strokeColor: "#26EC81",
        fillColor: "#DFFCEC",
        radius: 100,
      };
  };

  const handleMapClick = (e) => {
    if (clickOnMap) {
      if (activeDevice?.type) {
        setIsInsideCircle({
          error: true,
          message: errorMessage,
        });
      } else {
        handleClick(e);
      }
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: mapWidth,
        height: mapHeight,
      }}
      onClick={handleMapClick}
      center={{
        lat: Number(
          selectedLocation?.lat || locationCoordinates?.lat || 28.5197620256148
        ),
        lng: Number(
          selectedLocation?.lng || locationCoordinates?.lng || 77.40840739277375
        ),
      }}
      options={{
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers
        ?.filter((ele) => ele?.location)
        ?.map((ele) => (
          <Marker
            key={ele?._id}
            label={{
              text: `${ele?.type?.charAt(0).toUpperCase()}`,
              color: "white",
            }}
            title="marker"
            onClick={() => setInfoWindow(ele)}
            position={{
              lat: Number(ele?.location?.latitude),
              lng: Number(ele?.location?.longitude),
            }}
          />
        ))}
      {infoWindow ? (
        <InfoWindowF
          onCloseClick={() => setInfoWindow(null)}
          position={{
            lat: Number(infoWindow?.location?.latitude),
            lng: Number(infoWindow?.location?.longitude),
          }}
        >
          <Box>
            <Heading16>{infoWindow?.uid}</Heading16>
            <Heading12
              sx={{ fontWeight: "bold", color: theme.palette.error.main }}
            >
              {infoWindow?.alerts} Alerts{" "}
            </Heading12>
          </Box>
        </InfoWindowF>
      ) : null}
      {selectedLocation?.lat && selectedLocation?.lng ? (
        <Marker
          key="dcdcde323ddccddc3ded3de"
          title="marker"
          position={{
            lat: Number(selectedLocation?.lat),
            lng: Number(selectedLocation?.lng),
          }}
        />
      ) : null}
      {selectedLocation?.lat && selectedLocation?.lng ? (
        <CircleF
          center={{
            lat: Number(selectedLocation?.lat),
            lng: Number(selectedLocation?.lng),
          }}
          options={{
            ...circleOptions,
            clickable: false,
            draggable: true,
            ...getCircleConfig(selectedLocation?.type || "agateway"),
          }}
        />
      ) : null}
      {devicesCoordinates
        ?.filter((ele) => ele?.location)
        ?.map((ele) => {
          if (ele?.type?.toLowerCase() === "gateway")
            return { ...ele, type: `a${ele?.type}` };
          else return ele;
        })
        ?.toSorted((a, b) => a.type.localeCompare(b.type))
        ?.map((ele) => {
          return (
            <CircleF
              center={{
                lat: Number(ele?.location?.latitude),
                lng: Number(ele?.location?.longitude),
              }}
              options={{
                ...circleOptions,
                ...getCircleConfig(ele?.type),
              }}
              onClick={(event) =>
                handleCircleClick(
                  event,
                  ele,
                  getCircleConfig(ele?.type || "gateway")?.radius
                )
              }
            />
          );
        })}
    </GoogleMap>
  ) : null;
};

export default GetMap;
