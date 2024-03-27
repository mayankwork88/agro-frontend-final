import React, { createContext, useContext, useReducer, useState } from "react";
import { apiRequest } from "../apis";

const NotificationContext = createContext();

const actions = {
  GET_READ_NOTIFICATION: "GET_READ_NOTIFICATION",
  GET_UNREAD_NOTIFICATION: "GET_UNREAD_NOTIFICATION",
  UNREAD_PAGINATION_CHANGE: "UNREAD_PAGINATION_CHANGE",
  READ_PAGINATION_CHANGE: "READ_PAGINATION_CHANGE",
  SHOW_ERROR: "SHOW_ERROR",
  LOADING: "LOADING",
};

const initialState = {
  allReadNotifications: [],
  readDataLength: 0,
  readPagination: 1,
  allUnreadNotifications: [],
  unReadDataLength: 0,
  unReadPagination: 1,
  error: null,
  loading: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions?.GET_READ_NOTIFICATION:
      return {
        ...state,
        readDataLength: action?.payload?.dataLength,
        allReadNotifications: action?.payload?.alerts,
        error: null,
      };
    case actions?.READ_PAGINATION_CHANGE:
      return {
        ...state,
        readPagination: action?.payload,
      };
    case actions?.GET_UNREAD_NOTIFICATION:
      return {
        ...state,
        unReadDataLength: action?.payload?.dataLength,
        allUnreadNotifications: action?.payload?.alerts,
        error: null,
      };
    case actions?.UNREAD_PAGINATION_CHANGE:
      return {
        ...state,
        unReadPagination: action?.payload,
      };
    case actions?.SHOW_ERROR:
      return {
        ...state,
        error: action?.payload,
      };
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);
  const [notifications, dispatch] = useReducer(reducer, initialState);
  //SNACKBAR ALERT
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });
  //Snackbar alert
  const onSnackbarAlertClose = () => {
    setSnackbarAlert({ open: false, type: "", message: "" });
  };

  //Snackbar show alert
  const showSnackbarAlert = (type, message) => {
    setSnackbarAlert({ open: true, type, message });
  };

  const getErrorMessage = (res) => {
    return (
      res?.response?.data?.msg || res?.message || "Server error, try again later"
    );
  };

  const getAllNotification = async (filter) => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `api/sensor/getAlerts?startDate=&endDate=&page=1&limit=10&select=&sort={"_id":-1}&search=&filter=${JSON.stringify(
        filter
      )}`,
    })
      .then((res) => {
        if (res?.status === 200) {
          const alerts = res?.data?.alerts?.result;
          const dataLength = res?.data?.alerts?.totalCount;
          if (filter?.status === "unread") {
            dispatch({
              type: actions?.GET_UNREAD_NOTIFICATION,
              payload: { alerts, dataLength },
            });
          } else if (filter?.status === "read") {
            dispatch({
              type: actions?.GET_READ_NOTIFICATION,
              payload: { alerts, dataLength },
            });
          } else {
            const msg = getErrorMessage(res);
            dispatch({
              type: actions?.SHOW_ERROR,
              payload: msg,
            });
            throw new Error(msg);
          }
        } else {
          const msg = getErrorMessage(res);
          dispatch({
            type: actions?.SHOW_ERROR,
            payload: msg,
          });
          throw new Error(msg);
        }
      })
      .catch((err) => showSnackbarAlert("error", err?.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  const readNotification = async (alertId) => {
    let body;
    if (alertId === "readAll") {
      body = {
        alertId,
      };
    } else {
      body = {
        alertId: [alertId],
      };
    }
    setOpenBackdropLoader(true);
    const res = apiRequest({
      url: `/api/sensor/readAlerts`,
      method: "POST",
      data: body,
    })
      .then((res) => {
        if (res?.status === 200) {
          if(alertId === "readAll"){
            showSnackbarAlert("success", 'Read All Notification successfully')
          }
          return true;
        } else {
          const error = getErrorMessage(res);
          throw new Error(error);
        }
      })
      .catch((err) => showSnackbarAlert("error", err.message))
      .finally(() => setOpenBackdropLoader(false));
    return res;
  };

  const clearAllNotification = async () => {
    setOpenBackdropLoader(true);
    const body = {
      status: "read",
    };
    apiRequest({
      url: `/api/sensor/clearAlerts`,
      method: "POST",
      data: body,
    })
      .then((res) => {
        if (res?.status === 200) {
          showSnackbarAlert("success", 'Clear All Notification successfully')
          return true;
        } else {
          const error = getErrorMessage(res);
          throw new Error(error);
        }
      })
      .catch((err) => showSnackbarAlert("error", err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  const getNotificationCount = () => {
    const res = apiRequest({
      url: `/api/sensor/getAlerts?startDate=&endDate=&page=1&limit=1&select=&sort={"_id":-1}&search=&filter={ "status": "unread"}`,
    })
      .then((res) => {
        if (res?.status === 200) {
          return {
            status: true,
            count: res?.data?.alerts?.totalCount,
          };
        } else {
          const error = getErrorMessage(res);
          throw new Error(error);
        }
      })
      .catch((err) => showSnackbarAlert("error", err.message));

    return res;
  };
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        getAllNotification,
        dispatch,
        actions,
        clearAllNotification,
        readNotification,
        getNotificationCount,
        onSnackbarAlertClose, 
        snackbarAlert,
        openBackdropLoader
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);

//if !res?.response?.data => network error(res?.message)
// if res?.response?.data => server error -> res?.response?.data?.msg
