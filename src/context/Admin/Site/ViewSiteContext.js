import { createContext, useState } from "react";
import useUtils from "../../../hooks/Admin/useUtils";
import { apiRequest } from "../../../apis";
import useFormattedDate from "../../../hooks/useFormattedDate";

export const ViewSiteContext = createContext();

export const ViewSiteContextProvider = ({ children }) => {
  const [nodeDetails, setNodeDetails] = useState();
  const [thresholds, setThresholds] = useState({});
  const [thresholdSite, setThresholdSite] = useState({});
  const [editThreshold, setEditThreshold] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState(null);
  const [lastUpdatedSensorData, setLastUpdatedSensorData] = useState(null);
  const [allAlerts, setAllAlerts] = useState(null);
  const [allAlertsDataLength, setAllAlertsDataLength] = useState(0);
  const [sensorsDetails, setSensorsDetails] = useState([]);
  const [getAllGateways, setAllGateways] = useState([]);
  const [getAllSiteGatewaysDataLength, setAllSiteGatewaysDataLength] = useState(
    []
  );
  const [isGatewayUnassigned, setIsGatewayUnassigned] = useState(false);
  const [getAllSiteGatewaysPagination, setAllSiteGatewaysPagination] =
    useState(1);

  const [deviceWithSensorDate, setDeviceWithSensorDate] = useState([]);
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const onSnackbarAlertClose = () => {
    setSnackbarAlert({ open: false, type: "", message: "" });
  };

  const onSnackbarAlertOpen = (type, message) => {
    setSnackbarAlert({ open: true, type, message });
  };

  const { setOpenBackdropLoader, openBackdropLoader } = useUtils();
  const { apiDateFormate } = useFormattedDate();

  const getDeviceDetailByIdSiteContext = (id) => {
    setOpenBackdropLoader(true);
    if (id) {
      apiRequest({
        url: `/api/site/getSiteDetailById/${id}`,
      })
        .then((res) => {
          if (res?.status === 200) {
            const site = res?.data?.site;
            setDeviceDetails(site);
          } else {
            setDeviceDetails(null);
            throw new Error("Something went wrong");
          }
        })
        .catch((err) => console.log(err.message))
        .finally(() => setOpenBackdropLoader(false));
    }
  };

  const getLastUpdatedSensorData = (filter) => {
    setOpenBackdropLoader(true);
    if (filter) {
      apiRequest({
        url: `/api/sensor/getLastUpdatedSensorData?filter=${JSON.stringify(
          filter
        )}`,
      })
        .then((res) => {
          if (res?.status === 200) {
            const device = res?.data?.sensor;
            setLastUpdatedSensorData(device);
          } else {
            setLastUpdatedSensorData(null);
            throw new Error("Something went wrong");
          }
        })
        .catch((err) => console.log(err.message))
        .finally(() => setOpenBackdropLoader(false));
    }
  };

  const getDeviceAlerts = (filters, pagination, selectedDate) => {
    setOpenBackdropLoader(true);
    if (filters) {
      apiRequest({
        url: `/api/sensor/getAlerts?startDate=${apiDateFormate(
          selectedDate,
          "start"
        )}&endDate=${apiDateFormate(
          selectedDate
        )}&page=${pagination}&limit=10&select=&sort={"_id":-1}&search=&filter=${JSON.stringify(
          filters
        )}`,
      })
        .then((res) => {
          if (res?.status === 200) {
            const { result, totalCount } = res?.data?.alerts;
            setAllAlerts(result);
            setAllAlertsDataLength(totalCount);
          } else {
            setAllAlerts([]);
            setAllAlertsDataLength(0);
            throw new Error("Something went wrong");
          }
        })
        .catch((err) => console.log(err.message))
        .finally(() => setOpenBackdropLoader(false));
    }
  };

  const getSensorDetails = (filters, date) => {
    setOpenBackdropLoader(true);
    if (filters) {
      apiRequest({
        url: `/api/sensor/getSensorsDetails?startDate=${apiDateFormate(
          date,
          "start"
        )}&endDate=${new Date(
          apiDateFormate(date, "end")
        )}&page=1&limit=10&select=&sort={"_id":-1}&search=&filter=${JSON.stringify(
          filters
        )}`,
      })
        .then((res) => {
          if (res?.status === 200) {
            const device = res?.data?.sensors?.result;
            setSensorsDetails(device);
          } else {
            setSensorsDetails(null);
            throw new Error("Something went wrong");
          }
        })
        .catch((err) => console.log(err.message))
        .finally(() => setOpenBackdropLoader(false));
    }
  };

  const getDeviceBySiteId = (id, filters) => {
    setOpenBackdropLoader(true);
    if (filters) {
      apiRequest({
        url: `/api/site/getDeviceBySiteId/${id}?startDate=&endDate=&page=${getAllSiteGatewaysPagination}&limit=10&select=&sort={"_id":-1}&search=&filter=${JSON.stringify(
          filters
        )}`,
      })
        .then((res) => {
          if (res?.status === 200) {
            const { totalCount, result } = res?.data?.devices;
            setAllGateways(result);
            setAllSiteGatewaysDataLength(totalCount);
          } else {
            setAllGateways(null);
            setAllSiteGatewaysDataLength(0);
            throw new Error("Something went wrong");
          }
        })
        .catch((err) => console.log(err.message))
        .finally(() => setOpenBackdropLoader(false));
    }
  };

  const removeGatewayFromSite = (siteId, gatewayId) => {
    setOpenBackdropLoader(true);
    const body = {
      siteId,
      gatewayId,
    };
    if (body?.siteId && body?.gatewayId) {
      apiRequest({
        url: `/api/site/unassignGatewayFromSite`,
        method: "POST",
        data: body,
      })
        .then((res) => {
          if (res?.status === 200) {
            onSnackbarAlertOpen("success", "Gateway successfully removed");
            setIsGatewayUnassigned(!isGatewayUnassigned);
          } else {
            throw new Error("Something went wrong");
          }
        })
        .catch((err) => alert(err.message))
        .finally(() => setOpenBackdropLoader(false));
    }
  };

  function getDeviceWithSensorDate(filters) {
    setOpenBackdropLoader(true);
    if (filters) {
      apiRequest({
        url: `/api/sensor/getDeviceWithSensorData?page=1&limit=10&search=&filter=${JSON.stringify(
          filters
        )}`,
      })
        .then((res) => {
          if (res?.status === 200) {
            const device = res?.data?.devicesWithSensorData;
            setDeviceWithSensorDate(device);
          } else {
            setDeviceWithSensorDate(null);
            throw new Error("Something went wrong");
          }
        })
        .catch((err) => console.log(err.message))
        .finally(() => setOpenBackdropLoader(false));
    }
  }

  //THRESHOLDS

  const getData = (data) => {
    const excludes = [
      "createdAt",
      "status",
      "type",
      "updatedAt",
      "_id",
      "__v",
      "siteId",
    ];
    excludes?.map((ele) => delete data[ele]);
    return data;
  };

  function getThresholds(siteId) {
    setOpenBackdropLoader(true);
    if (siteId) {
      apiRequest({
        url: `/api/site/getThreshold/?siteId=${siteId}`,
      })
        .then((res) => {
          if (res?.status === 200) {
            const { site, threshold } = res?.data;
            setThresholdSite(site);
            if (threshold?._id) setThresholds(getData(threshold));
          } else {
            setThresholds(null);
            throw new Error("Something went wrong");
          }
        })
        .catch((err) => console.log(err.message))
        .finally(() => setOpenBackdropLoader(false));
    }
  }

  function setEditThresholds(siteId, type) {
    setOpenBackdropLoader(true);
    const body = {
      siteId,
      type, // reset || update
      threshold: thresholds,
    };

    if (siteId) {
      if (type === "reset") delete body.threshold;
      apiRequest({
        url: `/api/site/setThreshold`,
        method: "POST",
        data: body,
      })
        .then((res) => {
          if (res?.status === 200) {
            setEditThreshold(false);
            getThresholds(siteId);
            alert(type);
          } else {
            throw new Error("Something went wrong");
          }
        })
        .catch((err) => console.log(err.message))
        .finally(() => setOpenBackdropLoader(false));
    }
  }

  return (
    <ViewSiteContext.Provider
      value={{
        getDeviceDetailByIdSiteContext,
        deviceDetails,
        getLastUpdatedSensorData,
        lastUpdatedSensorData,
        getDeviceAlerts,
        allAlerts,
        sensorsDetails,
        getSensorDetails,
        getDeviceBySiteId,
        getAllGateways,
        getDeviceWithSensorDate,
        deviceWithSensorDate,
        nodeDetails,
        setNodeDetails,
        getThresholds,
        thresholds,
        setThresholds,
        setEditThresholds,
        editThreshold,
        setEditThreshold,
        thresholdSite,
        snackbarAlert,
        onSnackbarAlertClose,
        onSnackbarAlertOpen,
        getAllSiteGatewaysDataLength,
        getAllSiteGatewaysPagination,
        setAllSiteGatewaysPagination,
        removeGatewayFromSite,
        isGatewayUnassigned,
        allAlertsDataLength,
        openBackdropLoader,
      }}
    >
      {children}
    </ViewSiteContext.Provider>
  );
};
export default ViewSiteContextProvider;
