import React, { useEffect, useState } from "react";
import {
  AppLayout,
  BreadCrumps,
  CustomTable,
  CustomLabel,
  TabPane,
  CustomTextField,
  CustomAlert,
  SelectCheckMarkInput,
  BackDropLoader,
} from "../../../../components";
import { Box, Stack, Paper } from "@mui/material";
import { headerTabsData } from "../../Data";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../../../apis";
import {
  ViewButton,
  Heading24,
} from "../../../../components/CustomComponent";
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

const ViewNodeDM = () => {
  const [nodeDetails, setNodeDetails] = useState(null);
  const {
    setOpenBackdropLoader,
    setCustomError,
    customError,
    selectCustomError,
    setSelectCustomError,
    openBackdropLoader,
    snackbarAlert,
    onSnackbarAlertOpen,
    onSnackbarAlertClose,
    getDeviceById,
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
  const navigate = useNavigate();
  const { getStatus } = useUtils();
  const { getFormattedDate } = useFormattedDate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addGateway) });

  const headData = [
    "UID",
    "name",
    "Mac ID",
    "Added on",
    "Nodes",
    "View Details",
  ];

  useEffect(() => {
   async  function getDevice(){
    const res = await getDeviceById(id);
    if (res?._id) setNodeDetails(res);
    else alert("Couldn't find device");
    }
    getDevice()
  }, [id]);

  useEffect(() => {
    setDeviceDetailEdit({
      uid: nodeDetails?.uid,
      name: nodeDetails?.name,
      macId: nodeDetails?.address,
      depth: nodeDetails?.depth
        ? Object.keys(nodeDetails?.depth).filter(
            (key) => nodeDetails?.depth[key]
          )
        : [],
      description: nodeDetails?.description,
    });
    setValue("uid", nodeDetails?.uid || "");
    setValue("name", nodeDetails?.name || "");
    setValue("macId", nodeDetails?.address || "");
  }, [nodeDetails]);

  const validation = { register, errors };

  const handelDeviceDetailEdit = () => {
    setIsEdit(true);
    const body = {
      _id: nodeDetails?._id,
      uid: deviceDetailEdit?.uid,
      address: deviceDetailEdit?.macId,
      name: deviceDetailEdit?.name,
      description: deviceDetailEdit?.description,
      depth: {
        6: deviceDetailEdit?.depth?.some((ele) => Number(ele) === 6),
        12: deviceDetailEdit?.depth?.some((ele) => Number(ele) === 12),
        18: deviceDetailEdit?.depth?.some((ele) => Number(ele) === 18),
      },
      type: "node", // branch_manager, nodes
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
            onSnackbarAlertOpen("success", "Node Successfully Edited");
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
            throw new Error(res?.response?.data?.msg);
          }
        })
        .catch((err) => {
          const message = err.message || "Some error occurred";
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

  const getFormattedData = (data, type) => {
    return [
      {
        Uid: [<ViewButton sx={{ cursor: "default" }}>{data?.uid}</ViewButton>],
        deviceName: data?.name,
        macId: data?.address || data?.alertCount,
        addedOn: getFormattedDate(data?.createdAt),
        deviceNode: data?.assignedDevices || data?.gatewayCount,
        viewDetails: [
          <ViewButton
            onClick={() =>
              navigate(`/admin/device-management/${type}/${data?._id}`)
            }
          >
            View
          </ViewButton>,
        ],
      },
    ];
  };

  return (
    <AppLayout
      headerTabsData={headerTabsData}
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      onAlertClose={onSnackbarAlertClose}
    >
      <BackDropLoader open={openBackdropLoader} />
      <Stack gap={3} sx={{ background: "#fff" }} pX={4}>
        <Box sx={{ display: "flex" }}>
          <BreadCrumps
            root={{
              link: "/admin/device-management",
              label: "device management",
            }}
            data={BreadCrumbsData(nodeDetails)}
          />
          <CustomLabel
            sx={{ width: "250px" }}
            text={`Status : ${
              nodeDetails?.status ? getStatus(nodeDetails?.status).value : "N/A"
            }`}
            type={`${
              nodeDetails?.status ? getStatus(nodeDetails?.status).color : "N/A"
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
                paneText="node details"
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
            {nodeDetails?.assignedSite ? (
              <Stack>
                <Heading24>Assigned Site</Heading24>
                <Box mt={2}>
                  <CustomTable
                    onClick={() => {}}
                    headBackgroundColor="#EAF2E6"
                    tableHeadData={headData.map((ele) => {
                      if (ele === "Nodes") return "Gateways";
                      else if (ele === "Mac ID") return "Alerts";
                      else return ele;
                    })}
                    tableRowData={getFormattedData(
                      nodeDetails?.assignedSite,
                      "site"
                    )}
                  />
                </Box>
              </Stack>
            ) : null}
            {nodeDetails?.assignedGateway ? (
              <Stack>
                <Heading24>Gateway</Heading24>
                <Box mt={2}>
                  <CustomTable
                    onClick={() => {}}
                    headBackgroundColor="#EAF2E6"
                    tableHeadData={headData.map((ele) =>
                      ele === "Nodes" ? "Branch Manager" : ele
                    )}
                    tableRowData={getFormattedData(
                      nodeDetails?.assignedGateway,
                      "gateway"
                    )}
                  />
                </Box>
              </Stack>
            ) : null}
            {nodeDetails?.assignedBranchManager ? (
              <Stack>
                <Heading24>Branch Manager</Heading24>
                <Box mt={2}>
                  <CustomTable
                    onClick={() => {}}
                    headBackgroundColor="#EAF2E6"
                    tableHeadData={headData}
                    tableRowData={getFormattedData(
                      nodeDetails?.assignedBranchManager,
                      "branch-manager"
                    )}
                  />
                </Box>
              </Stack>
            ) : null}
          </Stack>
        </form>
      </Stack>
    </AppLayout>
  );
};

export default ViewNodeDM;
