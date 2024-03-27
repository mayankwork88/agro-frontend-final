import React, { useEffect, useState } from "react";
import {
  AppLayout,
  BreadCrumps,
  CustomTable,
  CustomLabel,
  TabPane,
  CustomTextField,
  CustomAlert,
  NoData,
  BackDropLoader,
  CustomModal,
  AssignUserModalContent,
} from "../../../../components";
import { Box, Stack, Paper, IconButton } from "@mui/material";
import { headerTabsData } from "../../Data";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../../../apis";
import { ViewButton, Heading24 } from "../../../../components/CustomComponent";
import { CancelPresentationIcon } from "../../../../icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@emotion/react";
import { addGateway } from "../../../../utils/validationSchema";
import useDeviceContext from "../../../../hooks/Admin/useDeviceContext";
import useUtils from "../../../../hooks/Admin/useUtils";
import useFormattedDate from "../../../../hooks/useFormattedDate";
const BreadCrumbsData = (data) => [
  {
    label: `${data?.uid}`,
    link: `admin/device-management/node/${data?._id}`,
  },
];

const ViewGatewayDM = () => {
  const [gatewayDetails, setGatewayDetails] = useState(null);
  const [selectedBM, setSelectedBM] = useState([]);
  const {
    setOpenBackdropLoader,
    setCustomError,
    customError,
    selectCustomError,
    setSelectCustomError,
    openDeviceModal,
    setOpenDeviceModal,
    handleNodeAssignToBM,
    selectedDeviceForAssigned,
    allUnassignNode,
    allUnassignedBM,
    getAllUnassignedBM,
    setSelectedDeviceForAssigned,
    openBackdropLoader,
    onSnackbarAlertOpen,
    snackbarAlert,
    onSnackbarAlertClose,
    getDeviceById,
    selectedItems,
    handleItemChange,
    resetItems,
    handleBMAssignToGateway,
    showMessageModal,
    handleShowMessageModalClose
  } = useDeviceContext();
  const [isEdit, setIsEdit] = useState(false);
  const [allAssignedBMOfAGateway, setAllAssignedBMOfAGateway] = useState([]);
  const [
    allAssignedBMOfAGatewayDataLength,
    setAllAssignedBMOfAGatewayDataLength,
  ] = useState(0);
  const [deviceDetailEdit, setDeviceDetailEdit] = useState({
    uid: "",
    name: "",
    macId: "",
    description: "",
  });

  const { id } = useParams();
  const { getStatus } = useUtils();
  const navigate = useNavigate();
  const { getFormattedDate } = useFormattedDate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addGateway) });

  useEffect(() => {
    async function getDevice() {
      const res = await getDeviceById(id);
      if (res?._id) setGatewayDetails(res);
      else alert("Couldn't find device");
    }
    getDevice();
    getAllAssignedBMOfAGateway(id);
  }, [id]);

  const getAllAssignedBMOfAGateway = (gatewayId) => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/device/getBranchManagerByGatewayId/${gatewayId}?startDate=&endDate=&page=1&limit=10&select=&sort={"_id":-1}&search=`,
    })
      .then((res) => {
        if (res?.status === 200) {
          const device = res?.data?.devices?.result;
          const dataLength = res?.data?.devices?.totalCount;
          setAllAssignedBMOfAGateway(device);
          setAllAssignedBMOfAGatewayDataLength(dataLength);
        } else {
          setAllAssignedBMOfAGateway([]);
          setAllAssignedBMOfAGatewayDataLength(0);
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  useEffect(() => {
    setDeviceDetailEdit({
      uid: gatewayDetails?.uid,
      name: gatewayDetails?.name,
      macId: gatewayDetails?.address,
      description: gatewayDetails?.description,
    });
    setValue("uid", gatewayDetails?.uid || "");
    setValue("name", gatewayDetails?.name || "");
    setValue("macId", gatewayDetails?.address || "");
  }, [gatewayDetails]);

  const headData = [
    "UID",
    "name",
    "Mac ID",
    "Added on",
    "Nodes",
    "View Details",
    "Unassign",
  ];

  const validation = { register, errors };

  const handelDeviceDetailEdit = () => {
    setIsEdit(true);

    const body = {
      _id: gatewayDetails?._id,
      uid: deviceDetailEdit?.uid,
      address: deviceDetailEdit?.macId,
      name: deviceDetailEdit?.name,
      description: deviceDetailEdit?.description,
      type: "gateway", // branch_manager, nodes
    };
    if (isEdit) {
      setOpenBackdropLoader(true);
      apiRequest({
        url: `/api/device/editDevice`,
        method: "POST",
        data: body,
      })
        .then((res) => {
          if (res?.status === 200) {
            setIsEdit(false);
            onSnackbarAlertOpen("success", "Gateway Successfully Edited");
            setCustomError({ error: null, message: "" });
          } else if (
            res?.response?.status?.toString()?.toLowerCase()?.includes("4")
          ) {
            setCustomError({
              error: true,
              message: res?.response?.data?.msg || "Validation Error",
            });
          } else {
            throw new Error("error");
          }
        })
        .catch((err) => {
          const message = err.message || "Some error occurred";
          console.log(message);
          onSnackbarAlertOpen("error", message);
        })
        .finally(() => setOpenBackdropLoader(false));
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setDeviceDetailEdit({ ...deviceDetailEdit, [name]: value });
  };

  const getFormattedData = (data, type, deviceType) => {
    const table = (data) => ({
      Uid: [<ViewButton sx={{ cursor: "default" }}>{data?.uid}</ViewButton>],
      deviceName: data?.name,
      macId: data?.address || data?.alertCount,
      addedOn: getFormattedDate(data?.createdAt),
      devices: data?.assignedDevices || data?.gatewayCount,
      viewDetails: [
        <ViewButton
          onClick={() =>
            navigate(`/admin/device-management/${deviceType}/${data?._id}`)
          }
        >
          View
        </ViewButton>,
      ],
      delete: [
        <IconButton aria-label="delete" onClick={() => {}}>
          <CancelPresentationIcon fontSize="medium" />
        </IconButton>,
      ],
    });

    if (type === "array") {
      return data?.map((ele) => table(ele));
    } else {
      return [table(data)];
    }
  };
  const showAllUnassignedNodes = (gatewayId) => {
    setOpenDeviceModal(true);
    getAllUnassignedBM();
    setSelectedDeviceForAssigned(gatewayId);
  };
  return (
    <AppLayout
      headerTabsData={headerTabsData}
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      onAlertClose={onSnackbarAlertClose}
      successModalMessage={showMessageModal?.message}
      openMessageModal={showMessageModal?.open}
      setOpenMessageModal={handleShowMessageModalClose}
      modalContentType={showMessageModal?.type}
      onDeleteModalYes={() => {}}
      onDeleteModalNo={handleShowMessageModalClose}
    >
      <BackDropLoader open={openBackdropLoader} />
      <Stack gap={3} sx={{ background: "#fff" }} pX={4}>
        <Box sx={{ display: "flex" }}>
          <BreadCrumps
            root={{
              link: "/admin/device-management",
              label: "device management",
            }}
            data={BreadCrumbsData(gatewayDetails)}
          />
          <CustomLabel
            sx={{ width: "250px" }}
            text={`Status : ${
              gatewayDetails?.status
                ? getStatus(gatewayDetails?.status).value
                : "N/A"
            }`}
            type={`${
              gatewayDetails?.status
                ? getStatus(gatewayDetails?.status).color
                : "N/A"
            }`}
            size="md"
          />
        </Box>
        <form onSubmit={handleSubmit(handelDeviceDetailEdit)}>
          <Stack direction="column" gap={4}>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 4,
                background: "#F5F5F5",
                borderRadius: "12px",
              }}
            >
              <TabPane
                paneText="gateway details"
                paneTextColor="#000"
                variant="contained"
                btnText={isEdit ? "Save" : "Edit"}
                type="submit"
                onBtnClick={() => {}}
              />
              {customError?.error ? (
                <CustomAlert type="error" message={customError?.message} />
              ) : null}
              <Box sx={{ display: "flex", gap: 4 }}>
                <CustomTextField
                  placeholder="UID"
                  disabled={true}
                  name="uid"
                  select={false}
                  label="UID"
                  value={deviceDetailEdit?.uid}
                  onInputChange={handleEditChange}
                  background="#fff"
                  validation={validation}
                />
                <CustomTextField
                  placeholder="Name"
                  disabled={!isEdit}
                  name="name"
                  select={false}
                  label="Name"
                  value={deviceDetailEdit?.name}
                  onInputChange={handleEditChange}
                  background="#fff"
                  validation={validation}
                />
              </Box>
              <CustomTextField
                placeholder="Mac ID"
                disabled={!isEdit}
                name="macId"
                select={false}
                label="Mac ID"
                value={deviceDetailEdit?.macId}
                onInputChange={handleEditChange}
                background="#fff"
                validation={validation}
              />
              <CustomTextField
                placeholder="Description"
                disabled={!isEdit}
                name="description"
                select={false}
                label="Description"
                type="textArea"
                value={deviceDetailEdit?.description}
                onInputChange={handleEditChange}
                background="#fff"
              />
            </Paper>
            {gatewayDetails?.assignedSite ? (
              <Stack>
                <Heading24>Assigned Site</Heading24>
                <Box mt={2}>
                  <CustomTable
                    onClick={() => {}}
                    headBackgroundColor="#EAF2E6"
                    tableHeadData={headData
                      ?.filter((ele) => ele.toLowerCase() !== "unassign")
                      ?.map((ele) => {
                        if (ele === "Nodes") return "Gateways";
                        else if (ele === "Mac ID") return "Alerts";
                        else return ele;
                      })}
                    tableRowData={getFormattedData(
                      gatewayDetails?.assignedSite,
                      undefined,
                      "site"
                    )?.map((ele) => {
                      delete ele.delete;
                      return ele;
                    })}
                  />
                </Box>
              </Stack>
            ) : null}
            <Stack>
              <Heading24>Assigned Branch Manager</Heading24>
              {allAssignedBMOfAGateway?.length ? (
                <>
                  <TabPane
                    paneText={`Showing ${
                      allAssignedBMOfAGatewayDataLength > 10
                        ? 10
                        : allAssignedBMOfAGatewayDataLength
                    } out of ${allAssignedBMOfAGatewayDataLength}`}
                    paneTextColor="#000"
                    btnText="Assign Device"
                    variant="contained"
                    icon="add"
                    showIcon={true}
                    onBtnClick={() =>
                      showAllUnassignedNodes(gatewayDetails?._id)
                    }
                    searchLabel="Search by Name/UID"
                    onSearch={() => {}}
                    select={false}
                  />
                  <Box mt={2}>
                    <CustomTable
                      onClick={() => {}}
                      headBackgroundColor="#EAF2E6"
                      tableHeadData={headData}
                      tableRowData={getFormattedData(
                        allAssignedBMOfAGateway,
                        "array",
                        "branch-manager"
                      )}
                    />
                  </Box>
                </>
              ) : (
                <NoData
                  icon="add"
                  variant="contained"
                  message="No Branch Manager assigned yet"
                  btnText="Assign Branch Manager Now"
                  onBtnClick={() => showAllUnassignedNodes(gatewayDetails?._id)}
                />
              )}
            </Stack>
          </Stack>
        </form>
        <CustomModal
          content={
            <AssignUserModalContent
              checkbox={true}
              title="Assign branch manager"
              data={allUnassignedBM}
              selectedValues={selectedItems}
              customError={customError}
              onChange={handleItemChange}
              handleCancel={() => {
                setOpenDeviceModal(false);
                resetItems();
                setCustomError({
                  error: null,
                  message: "",
                });
              }}
              handleSubmit={() =>
                handleBMAssignToGateway(
                  selectedDeviceForAssigned,
                  selectedItems
                )
              }
            />
          }
          openModal={openDeviceModal}
          handleClose={() => setOpenDeviceModal(false)}
          background={true}
        />
      </Stack>
    </AppLayout>
  );
};

export default ViewGatewayDM;
