import { useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../apis/index";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    roles: [],
    user: {},
  });

  const userLoginInitialState = { email: "", password: "" };
  const [onUserLogin, setOnUserLogin] = useState(userLoginInitialState);
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSnackbarAlertClose = () => {
    setSnackbarAlert({ open: false, type: "", message: "" });
  };

  const showSnackbarAlert = (type, message) => {
    setSnackbarAlert({ open: true, type, message });
  };

  const handleUserLoginChange = (event) => {
    const { name, value } = event.target;
    setOnUserLogin({ ...onUserLogin, [name]: value });
  };

  // const handleUserLoginSubmit = () => {
  //   console.log(onUserLogin, "onUserLogin");
  //   setOnUserLogin({ email: "", password: "" });
  //   navigate(from, { replace: true });
  // };

  const handleUserLoginSubmit = async () => {
    const body = {
      username: onUserLogin?.email,
      password: onUserLogin?.password,
    };
    
    try {
      const res = await apiRequest({
        url: "/api/user/login",
        method: "POST",
        data: body,
      });
      if (res?.status === 200) {
        const {
          token,
          user: { role, uid, _id },
        } = res?.data;
        const loginCredentials = {
          token,
          roles: [role?.toUpperCase()],
          userId: _id,
          userName: uid,
        };
        setAuth({
          roles: [role],
          user: { id: _id, name: uid },
        });
        localStorage.setItem("user", JSON.stringify(loginCredentials));
        setOnUserLogin(userLoginInitialState);
        navigate(from, { replace: true });
        window.location.reload();
      } else if (res?.response?.status === 401) {
        // res.response.data.statusCode - 401 - email not registered
        // res.response.data.statusCode - 401 - incorrect password
        showSnackbarAlert("error", res?.response?.data?.msg);
      } else {
        const message =
          res?.response?.data?.msg || "Something went wrong :(";
        throw new Error(message);
      }
    } catch (err) {
      showSnackbarAlert("error", err?.message);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        handleUserLoginChange,
        handleUserLoginSubmit,
        onUserLogin,
        auth,
        setAuth,
        snackbarAlert,
        onSnackbarAlertClose,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
