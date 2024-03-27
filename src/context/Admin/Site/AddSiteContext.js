import { createContext, useState, useEffect } from "react";
import useCheckStatus from "../../../hooks/useCheckStatus";
import useUtils from "../../../hooks/Admin/useUtils";
import { apiRequest } from "../../../apis";
import useGetDetailsByPinCode from "../../../hooks/useGetDetailsByPinCode";
import { assignUserToSite } from "../../../apis/services";

export const AddSiteContext = createContext();

const addSiteInitialState = {
  uid: "",
  name: "",
  address: "",
  pinCode: "",
  city: "",
  state: "",
  country: "",
}

export const AddSiteContextProvider = ({ children }) => {
  const [addSiteDetails, setAddSiteDetails] = useState(addSiteInitialState);

  // STEPPER -->
  const [activeStep, setActiveStep] = useState(0);
  const [adminSiteModal, setAdminSiteModal] = useState(false);
  const [allPendingGateways, setAllPendingGateways] = useState([]);
  const [allPendingGatewaysDataLength, setAllPendingGatewaysDataLength] =
    useState(0);
  const [allSites, setAllSites] = useState([]);
  const [allSitesDataLength, setAllSitesDataLength] = useState(0);
  const [allSitePagination, setAllSitePagination] = useState(1);

  const [userSpecificSites, setUserSpecificSites] = useState([]);
  const [siteQuery, setSiteQuery] = useState(null);
  const [userSpecificSitesPagination, setUserSpecificSitesPagination] =
    useState(1);
  const [userSpecificSitesDataLength, setUserSpecificSitesDataLength] =
    useState([]);
  const [freeSites, setFreeSites] = useState([]);
  const [selectedGatewayToAssign, setSelectedGatewayToAssign] = useState(null);
  const [selectedUserToAssignSite, setSelectedUserToAssignSite] = useState({
    site: null,
    user: null,
  });
  const [customError, setCustomError] = useState({
    error: false,
    type: "",
    message: "",
  });
  const [createdSiteDetail, setCreatedSiteDetail] = useState({
    siteId: null,
    siteCityLat: null,
    siteCityLng: null,
  });
  const [allDevicesConnectedWithGateway, setAllDevicesConnectedWithGateway] =
    useState({ devices: [], gateway: {} });
  const [showMessageModal, setShowMessageModal] = useState({
    open: false,
    message: "",
    type: "",
  });

  const [devicesLatLng, setDevicesLatLng] = useState([]);

  const handleShowMessageModalClose = () =>
    setShowMessageModal({ open: false, message: "", type: "" });
  const handleShowMessageModalOpen = (message, type) =>
    setShowMessageModal({ open: true, message, type });

  const { checkRequestStatus } = useCheckStatus();
  const { openBackdropLoader, setOpenBackdropLoader } = useUtils();

  const {
    PinCodeDetails,
    errorMessage: pinCodeErrorMessage,
    inputLoader,
  } = useGetDetailsByPinCode(addSiteDetails?.pinCode);

  useEffect(() => {
    setAddSiteDetails({
      ...addSiteDetails,
      city: PinCodeDetails?.city,
      state: PinCodeDetails?.state,
      country: PinCodeDetails?.country,
    });
  }, [PinCodeDetails]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddSiteDetails({ ...addSiteDetails, [name]: value });
  };

  const handleSiteQuery = (event) => {
    setSiteQuery(event.target.value);
  };

  useEffect(() => {
    if (siteQuery) {
      const delayDebounceFnc = setTimeout(() => {
        getAllSites(siteQuery);
      }, 1000);
      return () => clearTimeout(delayDebounceFnc);
    } else {
      getAllSites();
    }
  }, [siteQuery, allSitePagination]);

  const getAllSites = (query = "", filter = {}) => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/site/getSiteList?startDate=&endDate=&page=1&limit=10&select=&sort={"_id":-1}&search=${
        query ? query : ""
      }&filter=${JSON.stringify(filter)}`,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          const devices = res?.data?.sites?.result;
          setAllSites(devices);
          setAllSitesDataLength(res?.data?.sites?.totalCount);
        } else {
          setAllSites([]);
          setAllSitesDataLength(0);
          //   alert(checkStatus);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  const getUserSpecificSites = (filter = {}) => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/site/getSiteList?startDate=&endDate=&page=${userSpecificSitesPagination}&limit=10&select=&sort={"_id":-1}&search=&filter=${JSON.stringify(
        filter
      )}`,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          const devices = res?.data?.sites?.result;
          setUserSpecificSites(devices);
          setUserSpecificSitesDataLength(res?.data?.sites?.totalCount);
        } else {
          setUserSpecificSites([]);
          setUserSpecificSitesDataLength(0);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  const getFreeSites = (filter = {}) => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/site/getSiteList?startDate=&endDate=&page=1&limit=10&select=&sort={"_id":-1}&search=&filter=${JSON.stringify(
        filter
      )}`,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          const devices = res?.data?.sites?.result;
          setFreeSites(devices);
        } else {
          setFreeSites([]);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  const handleAddSiteSubmit = () => {
    setOpenBackdropLoader(true);
    const body = {
      uid: addSiteDetails?.uid,
      name: addSiteDetails?.name,
      line1: addSiteDetails?.address,
      pincode: addSiteDetails?.pinCode,
      city: addSiteDetails?.city,
      state: addSiteDetails?.state,
      country: addSiteDetails?.country,
    };
    const res = apiRequest({
      url: `/api/site/addSite`,
      method: "POST",
      data: body,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          const {
            _id,
            location: { latitude, longitude },
          } = res?.data?.data;
          setCreatedSiteDetail({
            siteId: _id,
            siteCityLat: latitude,
            siteCityLng: longitude,
          });
          setCustomError({
            error: null,
          });
          return 200;
        } else {
          setCustomError({
            error: true,
            type: "error",
            message: checkStatus,
          });
          alert(checkStatus);
        }
        return checkStatus;
      })
      .catch((err) => {
        console.log(err.message);
        return err.message;
      })
      .finally(() => {
        setOpenBackdropLoader(false);
        getAllPendingGateways();
      });

    return res;
  };

  useEffect(() => {
    getAllPendingGateways();
  }, []);

  //get all pending gateways
  const getAllPendingGateways = () => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/device/getDeviceList?startDate=&endDate=&page=1&limit=10&select=&sort={"_id":-1}&search=&filter={"type":"gateway","status":"pending"}`,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          const devices = res?.data?.devices?.result;
          setAllPendingGateways(devices);
          setAllPendingGatewaysDataLength(res?.data?.devices?.totalCount);
        } else {
          setAllPendingGateways([]);
          setAllPendingGatewaysDataLength(0);
          //   alert(checkStatus);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  const handleAssignGatewayToSite = () => {
    const body = {
      siteId: createdSiteDetail?.siteId,
      gatewayIds: [selectedGatewayToAssign],
    };
    if (createdSiteDetail?.siteId && selectedGatewayToAssign) {
      getAllDevicesConnectedWithGateway(selectedGatewayToAssign);
      setOpenBackdropLoader(true);
      apiRequest({
        url: `/api/site/assignGatewayToSite`,
        method: "POST",
        data: body,
      })
        .then((res) => {
          const checkStatus = checkRequestStatus(res);
          if (!checkStatus) {
            setActiveStep(2);
          } else {
            alert(checkStatus);
          }
        })
        .catch((err) => console.log(err.message))
        .finally(() => setOpenBackdropLoader(false));
      setCustomError({
        error: false,
        type: "",
        message: "",
      });
    } else {
      const message = selectedGatewayToAssign
        ? "Something went wrong"
        : "Please select a gateway";
      setCustomError({
        error: true,
        type: "error",
        message,
      });
    }
  };

  const handleAssignUserToSite = async () => {
    const body = {
      siteId: [selectedUserToAssignSite?.site],
      userId: selectedUserToAssignSite?.user,
    };
    setOpenBackdropLoader(true);
    const res = await assignUserToSite(body);
    if (res.status === 200) {
      handleShowMessageModalOpen("User successfully assigned", "message");
      setOpenBackdropLoader(true);
    } else {
      alert(res);
      setOpenBackdropLoader(true);
    }
  };

  const handleDeleteSite = (siteId) => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/site/deleteSite/${siteId}`,
      method: "DELETE",
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          handleShowMessageModalOpen("Site successfully deleted", "message");
        } else {
          alert(checkStatus);
        }
      })
      .catch((err) =>
        console.log(err?.message, "-----------GOT-----------ERROR---------")
      )
      .finally(() => {
        setOpenBackdropLoader(false);
      });
  };

  const getAllDevicesConnectedWithGateway = (gatewayId) => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/device/getdevicesbygatewayid/${gatewayId}`,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          const devices = res?.data?.devices?.result;
          const gateway = res?.data?.gateway;
          setAllDevicesConnectedWithGateway({ devices, gateway });
        } else {
          setAllDevicesConnectedWithGateway([]);
          alert(checkStatus);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  const handleAddDropPointOfDevice = (deviceId, lat, lng) => {
    const body = {
      deviceId: deviceId,
      latitude: lat.toString(),
      longitude: lng.toString(),
    };

    setOpenBackdropLoader(true);
    const message = apiRequest({
      url: `/api/device/addDropPointOfDevice`,
      method: "POST",
      data: body,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          return 200;
        } else {
          setAllDevicesConnectedWithGateway([]);
          alert(checkStatus);
          return checkStatus;
        }
      })
      .catch((err) => {
        console.log(err.message);
        return err.message;
      })
      .finally(() => setOpenBackdropLoader(false));

    return message;
  };

  const getDevicesLatLng = () => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/device/getDeviceList?startDate=&endDate=&page=1&limit=10&select={"location": 1,"type":1}&sort={"_id":-1}&search=`,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          const devices = res?.data?.devices?.result;
          setDevicesLatLng(devices);
        } else {
          setDevicesLatLng([]);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  return (
    <AddSiteContext.Provider
      value={{
        addSiteDetails,
        handleChange,
        activeStep,
        setActiveStep,
        handleAddSiteSubmit,
        allPendingGateways,
        allPendingGatewaysDataLength,
        selectedGatewayToAssign,
        setSelectedGatewayToAssign,
        adminSiteModal,
        setAdminSiteModal,
        handleAssignGatewayToSite,
        customError,
        setCustomError,
        inputLoader,
        allSites,
        selectedUserToAssignSite,
        setSelectedUserToAssignSite,
        handleAssignUserToSite,
        handleDeleteSite,
        createdSiteDetail,
        setCreatedSiteDetail,
        handleAddDropPointOfDevice,
        allDevicesConnectedWithGateway,
        handleSiteQuery,
        getAllDevicesConnectedWithGateway,
        getAllSites,
        getUserSpecificSites,
        userSpecificSites,
        getFreeSites,
        freeSites,
        userSpecificSitesDataLength,
        userSpecificSitesPagination,
        setUserSpecificSitesPagination,
        allSitesDataLength,
        allSitePagination,
        setAllSitePagination,
        showMessageModal,
        handleShowMessageModalClose,
        openBackdropLoader,
        pinCodeErrorMessage,
        devicesLatLng,
        getDevicesLatLng,
        getAllPendingGateways,
        setOpenBackdropLoader,
        addSiteInitialState,
        setAddSiteDetails 
      }}
    >
      {children}
    </AddSiteContext.Provider>
  );
};
