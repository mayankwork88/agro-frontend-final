import { useEffect } from "react";
import {
  CustomTable,
  TabPane,
  CustomTextField,
  CustomAlert,
  NoData,
} from "../../../../components";
import { Box, Stack, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { editUserByAdmin } from "../../../../utils/validationSchema";
import { apiRequest } from "../../../../apis";
import useUserManagementContext from "../../../../hooks/Admin/useUserManagementContext";
import { formattedSiteData } from "../../FormattedData";
import { useNavigate } from "react-router-dom";
import {
  Heading24,
} from "../../../../components/CustomComponent";

const Overview = ({ data, sites, setTabValue }) => {
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(false);
  const [userDetailEdit, setUserDetailEdit] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(editUserByAdmin) });

  const {
    setOpenBackdropLoader,
    setCustomError,
    customError,
    onSnackbarAlertOpen,
    setShowMessageModalNew,
    setSelectedUnassignSiteId,
  } = useUserManagementContext();

  const navigate = useNavigate();

  const headData = [
    "UID",
    "site name",
    "branch manager",
    "devices",
    "alerts",
    "View Details",
    "Unassign",
  ];
  
  useEffect(() => {
    setUserDetailEdit({
      name: data?.user?.name,
      email: data?.user?.email,
      phone: data?.user?.phone,
    });
    setValue("name", data?.user?.name || "");
    setValue("email", data?.user?.email || "");
    setValue("phone", data?.user?.phone || "");
  }, [data]);

  const validation = { register, errors };

  const handelUserDetailEdit = () => {
    setIsEdit(true);
    setOpenBackdropLoader(true);
    const body = {
      _id: data?.user?._id,
      ...userDetailEdit,
    };

    if (isEdit) {
      apiRequest({
        url: `/api/user/editUser`,
        method: "POST",
        data: body,
      })
        .then((res) => {
          if (res?.status === 200) {
            setIsEdit(false);
            onSnackbarAlertOpen("success", "User successfully updated");
            setCustomError({ error: null, message: "" });
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
        .catch((err) => console.log(err.message))
        .finally(() => setOpenBackdropLoader(false));
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setUserDetailEdit({ ...userDetailEdit, [name]: value });
  };

  const onViewClick = (siteId) =>
    navigate(`/admin/site-management/site/${siteId}`);

  const onDeleteClick = (siteId) => {
    setSelectedUnassignSiteId(siteId);
    setShowMessageModalNew({ open: true, type: "delete" });
  };

  return (
    <form onSubmit={handleSubmit(handelUserDetailEdit)}>
      <Stack direction="column" gap={4}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 4,
            border: "1px solid #eeeeee",
          }}
        >
          <TabPane
            paneText="user details"
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
              placeholder="User ID"
              disabled={true}
              name="userId"
              select={false}
              label="User ID"
              value={data?.user?.uid}
              onInputChange={handleEditChange}
              background="#fff"
              validation={validation}
            />
            <CustomTextField
              placeholder="User Name"
              disabled={!isEdit}
              name="name"
              select={false}
              label="User Name"
              value={userDetailEdit?.name}
              onInputChange={handleEditChange}
              background="#fff"
              validation={validation}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <CustomTextField
              placeholder="Email"
              disabled={!isEdit}
              name="email"
              select={false}
              label="Email"
              value={userDetailEdit?.email}
              onInputChange={handleEditChange}
              background="#fff"
              validation={validation}
            />
            <CustomTextField
              placeholder="Phone"
              disabled={!isEdit}
              name="phone"
              select={false}
              label="Phone"
              type="number"
              value={userDetailEdit?.phone}
              onInputChange={handleEditChange}
              background="#fff"
              validation={validation}
            />
          </Box>
        </Paper>
        <Stack direction={"column"} gap={2}>
        <Heading24>Assigned Sites</Heading24>
        {sites?.length ? (
          
          <CustomTable
            headBackgroundColor="#EAF2E6"
            tableHeadData={headData}
            tableRowData={formattedSiteData(
              sites,
              theme,
              onViewClick,
              onDeleteClick
            )?.slice(0, 5)}
          />
        ) : (
          <NoData message="Nothing to show" />
        )}
        </Stack>
       
      </Stack>
    </form>
  );
};

export default Overview;
