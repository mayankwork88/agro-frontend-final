import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserManagementContextProvider } from "./context/Admin/UserManagement/UserManagementContext";
import { DeviceContextProvider } from "./context/Admin/Device/DeviceContext";
import { AddSiteContextProvider } from "./context/Admin/Site/AddSiteContext";
import { ViewSiteContextProvider } from "./context/Admin/Site/ViewSiteContext";
import { NotificationContextProvider } from "./context/NotificationContext";
import { PairDeviceContextProvider } from "./context/Admin/Site/PairDeviceContext";

const labelFontSize = "1.2rem";
const theme = createTheme({
  palette: {
    primary: {
      main: "#347D00",
      light: "#EAF2E6",
    },
  },
  typography: {
    fontFamily: "'Inter'",
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: labelFontSize,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: labelFontSize,
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <NotificationContextProvider>
          <PairDeviceContextProvider>
            <AddSiteContextProvider>
              <ViewSiteContextProvider>
                <DeviceContextProvider>
                  <UserManagementContextProvider>
                    <ThemeProvider theme={theme}>
                      <CssBaseline />
                      <Routes>
                        <Route path="/*" element={<App />} />
                      </Routes>
                    </ThemeProvider>
                  </UserManagementContextProvider>
                </DeviceContextProvider>
              </ViewSiteContextProvider>
            </AddSiteContextProvider>
          </PairDeviceContextProvider>
        </NotificationContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
