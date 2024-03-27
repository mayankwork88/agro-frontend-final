import { createContext, useState, useEffect } from "react";
import { apiRequest } from "../../../apis";
import useUtils from "../../../hooks/Admin/useUtils";
import useCheckStatus from "../../../hooks/useCheckStatus";
import useCheckBoxModal from "../../../hooks/Admin/useCheckBoxModal";

export const DeviceContext = createContext();

const addGatewayInitialState = {
  uid: "",
  name: "",
  macId: "",
  description: "",
};

const addBMNodeInitialState = {
  ...addGatewayInitialState,
  depth: [],
};

export const DeviceContextProvider = ({ children }) => {
  const [allGateways, setAllGateways] = useState([]);
  const [gatewayDataLength, setGatewayDataLength] = useState(0);
  const [allBranchManager, setAllBranchManager] = useState([]);
  const [gatewaySelectFilter, setGatewaySelectFilter] = useState("all");
  const [branchManagerSelectFilter, setBranchManagerSelectFilter] =
    useState("all");
  const [nodesSelectFilter, setNodesSelectFilter] = useState("all");
  const [branchManagerDataLength, setBranchManagerDataLength] = useState(0);
  const [allNodes, setAllNodes] = useState([]);
  const [gatewayQuery, setGatewayQuery] = useState(null);
  const [branchManagerQuery, setBranchManagerQuery] = useState(null);
  const [nodeQuery, setNodeQuery] = useState(null);
  const [nodesDataLength, setNodesDataLength] = useState(0);
  const [nodePagination, setNodePagination] = useState(1);
  const [bMPagination, setBMPagination] = useState(1);
  const [gatewayPagination, setGatewayPagination] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState();
  const [paginationPageNo, setPaginationPageNo] = useState(1);
  const { openBackdropLoader, setOpenBackdropLoader } = useUtils();
  const [openDeviceModal, setOpenDeviceModal] = useState(false);
  const [selectCustomError, setSelectCustomError] = useState({
    error: null,
    message: "",
  });
  const [modalContentType, setModalContentType] = useState(null);
  const [allUnassignedBM, setAllUnassignedBM] = useState([]);
  const [allUnassignNode, setAllUnassignNode] = useState([]);
  const [selectedDeviceForAssigned, setSelectedDeviceForAssigned] =
    useState(null);
  const [allUnassignedBMDataLength, setAllUnassignedBMDataLength] = useState(0);
  const [allUnassignedNodeDataLength, setAllUnassignedNodeDataLength] =
    useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [customError, setCustomError] = useState({
    error: null,
    message: "",
    type: "error",
  });
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const { checkRequestStatus } = useCheckStatus();

  const [addNewGateway, setAddNewGateway] = useState(addGatewayInitialState);
  const [addNewBranchManager, setAddNewBranchManager] = useState(
    addBMNodeInitialState
  );

  const [openMessageModal, setOpenMessageModal] = useState({
    open: false,
    message: "",
  });
  const [allAssignedNodesOfABM, setAllAssignedNodesOfABM] = useState([]);
  const [allAssignedNodesOfABMDataLength, setAllAssignedNodesOfABMDataLength] =
    useState([]);
  const [allAssignedNodesOfABMPagination, setAllAssignedNodesOfABMPagination] =
    useState(1);
  const [showMessageModal, setShowMessageModal] = useState({
    open: false,
    message: "",
    type: "",
  });

  const { handleItemChange, resetItems, selectedItems } = useCheckBoxModal();

  const handleShowMessageModalClose = () =>
    setShowMessageModal({ open: false, message: "", type: "" });
  const handleShowMessageModalOpen = (message, type) =>
    setShowMessageModal({ open: true, message, type });

  const onSnackbarAlertClose = () => {
    setSnackbarAlert({ open: false, type: "", message: "" });
  };

  const onSnackbarAlertOpen = (type, message) => {
    setSnackbarAlert({ open: true, type, message });
  };

  const handleAddNewDeviceChange = (event, device) => {
    const { name, value } = event.target;
    if (device === "gateway")
      setAddNewGateway({ ...addNewGateway, [name]: value });
    else if (device === "branch_manager" || device === "node")
      setAddNewBranchManager({ ...addNewBranchManager, [name]: value });
  };

  const addNewDevice = (body) => {
    setOpenBackdropLoader(true);
    apiRequest({ url: `/api/device/addDevice`, method: "POST", data: body })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          setShowSuccessModal(true);
        } else {
          setCustomError({ error: true, message: checkStatus, type: "error" });
        }
      })
      .catch((err) =>
        console.log(err?.message, "-----------GOT-----------ERROR---------")
      )
      .finally(() => {
        setOpenBackdropLoader(false);
      });
  };

  const handleAddNewDeviceSubmit = (device) => {
    if (device === "gateway") {
      const body = {
        uid: addNewGateway?.uid,
        address: addNewGateway?.macId,
        name: addNewGateway?.name,
        description: addNewGateway?.description,
        type: "gateway",
      };
      addNewDevice(body);
    } else if (device === "branch_manager" || device === "node") {
      if (addNewBranchManager?.depth?.length > 0) {
        const body = {
          uid: addNewBranchManager?.uid,
          address: addNewBranchManager?.macId,
          name: addNewBranchManager?.name,
          description: addNewBranchManager?.description,
          depth: {
            6: addNewBranchManager?.depth?.some((ele) => Number(ele) === 6),
            12: addNewBranchManager?.depth?.some((ele) => Number(ele) === 12),
            18: addNewBranchManager?.depth?.some((ele) => Number(ele) === 18),
          },
          type: device, // branch_manager, nodes, gateway
        };
        addNewDevice(body);
        setSelectCustomError({ error: null, message: "" });
      } else {
        setSelectCustomError({
          error: true,
          message: "Please select at least 1 depth level",
        });
      }
    }
  };

  const handleAddNewDeviceCancel = (device) => {
    if (device === "gateway") {
      setAddNewGateway({
        uid: "",
        name: "",
        macId: "",
        description: "",
      });
    } else if (device === "branch_manager" || device === "node") {
      setAddNewBranchManager({
        uid: "",
        name: "",
        macId: "",
        depth: [],
        description: "",
      });
    }
    setCustomError({ error: null, message: "" });
  };

  const getAllGateways = (status, query) => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/device/getDeviceList?startDate=&endDate=&page=${gatewayPagination}&limit=10&select=&sort={"_id":-1}&search=${
        query ? query : ""
      }&filter={"type":"gateway","status":"${status}"}`,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          const devices = res?.data?.devices?.result;
          setAllGateways(devices);
          setGatewayDataLength(res?.data?.devices?.totalCount);
        } else {
          setAllGateways([]);
          setGatewayDataLength(0);
          //   alert(checkStatus);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  const getAllBranchManager = (status, query) => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/device/getDeviceList?startDate=&endDate=&page=${bMPagination}&limit=10&select=&sort={"_id":-1}&search=${
        query ? query : ""
      }&filter={"type":"branch_manager","status":"${status}"}`,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          const devices = res?.data?.devices?.result;
          setAllBranchManager(devices);
          setBranchManagerDataLength(res?.data?.devices?.totalCount);
        } else {
          setAllBranchManager([]);
          setBranchManagerDataLength(0);
          //   alert(checkStatus);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  const getAllNodes = (status, query) => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/device/getDeviceList?startDate=&endDate=&page=${nodePagination}&limit=10&select=&sort={"_id":-1}&search=${
        query ? query : ""
      }&filter={"type":"node","status":"${status}"}`,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          const devices = res?.data?.devices?.result;
          setAllNodes(devices);
          setNodesDataLength(res?.data?.devices?.totalCount);
        } else {
          setAllNodes([]);
          setNodesDataLength(0);
          //   alert(checkStatus);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  const handleGatewaySearch = (eve) => {
    setGatewayQuery(eve.target.value);
  };

  const handleBranchManagerSearch = (eve) => {
    setBranchManagerQuery(eve.target.value);
  };

  const handleNodeSearch = (eve) => {
    setNodeQuery(eve.target.value);
  };

  useEffect(() => {
    if (gatewayQuery) {
      const delayDebounceFnc = setTimeout(() => {
        getAllGateways(gatewaySelectFilter, gatewayQuery);
      }, 1000);
      return () => clearTimeout(delayDebounceFnc);
    } else {
      getAllGateways(gatewaySelectFilter);
    }
  }, [gatewaySelectFilter, gatewayQuery, gatewayPagination]);

  useEffect(() => {
    if (branchManagerQuery) {
      const delayDebounceFnc = setTimeout(() => {
        getAllBranchManager(gatewaySelectFilter, branchManagerQuery);
      }, 1000);
      return () => clearTimeout(delayDebounceFnc);
    } else getAllBranchManager(branchManagerSelectFilter);
  }, [branchManagerSelectFilter, branchManagerQuery, bMPagination]);

  useEffect(() => {
    if (nodeQuery) {
      const delayDebounceFnc = setTimeout(() => {
        getAllNodes(gatewaySelectFilter, nodeQuery);
      }, 1000);
      return () => clearTimeout(delayDebounceFnc);
    } else getAllNodes(nodesSelectFilter);
  }, [nodesSelectFilter, nodeQuery, nodePagination]);

  const getAllUnassignedBM = () => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/device/getDeviceList?startDate=&endDate=&page=1&limit=10&select=&sort={"_id":-1}&search=&filter={"type":"branch_manager","status":"pending","assignedGateway": {"$exists": false}}`,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          const devices = res?.data?.devices?.result;
          setAllUnassignedBM(devices);
          setAllUnassignedBMDataLength(res?.data?.devices?.totalCount);
        } else {
          setAllUnassignedBM([]);
          setAllUnassignedBMDataLength(0);
          //   alert(checkStatus);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  const getAllUnassignNodes = () => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/device/getDeviceList?startDate=&endDate=&page=1&limit=10&select=&sort={"_id":-1}&search=&filter={"type":"node","status":"not_assigned","assignedBranchManager": {"$exists": false}}`,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          const devices = res?.data?.devices?.result;
          setAllUnassignNode(devices);
          setAllUnassignedNodeDataLength(res?.data?.devices?.totalCount);
        } else {
          setAllUnassignNode([]);
          setAllUnassignedNodeDataLength(0);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  const handleBMAssignToGateway = (gateway, bms) => {
    const body = {
      gatewayId: gateway,
      branchIds: bms,
    };
    if (bms?.length > 0) {
      setOpenBackdropLoader(true);
      apiRequest({
        url: `/api/device/assignBranchToGateway`,
        method: "POST",
        data: body,
      })
        .then((res) => {
          const checkStatus = checkRequestStatus(res);
          if (!checkStatus) {
            setOpenDeviceModal(false);
            handleShowMessageModalOpen(
              "Branch Manager successfully assigned",
              "message"
            );
            setCustomError({ error: null, message: "" });
          } else {
            setCustomError({
              error: true,
              message: checkStatus,
              type: "error",
            });
          }
        })
        .catch((err) =>
          console.log(err?.message, "-----------GOT-----------ERROR---------")
        )
        .finally(() => {
          setOpenBackdropLoader(false);
        });
    } else {
      setCustomError({
        error: true,
        message: "Please Select At least one Branch Manager to Assign",
        type: "error",
      });
    }
  };

  const handleNodeAssignToBM = (bm, nodes) => {
    const body = {
      branchId: bm,
      nodeIds: nodes,
    };
    if (nodes?.length > 0) {
      setOpenBackdropLoader(true);
      apiRequest({
        url: `/api/device/assignNodeToBranch`,
        method: "POST",
        data: body,
      })
        .then((res) => {
          const checkStatus = checkRequestStatus(res);
          if (!checkStatus) {
            setOpenDeviceModal(false);
            handleShowMessageModalOpen("Node successfully assigned", "message");
            setCustomError({ error: null, message: "" });
          } else {
            setCustomError({
              error: true,
              message: checkStatus,
              type: "error",
            });
          }
        })
        .catch((err) =>
          console.log(err?.message, "-----------GOT-----------ERROR---------")
        )
        .finally(() => {
          setOpenBackdropLoader(false);
        });
    } else {
      setCustomError({
        error: true,
        message: "Please Select At least one node to Assign",
        type: "error",
      });
    }
  };

  const handleDeviceDelete = (device) => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/device/deleteDevice/${device?.id}`,
      method: "DELETE",
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          setOpenDeviceModal(false);
          handleShowMessageModalOpen(
            `${device?.type} successfully deleted`,
            "message"
          );
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

  const getAllAssignedNodesOfABM = (BmId) => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/device/getNodesByBranchId/${BmId}?startDate=&endDate=&page=${allAssignedNodesOfABMPagination}&limit=10&select=&sort={"_id":-1}&search=`,
    })
      .then((res) => {
        if (res?.status === 200) {
          const device = res?.data?.devices?.result;
          const dataLength = res?.data?.devices?.totalCount;
          setAllAssignedNodesOfABM(device);
          setAllAssignedNodesOfABMDataLength(dataLength);
        } else {
          setAllAssignedNodesOfABM([]);
          setAllAssignedNodesOfABMDataLength(0);
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  const getDeviceById = (id) => {
    setOpenBackdropLoader(true);
    if (id) {
      const res = apiRequest({
        url: `/api/device/getDeviceById/${id}`,
      })
        .then((res) => {
          if (res?.status === 200) {
            const device = res?.data?.device;
            return device;
          } else {
            throw new Error("Something went wrong");
          }
        })
        .catch((err) => {
          console.log(err.message);
          return null;
        })
        .finally(() => setOpenBackdropLoader(false));

      return res;
    }
  };

  return (
    <DeviceContext.Provider
      value={{
        addNewGateway,
        handleAddNewDeviceChange,
        handleAddNewDeviceSubmit,
        getDeviceById,
        openDeviceModal,
        setOpenDeviceModal,
        handleAddNewDeviceCancel,
        customError,
        addNewBranchManager,
        allGateways,
        allBranchManager,
        allNodes,
        gatewayDataLength,
        branchManagerDataLength,
        nodesDataLength,
        gatewaySelectFilter,
        setGatewaySelectFilter,
        branchManagerSelectFilter,
        setBranchManagerSelectFilter,
        nodesSelectFilter,
        setNodesSelectFilter,
        handleGatewaySearch,
        handleBranchManagerSearch,
        handleNodeSearch,
        selectCustomError,
        getAllUnassignedBM,
        allUnassignedBM,
        handleBMAssignToGateway,
        getAllUnassignNodes,
        allUnassignNode,
        handleNodeAssignToBM,
        setCustomError,
        handleDeviceDelete,
        setOpenBackdropLoader,
        setSelectCustomError,
        openBackdropLoader,
        modalContentType,
        setModalContentType,
        selectedDeviceForAssigned,
        setSelectedDeviceForAssigned,
        showSuccessModal,
        snackbarAlert,
        onSnackbarAlertOpen,
        onSnackbarAlertClose,
        openMessageModal,
        setOpenMessageModal,
        getAllAssignedNodesOfABM,
        allAssignedNodesOfABM,
        nodePagination,
        setNodePagination,
        bMPagination,
        setBMPagination,
        gatewayPagination,
        setGatewayPagination,
        showMessageModal,
        handleShowMessageModalClose,
        handleShowMessageModalOpen,
        allAssignedNodesOfABMDataLength,
        allAssignedNodesOfABMPagination,
        setAllAssignedNodesOfABMPagination,
        handleItemChange,
        resetItems,
        selectedItems,
        addGatewayInitialState,
        addBMNodeInitialState,
        setAddNewBranchManager,
        setAddNewGateway,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
