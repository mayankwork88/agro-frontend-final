import { Stack, Box, Button } from "@mui/material";
import { CustomTextField, CustomAlert } from "../../../../../components";
import useViewSiteContext from "../../../../../hooks/Admin/useViewSiteContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { addSiteDetailsSchema } from "../../../../../utils/validationSchema";
import { apiRequest } from "../../../../../apis";
import useGetDetailsByPinCode from "../../../../../hooks/useGetDetailsByPinCode";

const SiteDetails = () => {
  const { deviceDetails, onSnackbarAlertOpen} = useViewSiteContext();
  const [isEdit, setIsEdit] = useState(false);
  const [deviceDetailEdit, setDeviceDetailEdit] = useState({
    uid: "",
    name: "",
    address: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
  });

  const { PinCodeDetails, errorMessage, inputLoader } = useGetDetailsByPinCode(
    deviceDetailEdit?.pinCode
  );

  useEffect(() => {
    setDeviceDetailEdit({
      ...deviceDetailEdit,
      city: PinCodeDetails?.city,
      state: PinCodeDetails?.state,
      country: PinCodeDetails?.country,
    });
  }, [PinCodeDetails]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addSiteDetailsSchema) });

  const validation = { register, errors };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setDeviceDetailEdit({ ...deviceDetailEdit, [name]: value });
  };

  useEffect(() => {
    setDeviceDetailEdit({
      uid: deviceDetails?.uid,
      name: deviceDetails?.name,
      address: deviceDetails?.address?.line1,
      pinCode: deviceDetails?.address?.pincode,
      city: deviceDetails?.address?.city,
      state: deviceDetails?.address?.state,
      country: deviceDetails?.address?.country,
    });

    setValue("uid", deviceDetails?.uid || "");
    setValue("name", deviceDetails?.name || "");
    setValue("address", deviceDetails?.address?.line1 || "");
    setValue("pinCode", deviceDetails?.address?.pincode || "");
  }, [deviceDetails]);

  const handelDeviceDetailEdit = () => {
    setIsEdit(true);

    const body = {
      _id: deviceDetails?._id,
      uid: deviceDetailEdit?.uid,
      name: deviceDetailEdit?.name,
      line1: deviceDetailEdit?.address,
      pincode: deviceDetailEdit?.pinCode,
      city: deviceDetailEdit?.city,
      state: deviceDetailEdit?.state,
      country: deviceDetailEdit?.country,
    };
    if (isEdit) {
      // setOpenBackdropLoader(true);
      apiRequest({
        url: `/api/site/editSite`,
        method: "POST",
        data: body,
      })
        .then((res) => {
          if (res?.status === 200) {
            setIsEdit(false);
            onSnackbarAlertOpen("success", "Site Successfully Edited");
            // setCustomError({ error: null, message: "" });
          } else if (
            res?.response?.status?.toString()?.toLowerCase()?.includes("4")
          ) {
            alert(res?.response?.data?.msg);
            // setCustomError({
            //   error: true,
            //   message: res?.response?.data?.msg || "Validation Error",
            // });
          } else {
            throw new Error("error");
          }
        })
        .catch((err) => {
          const message = err.message || "Some error occurred";
          console.log(message);
          // onSnackbarAlertOpen("error", message);
        });
      // .finally(() => setOpenBackdropLoader(false));
    }
  };
  return (
    <form
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 20,
      }}
      onSubmit={handleSubmit(handelDeviceDetailEdit)}
    >
      {/* {customError?.error ? (
        <CustomAlert type="error" message={customError?.message} />
      ) : null} */}
      <Stack
        width={"100%"}
        gap={2}
        sx={{ background: "#F5F5F5", p: 3, borderRadius: "12px" }}
      >
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
          <Box sx={{ width: "50%" }}>
            <CustomTextField
              placeholder="Address"
              disabled={!isEdit}
              name="address"
              select={false}
              label="Address"
              type="textArea"
              row={5.4}
              value={deviceDetailEdit?.address}
              onInputChange={handleEditChange}
              background="#fff"
              validation={validation}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "50%",
            }}
          >
            <CustomTextField
              placeholder="Pin code"
              disabled={!isEdit}
              name="pinCode"
              select={false}
              label="Pin code"
              inputLoading={inputLoader}
              value={deviceDetailEdit?.pinCode}
              onInputChange={handleEditChange}
              background="#fff"
              validation={validation}
            />
            <CustomTextField
              placeholder="City"
              disabled={true}
              name="city"
              select={false}
              label="City"
              value={deviceDetailEdit?.city}
              onInputChange={handleEditChange}
              background="#fff"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <CustomTextField
            placeholder="State"
            disabled={true}
            name="state"
            select={false}
            label="State"
            value={deviceDetailEdit?.state}
            onInputChange={handleEditChange}
            background="#fff"
          />{" "}
          <CustomTextField
            placeholder="Country"
            disabled={true}
            name="country"
            select={false}
            label="Country"
            value={deviceDetailEdit?.country}
            onInputChange={handleEditChange}
            background="#fff"
          />
        </Box>
      </Stack>
      <Button type="submit" variant="contained" sx={{ minWidth: "150px" }}>
        {!isEdit ? "Edit" : "Save"}
      </Button>
    </form>
  );
};

export default SiteDetails;
