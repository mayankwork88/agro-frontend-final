import React, { createContext, useEffect, useState } from "react";
import { apiRequest } from "../../../apis";
import useUtils from "../../../hooks/Admin/useUtils";
import useCheckStatus from "../../../hooks/useCheckStatus";
import useSnackbarAlert from "../../../hooks/Admin/useSnackbarAlert";
import useCheckBoxModal from "../../../hooks/Admin/useCheckBoxModal";
import { assignUserToSite, unassignUserToSite } from "../../../apis/services";

export const UserManagementContext = createContext();

const addUserInitialState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
}

export const UserManagementContextProvider = ({ children }) => {
  //   GET ALL THE USER STATE
  const [userModalContentType, setUserModalContentType] = useState(null);
  const [users, setUsers] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [paginationPageNo, setPaginationPageNo] = useState(1);
  const [selectedUnassignSiteId, setSelectedUnassignSiteId] = useState(null);
  const [showMessageModalNew, setShowMessageModalNew] = useState({
    open: false,
    message: "",
    type: "",
  });
  //   ADD USER 
  const [newUserDetail, setNewUserDetail] = useState(addUserInitialState);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState({
    open: false,
    message: "",
    type: "",
  });
  const [customError, setCustomError] = useState({
    error: null,
    message: "",
    type: "error",
  });
  const [verifyEmailLoader, setVerifyEmailLoader] = useState(false);
  const [query, setQuery] = useState(null);
  const [emailVerificationText, setEmailVerificationText] = useState("verify");
  const [emailVerificationOTP, setEmailVerificationOTP] = useState("");
  const { handleItemChange, resetItems, selectedItems } = useCheckBoxModal();

  const handleShowMessageModalClose = () =>
    setShowMessageModal({ open: false, message: "", type: "" });
  const handleShowMessageNewModalClose = () =>
    setShowMessageModalNew({ open: false, message: "", type: "" });
  const handleShowMessageModalOpen = (message, type) =>
    setShowMessageModal({ open: true, message, type });
  const handleShowMessageNewModalOpen = (message, type) =>
    setShowMessageModalNew({ open: true, message, type });
  const { openBackdropLoader, setOpenBackdropLoader } = useUtils();
  const { checkRequestStatus } = useCheckStatus();
  const { snackbarAlert, onSnackbarAlertClose, onSnackbarAlertOpen } =
    useSnackbarAlert();

  const getAllUsers = () => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/user/getUsersList?startDate&endDate&page=1&limit=10&select={}&sort={"_id":-1}&search=${query}&filter={"role":"user"}`,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        if (!checkStatus) {
          const users = res?.data?.users?.result;
          setUsers(users);
          setTotalDataCount(res?.data?.totalCount);
        } else {
          setUsers([]);
          setTotalDataCount(0);
          //   alert(checkStatus);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  useEffect(() => {
    getAllUsers();
  }, [paginationPageNo]);

  useEffect(() => {
    const delayDebounceFnc = setTimeout(() => {
      getAllUsers(query);
    }, 1000);
    return () => clearTimeout(delayDebounceFnc);
  }, [query]);

  const handleAddNewUserCancel = () => {
    setNewUserDetail({
      name: "",
      email: "",
      phone: null,
      password: "",
      confirmPassword: "",
    });
    setCustomError({ error: null, message: "" });
  };

  const handleAddNewUserChange = (event) => {
    const { name, value } = event.target;
    setNewUserDetail({ ...newUserDetail, [name]: value });
  };

  const checkUserExits = (username) => {
    const body = {
      username, // email or phone
    };
    const res = apiRequest({
      url: "/api/user/checkUserExists",
      method: "POST",
      data: body,
    })
      .then((res) => {
        const checkStatus = checkRequestStatus(res);
        return checkStatus;
      })
      .catch((err) => err.message);

    return res;
  };

  const handleAddNewUserSubmit = () => {
    setOpenBackdropLoader(true);
    if (true) {
      const body = {
        name: newUserDetail?.name,
        email: newUserDetail?.email,
        phone: Number(newUserDetail?.phone),
        password: newUserDetail?.password,
      };
      apiRequest({
        url: "/api/user/register",
        method: "POST",
        data: body,
      })
        .then((res) => {
          const checkStatus = checkRequestStatus(res);

          if (!checkStatus) {
            handleShowMessageModalOpen("user successfully added");
            handleAddNewUserCancel();
            setOpenAddUserModal(false);
            setCustomError({
              error: null,
              message: "",
              type: "",
            });
          } else {
            setCustomError({ error: true, message: checkStatus });
          }
        })
        .catch((err) => alert(err.message))
        .finally(() => {
          setOpenBackdropLoader(false);
        });
    } else {
      setCustomError({
        error: true,
        message: "Please Verify the Mail First!",
        type: "error",
      });
    }
  };

  const handleSearch = (eve) => {
    setQuery(eve.target.value);
  };

  //HANDLE DELETE USER
  const handleDeleteUser = (userId) => {
    const body = {
      _id: userId,
      status: "deleted", // active,  disabled
    };
    apiRequest({
      url: `/api/user/updateUserStatus`,
      method: "POST",
      data: body,
    })
      .then((res) => {
        if (res?.status === 200) {
          handleShowMessageModalOpen("user successfully deleted");
        } else {
          throw new Error("Error");
        }
      })
      .catch((err) =>
        console.log(err?.message, "-----------GOT-----------ERROR---------")
      )
      .finally(() => {
        setOpenBackdropLoader(false);
      });
  };

  //HANDLE DELETE USER
  const verifyEmail = async () => {
    setVerifyEmailLoader(true);
    const body = {
      email: newUserDetail?.email,
    };
    const isExist = await checkUserExits(newUserDetail?.email);
    if (newUserDetail?.email && !isExist) {
      apiRequest({
        url: `/api/user/sendOTP`,
        method: "POST",
        data: body,
      })
        .then((res) => {
          if (res?.status === 200) {
            setVerifyEmailLoader(false);
            setEmailVerificationText("Sent");
            setCustomError({
              error: true,
              message: "Please enter the OTP sent to your mail",
              type: "info",
            });
          } else if (
            res?.response?.status?.toString()?.toLowerCase()?.includes("4")
          ) {
            setVerifyEmailLoader(false);
            setEmailVerificationText("verify");
            setCustomError({
              error: true,
              message: res?.response?.data?.msg || "Invalid email",
              type: "error",
            });
            throw new Error(res?.response?.data?.msg || "Validation Error");
          }
        })
        .catch((err) =>
          console.log(err?.message, "-----------GOT-----------ERROR---------")
        )
        .finally(() => {
          setOpenBackdropLoader(false);
        });
    } else {
      setVerifyEmailLoader(false);
      const message =
        isExist === "Already exists not available."
          ? "Email Already exits"
          : isExist || "Please enter an email first";
      setCustomError({
        error: true,
        message,
        type: "error",
      });
    }
  };

  const handleEmailVerificationOTPSubmit = () => {
    setOpenBackdropLoader(true);
    const body = {
      email: newUserDetail?.email,
      otp: String(emailVerificationOTP),
    };
    if (body?.email && body?.otp) {
      apiRequest({
        url: `/api/user/verifyOTP`,
        method: "POST",
        data: body,
      })
        .then((res) => {
          if (res?.status === 200) {
            setCustomError({
              error: true,
              message: "Email Verified Successfully",
              type: "success",
            });
            setEmailVerificationText("Verified");
          } else if (
            res?.response?.status?.toString()?.toLowerCase()?.includes("4")
          ) {
            setCustomError({
              error: true,
              message: res?.response?.data?.msg || "Email Verification Failed",
              type: "error",
            });
            throw new Error(res?.response?.data?.msg || "Validation Error");
          }
        })
        .catch((err) =>
          console.log(err?.message, "-----------GOT-----------ERROR---------")
        )
        .finally(() => {
          setOpenBackdropLoader(false);
        });
    } else {
      setOpenBackdropLoader(false);
      setCustomError({
        error: true,
        message: "Please enter the OTP",
        type: "error",
      });
    }
  };

  const handleAssignSiteToUser = async (userId) => {
    const body = {
      siteId: selectedItems,
      userId: userId,
    };
    setOpenBackdropLoader(true);
    const res = await assignUserToSite(body);
    if (res.status === 200) {
      handleShowMessageNewModalOpen("Site successfully Assigned", "message");
      setOpenBackdropLoader(false);
    } else {
      alert(res);
      setOpenBackdropLoader(false);
    }
  };

  const handleUnassignSiteToUser = async (userId) => {
    const body = {
      siteId: selectedUnassignSiteId,
      userId: userId,
    };
    setOpenBackdropLoader(true);
    const res = await unassignUserToSite(body);
    if (res.status === 200) {
      handleShowMessageNewModalOpen("Site successfully Unassigned", "message");
      setOpenBackdropLoader(false);
    } else {
      setOpenBackdropLoader(false);
      alert(res);
    }
  };

  return (
    <UserManagementContext.Provider
      value={{
        users,
        totalDataCount,
        paginationPageNo,
        setPaginationPageNo,
        handleAddNewUserChange,
        handleAddNewUserSubmit,
        newUserDetail,
        openAddUserModal,
        setOpenAddUserModal,
        handleAddNewUserCancel,
        showMessageModal,
        handleShowMessageModalClose,
        openBackdropLoader,
        customError,
        handleSearch,
        setOpenBackdropLoader,
        handleDeleteUser,
        verifyEmail,
        verifyEmailLoader,
        emailVerificationText,
        emailVerificationOTP,
        setEmailVerificationOTP,
        handleEmailVerificationOTPSubmit,
        userModalContentType,
        setUserModalContentType,
        setEmailVerificationText,
        snackbarAlert,
        onSnackbarAlertClose,
        onSnackbarAlertOpen,
        handleItemChange,
        resetItems,
        selectedItems,
        handleAssignSiteToUser,
        showMessageModalNew,
        setShowMessageModalNew,
        handleShowMessageNewModalClose,
        handleUnassignSiteToUser,
        selectedUnassignSiteId,
        setSelectedUnassignSiteId,
        addUserInitialState, setNewUserDetail
      }}
    >
      {children}
    </UserManagementContext.Provider>
  );
};

export default UserManagementContextProvider;
