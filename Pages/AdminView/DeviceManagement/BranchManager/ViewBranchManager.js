import React, { useEffect, useState } from "react";
import {
  AppLayout,
  BreadCrumps,
  CustomTable,
  CustomLabel,
  TabPane,
  CustomTextField,
  CustomAlert,
  CustomModal,
  AssignUserModalContent,
  NoData,
  SelectCheckMarkInput,
  BackDropLoader,
  CustomPagination,
} from "../../../../components";
import { Box, Stack, Paper, IconButton } from "@mui/material";
import { headerTabsData } from "../../Data";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../../../apis";
import { ViewButton, Heading24 } from "../../../../components/CustomComponent";
import { CancelPresentationIcon } from "../../../../icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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

const ViewBranchManagerDM = () => {
  const [branchManagerDetails, setBranchManagerDetails] = useState(null);

  const {
    setOpenBackdropLoader,
    setCustomError,
    customError,
    selectCustomError,
    setSelectCustomError,
    getAllUnassignNodes,
    setModalContentType,
    setOpenDeviceModal,
    openDeviceModal,
    handleNodeAssignToBM,
    selectedDeviceForAssigned,
    allUnassignNode,
    allUnassignedBM,
    getAllUnassignedBM,
    setSelectedDeviceForAssigned,
    openBackdropLoader,
    snackbarAlert,
    onSnackbarAlertClose,
    onSnackbarAlertOpen,
    getAllAssignedNodesOfABM,
    allAssignedNodesOfABM,
    getDeviceById,
    allAssignedNodesOfABMDataLength,
    allAssignedNodesOfABMPagination,
    setAllAssignedNodesOfABMPagination,
    handleItemChange,
    resetItems,
    selectedItems,
    showMessageModal,
    handleShowMessageModalClose,
    handleShowMessageModalOpen,
  } = useDeviceContext();

  const [isEdit, setIsEdit] = useState(false);
  const [deviceDetailEdit, setDeviceDetailEdit] = useState({
    uid: "",
    name: "",
    macId: "",
    depth: [],
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
      if (res?._id) setBranchManagerDetails(res);
      else alert("Couldn't find device");
    }
    getDevice();
  }, [id]);

  useEffect(() => {
    getAllAssignedNodesOfABM(id);
  }, [id, allAssignedNodesOfABMPagination]);

  useEffect(() => {
    setDeviceDetailEdit({
      uid: branchManagerDetails?.uid,
      name: branchManagerDetails?.name,
      macId: branchManagerDetails?.address,
      depth: branchManagerDetails?.depth
        ? Object.keys(branchManagerDetails?.depth).filter(
            (key) => branchManagerDetails?.depth[key]
          )
        : [],
      description: branchManagerDetails?.description,
    });
    setValue("uid", branchManagerDetails?.uid || "");
    setValue("name", branchManagerDetails?.name || "");
    setValue("macId", branchManagerDetails?.address || "");
  }, [branchManagerDetails]);

  const headData = [
    "UID",
    "name",
    "Mac ID",
    "Added on",
    "View Details",
    "Delete",
  ];

  const validation = { register, errors };

  const handelDeviceDetailEdit = () => {
    setIsEdit(true);
    const body = {
      _id: branchManagerDetails?._id,
      uid: deviceDetailEdit?.uid,
      address: deviceDetailEdit?.macId,
      name: deviceDetailEdit?.name,
      description: deviceDetailEdit?.description,
      depth: {
        6: deviceDetailEdit?.depth?.some((ele) => Number(ele) === 6),
        12: deviceDetailEdit?.depth?.some((ele) => Number(ele) === 12),
        18: deviceDetailEdit?.depth?.some((ele) => Number(ele) === 18),
      },
      type: "branch_manager", // branch_manager, nodes
    };
    if (isEdit && deviceDetailEdit?.depth?.length) {
      setOpenBackdropLoader(true);
      apiRequest({
        url: `/api/device/editDevice`,
        method: "POST",
        data: body,
      })
        .then((res) => {
          if (res?.status === 200) {
            setIsEdit(false);
            onSnackbarAlertOpen(
              "success",
              "Branch Manager Successfully Edited"
            );
            setCustomError({ error: null, message: "" });
            setSelectCustomError({
              error: null,
              message: "",
            });
          } else if (
            res?.response?.status?.toString()?.toLowerCase()?.includes("4")
          ) {
            setCustomError({
              error: true,
              message: res?.response?.data?.msg || "Validation Error",
            });
          } else {
            alert("error");
            throw new Error("error");
          }
        })
        .catch((err) => {
          const message = err.message || "Some error occurred";
          console.log(message);
          onSnackbarAlertOpen("error", message);
        })
        .finally(() => setOpenBackdropLoader(false));
    } else if (isEdit && deviceDetailEdit?.depth?.length === 0) {
      setSelectCustomError({
        error: true,
        message: "Please select at least 1 depth level",
      });
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
      viewDetails: data?.gatewayCount || [
        <ViewButton
          onClick={() =>
            navigate(`/admin/device-management/${deviceType}/${data?._id}`)
          }
        >
          View
        </ViewButton>,
      ],
      delete: data?.gatewayCount
        ? [<ViewButton onClick={() => {}}>View</ViewButton>]
        : [
            <IconButton
              aria-label="delete"
              onClick={() => handleShowMessageModalOpen("", "delete")}
            >
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

  const showAllUnassignedNodes = (bmId) => {
    setOpenDeviceModal(true);
    getAllUnassignNodes();
    setSelectedDeviceForAssigned(bmId);
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
      <Stack gap={3} sx={{ background: "#fff" }} px={4}>
        <Box sx={{ display: "flex" }}>
          <BreadCrumps
            root={{
              link: "/admin/device-management",
              label: "device management",
            }}
            data={BreadCrumbsData(branchManagerDetails)}
          />
          <CustomLabel
            sx={{ width: "250px" }}
            text={`Status : ${
              branchManagerDetails?.status
                ? getStatus(branchManagerDetails?.status).value
                : "N/A"
            }`}
            type={`${
              branchManagerDetails?.status
                ? getStatus(branchManagerDetails?.status).color
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
                paneText="branch manager details"
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
                  disabled={!isEdit}
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
              <Box sx={{ display: "flex", gap: 4 }}>
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
                <SelectCheckMarkInput
                  label="depth"
                  name="depth"
                  disabled={!isEdit}
                  background="#fff"
                  checkboxValue={deviceDetailEdit?.depth}
                  setNewCheckboxValue={handleEditChange}
                  validation={selectCustomError}
                />
              </Box>
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
                validation={validation}
              />
            </Paper>
            {branchManagerDetails?.assignedSite ? (
              <Stack>
                <Heading24>Assigned Site</Heading24>
                <Box mt={2}>
                  <CustomTable
                    onClick={() => {}}
                    headBackgroundColor="#EAF2E6"
                    tableHeadData={headData.map((ele) => {
                      if (ele === "View Details") return "Gateways";
                      else if (ele === "Mac ID") return "Alerts";
                      else if (ele === "Delete") return "View Details";
                      else return ele;
                    })}
                    tableRowData={getFormattedData(
                      branchManagerDetails?.assignedSite,
                      "site"
                    )}
                  />
                </Box>
              </Stack>
            ) : null}
            <Stack>
              <Heading24>Assigned Nodes</Heading24>
              {allAssignedNodesOfABM.length ? (
                <>
                  <TabPane
                    paneText={`Showing ${
                      allAssignedNodesOfABMDataLength > 10
                        ? 10
                        : allAssignedNodesOfABMDataLength
                    } out of ${allAssignedNodesOfABMDataLength}`}
                    paneTextColor="#000"
                    btnText="Assign node"
                    variant="contained"
                    icon="add"
                    showIcon={true}
                    onBtnClick={() =>
                      showAllUnassignedNodes(branchManagerDetails?._id)
                    }
                    searchLabel="Search by Name/UID"
                    onSearch={() => {}}
                    select={false}
                  />
                  <Stack direction={"column"} gap={3}>
                    <Box mt={2}>
                      <CustomTable
                        onClick={() => {}}
                        headBackgroundColor="#EAF2E6"
                        tableHeadData={headData?.map((ele) =>
                          ele.toLowerCase() === "delete" ? "unassign" : ele
                        )}
                        tableRowData={getFormattedData(
                          allAssignedNodesOfABM,
                          "array",
                          "node"
                        )}
                      />
                    </Box>
                    {allAssignedNodesOfABMDataLength > 10 ? (
                      <Box sx={{ alignSelf: "flex-end" }}>
                        <CustomPagination
                          size="large"
                          page={allAssignedNodesOfABMPagination}
                          count={Math.ceil(
                            allAssignedNodesOfABMDataLength / 10
                          )}
                          onPageChange={(pageNo) =>
                            setAllAssignedNodesOfABMPagination(pageNo)
                          }
                        />
                      </Box>
                    ) : null}
                  </Stack>
                </>
              ) : (
                <NoData
                  icon="add"
                  variant="contained"
                  message="No Device assigned yet"
                  btnText="Assign Device Now"
                  onBtnClick={() => showAllUnassignedNodes(branchManagerDetails?._id)}
                />
              )}
            </Stack>
          </Stack>
        </form>
        <CustomModal
          content={
            <AssignUserModalContent
              title="Assign Node"
              checkbox={true}
              data={allUnassignNode}
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
                handleNodeAssignToBM(selectedDeviceForAssigned, selectedItems)
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

export default ViewBranchManagerDM;
