import React, { useState } from "react";
import {
  AppLayout,
  CustomModal,
  MessageModalContent,
  AssignUserModalContent,
  CustomTabs,
  CustomLabel,
  BackDropLoader,
} from "../../../components";
import { ViewButton, Heading28 } from "../../../components/CustomComponent";
import { Stack, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { headerTabsData } from "../Data";
import {
  AddCircleOutlineIcon,
  DeleteOutlineOutlinedIcon,
} from "../../../icons";
import { useTheme } from "@emotion/react";
import ShowDevice from "./ShowDevice";
import AddGateway from "./Gateway/AddGateway";
import AddBranchManager from "./BranchManager/AddBranchManagerDetail";
import AddNode from "./Node/AddNode";
import useDeviceContext from "../../../hooks/Admin/useDeviceContext";
import useFormattedDate from "../../../hooks/useFormattedDate";
import useUtils from "../../../hooks/Admin/useUtils";

const DeviceManagement = () => {
  const [selectedDeviceForDeletion, setSelectedDeviceForDeletion] = useState({
    id: "",
    type: "",
  });
  const navigate = useNavigate();
  const theme = useTheme();
  const { getFormattedDate } = useFormattedDate();
  const {
    openDeviceModal,
    setOpenDeviceModal,
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
    openBackdropLoader,
    getAllUnassignedBM,
    allUnassignedBM,
    handleBMAssignToGateway,
    customError,
    getAllUnassignNodes,
    allUnassignNode,
    handleNodeAssignToBM,
    setCustomError,
    handleDeviceDelete,
    modalContentType,
    setModalContentType,
    selectedDeviceForAssigned,
    setSelectedDeviceForAssigned,
    openMessageModal,
    setOpenMessageModal,
    nodePagination,
    setNodePagination,
    bMPagination,
    setBMPagination,
    gatewayPagination,
    setGatewayPagination,
    showMessageModal,
    handleShowMessageModalClose,
    handleItemChange,
    resetItems,
    selectedItems,
    setAddNewBranchManager,
    setAddNewGateway,
    addGatewayInitialState,
    addBMNodeInitialState,
  } = useDeviceContext();

  const { getStatus } = useUtils();

  const gatewayHeadData = [
    "UID",
    "device name",
    "Mac ID",
    "Added on",
    "Status",
    "Branch Managers",
    "Assign device",
    "Action",
    "Delete",
  ];

  const getGatewayFormattedData = (data) => {
    return data?.map((ele) => ({
      Uid: ele?.uid,
      deviceName: ele?.name,
      macId: ele?.address,
      addedOn: getFormattedDate(ele?.createdAt),
      status: [
        <CustomLabel
          text={getStatus(ele?.status).value}
          type={getStatus(ele?.status).color}
        />,
      ],
      devices: ele?.assignedDevices,
      assignBM: [
        <IconButton
          aria-label="add"
          onClick={() => {
            handleModal("assignBranchManagerToGateway");
            getAllUnassignedBM();
            setSelectedDeviceForAssigned(ele?._id);
          }}
        >
          <AddCircleOutlineIcon
            fontSize="medium"
            sx={{ color: theme.palette.primary.main }}
          />
        </IconButton>,
      ],
      viewDetails: [
        <ViewButton
          onClick={() =>
            navigate(`/admin/device-management/gateway/${ele?._id}`)
          }
        >
          View
        </ViewButton>,
      ],
      Delete: [
        <IconButton
          aria-label="delete"
          disabled={ele?.status !== "not_assigned"}
          onClick={() => {
            handleModal("delete");
            setSelectedDeviceForDeletion({ id: ele?._id, type: "Gateway" });
          }}
        >
          <DeleteOutlineOutlinedIcon fontSize="medium" />
        </IconButton>,
      ],
    }));
  };

  const BMHeadData = [
    "UID",
    "device name",
    "Mac ID",
    "Added on",
    "Status",
    "Node Devices",
    "Assign device",
    "Action",
    "Delete",
  ];

  const getBMFormattedData = (data) => {
    return data?.map((ele) => ({
      Uid: ele?.uid,
      deviceName: ele?.name,
      macId: ele?.address,
      addedOn: getFormattedDate(ele?.createdAt),
      status: [
        <CustomLabel
          text={getStatus(ele?.status).value}
          type={getStatus(ele?.status).color}
        />,
      ],
      nodeDevices: ele?.assignedDevices,
      assignNode: [
        <IconButton
          aria-label="add"
          onClick={() => {
            handleModal("assignNodeToBranchManager");
            getAllUnassignNodes();
            setSelectedDeviceForAssigned(ele?._id);
          }}
        >
          <AddCircleOutlineIcon
            fontSize="medium"
            sx={{ color: theme.palette.primary.main }}
          />
        </IconButton>,
      ],
      viewDetails: [
        <ViewButton
          onClick={() =>
            navigate(`/admin/device-management/branch-manager/${ele?._id}`)
          }
        >
          View
        </ViewButton>,
      ],
      Delete: [
        <IconButton
          aria-label="delete"
          disabled={ele?.status !== "not_assigned"}
          onClick={() => {
            handleModal("delete");
            setSelectedDeviceForDeletion({
              id: ele?._id,
              type: "Branch Manager",
            });
          }}
        >
          <DeleteOutlineOutlinedIcon fontSize="medium" />
        </IconButton>,
      ],
    }));
  };

  const nodeHeadData = [
    "UID",
    "device name",
    "Mac ID",
    "Added on",
    "Status",
    "Action",
    "Delete",
  ];

  const getNodesFormattedData = (data) => {
    return data?.map((ele) => ({
      Uid: ele?.uid,
      deviceName: ele?.name,
      macId: ele?.address,
      addedOn: getFormattedDate(ele?.createdAt),
      status: [
        <CustomLabel
          text={getStatus(ele?.status).value}
          type={getStatus(ele?.status).color}
        />,
      ],
      viewDetails: [
        <ViewButton
          onClick={() => navigate(`/admin/device-management/node/${ele?._id}`)}
        >
          View
        </ViewButton>,
      ],
      Delete: [
        <IconButton
          aria-label="delete"
          disabled={ele?.status !== "not_assigned"}
          onClick={() => {
            handleModal("delete", "Node");
            setSelectedDeviceForDeletion({ id: ele?._id, type: "Node" });
          }}
        >
          <DeleteOutlineOutlinedIcon fontSize="medium" />
        </IconButton>,
      ],
    }));
  };

  const siteTabData = [
    {
      label: "Node Devices",
      child: (
        <ShowDevice
          btnText="add node devices"
          onBtnClick={() => handleModal("addNode")}
          headData={nodeHeadData}
          rowData={getNodesFormattedData(allNodes)}
          dataLength={nodesDataLength}
          paginationPageNo={nodePagination}
          pageCount={Math.ceil(nodesDataLength / 10)}
          setPaginationPageNo={setNodePagination}
          selectValue={nodesSelectFilter}
          onSearch={handleNodeSearch}
          onSelectChange={(eve) => setNodesSelectFilter(eve.target.value)}
        />
      ),
    },
    {
      label: "Branch Manager",
      child: (
        <ShowDevice
          btnText="add branch manager"
          onBtnClick={() => handleModal("addBranchManager")}
          headData={BMHeadData}
          rowData={getBMFormattedData(allBranchManager)}
          dataLength={branchManagerDataLength}
          paginationPageNo={bMPagination}
          pageCount={Math.ceil(branchManagerDataLength / 10)}
          setPaginationPageNo={setBMPagination}
          selectValue={branchManagerSelectFilter}
          onSearch={handleBranchManagerSearch}
          onSelectChange={(eve) =>
            setBranchManagerSelectFilter(eve.target.value)
          }
        />
      ),
    },
    {
      label: "Gateway",
      child: (
        <ShowDevice
          btnText="add gateway"
          onBtnClick={() => handleModal("addGateway")}
          headData={gatewayHeadData}
          rowData={getGatewayFormattedData(allGateways)}
          dataLength={gatewayDataLength}
          paginationPageNo={gatewayPagination}
          pageCount={Math.ceil(gatewayDataLength / 10)}
          setPaginationPageNo={setGatewayPagination}
          selectValue={gatewaySelectFilter}
          onSearch={handleGatewaySearch}
          onSelectChange={(eve) => setGatewaySelectFilter(eve.target.value)}
        />
      ),
    },
  ];

  const handleCancelAssign = () => {
    resetItems();
    setCustomError({
      error: null,
      message: "",
    });
  };

  const getModalContext = (type) => {
    if (type === "delete")
      return (
        <MessageModalContent
          onCancel={() => setOpenDeviceModal(false)}
          onConfirm={() => handleDeviceDelete(selectedDeviceForDeletion)}
        />
      );
    else if (type === "assignBranchManagerToGateway")
      return (
        <AssignUserModalContent
          checkbox={true}
          title="Assign branch manager"
          searchLabel="Search by Name/UID"
          data={allUnassignedBM}
          selectedValues={selectedItems}
          customError={customError}
          onChange={handleItemChange}
          handleCancel={() => {
            setOpenDeviceModal(false);
            handleCancelAssign();
          }}
          handleSubmit={() =>
            handleBMAssignToGateway(selectedDeviceForAssigned, selectedItems)
          }
        />
      );
    else if (type === "assignNodeToBranchManager") {
      return (
        <AssignUserModalContent
          checkbox={true}
          title="Assign Node"
          searchLabel="Search by Name/UID"
          data={allUnassignNode}
          selectedValues={selectedItems}
          customError={customError}
          onChange={handleItemChange}
          handleCancel={() => {
            setOpenDeviceModal(false);
            handleCancelAssign();
          }}
          handleSubmit={() =>
            handleNodeAssignToBM(selectedDeviceForAssigned, selectedItems)
          }
        />
      );
    } else if (type === "addGateway") return <AddGateway />;
    else if (type === "addBranchManager") return <AddBranchManager />;
    else if (type === "addNode") return <AddNode />;
  };

  const handleModal = (type) => {
    setModalContentType(type);
    setOpenDeviceModal(true);
  };

  const handleModalClose = (type) => {
    setOpenDeviceModal(false);
    if (type === "addGateway") {
      setAddNewGateway(addGatewayInitialState);
    } else if (type === "addBranchManager" || type === "addNode") {
      setAddNewBranchManager(addBMNodeInitialState);
    } else if (
      type === "assignBranchManagerToGateway" ||
      type === "assignNodeToBranchManager"
    ) {
      handleCancelAssign();
    }
  };

  return (
    <AppLayout
      headerTabsData={headerTabsData}
      successModalMessage={showMessageModal?.message}
      openMessageModal={showMessageModal?.open}
      setOpenMessageModal={handleShowMessageModalClose}
      modalContentType={showMessageModal?.type}
      onDeleteModalYes={() => {}}
      onDeleteModalNo={() => {}}
    >
      {/* <BackDropLoader open={openBackdropLoader} /> */}
      <Stack direction={"column"} gap={5}>
        <Heading28>Device Management</Heading28>
        <CustomTabs tabData={siteTabData} />
        <CustomModal
          content={getModalContext(modalContentType)}
          openModal={openDeviceModal}
          handleClose={() => handleModalClose(modalContentType)}
          customWidth={modalContentType === "delete" ? "22%" : null}
          background={true}
        />
      </Stack>
    </AppLayout>
  );
};

export default DeviceManagement;
