import AuthPage from "./Pages/Auth";
import { Routes, Route, Navigate } from "react-router-dom";
import RouteLayout from "./Layout/RouteLayout";
import RequireAuth from "./components/RequireAuth";
import UserDashboard from "./Pages/UserView/UserDashboard";
import AdminDashboard from "./Pages/AdminView/AdminDashboard";
import UserSiteManagement from "./Pages/UserView/SiteManagement";
import UserProfile from "./Pages/UserView/Profile";
import AddSite from "./Pages/AdminView/SiteManagement/Site/AddSite/AddSite";
import "./App.css";
import AdminSiteManagement from "./Pages/AdminView/SiteManagement";
import UserManagement from "./Pages/AdminView/UserManagement";
import SiteDetail from "./Pages/AdminView/SiteManagement/Site/SiteDetails";
import AddGateway from "./Pages/AdminView/SiteManagement/Gateway/AddGateway";
import ViewSiteGatewayDetail from "./Pages/AdminView/SiteManagement/Gateway/GatewayDetail";
import ViewUser from "./Pages/AdminView/UserManagement/ViewUser";
import DeviceManagement from "./Pages/AdminView/DeviceManagement";
import ViewGatewayDM from "./Pages/AdminView/DeviceManagement/Gateway/ViewGateway";
import ViewBranchManagerDM from "./Pages/AdminView/DeviceManagement/BranchManager/ViewBranchManager";
import ViewNodeDM from "./Pages/AdminView/DeviceManagement/Node/ViewNode";
import ViewSiteBranchManagerDetail from "./Pages/AdminView/SiteManagement/BM/BMDetails";
import ViewSiteNodeDetail from "./Pages/AdminView/SiteManagement/Node/NodeDetails";
import Notifications from "./Pages/Notifications/Notifications";
import PageNotFound from "./components/PageNotFound";

// PUBLIC ROUTES, PROTECTED ROUTE(LOGGED IN USER CAN SEE), ROLE BASED ROUTE, CATCH ALL

function App() {
  const ROLES = {
    USER: "USER",
    ADMIN: "ADMIN",
  };
  return (
    <Routes>
      <Route path="/" element={<RouteLayout />}>
        <Route path="login" element={<AuthPage />} />
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="notifications" element={<Notifications />} />
          <Route index element={<Navigate replace to="admin/dashboard" />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="admin/site-management"
            element={<AdminSiteManagement />}
          />
          <Route path="admin/user-management" element={<UserManagement />} />
          <Route path="admin/add-site" element={<AddSite />} />
          <Route
            path="admin/site-management/site/:id"
            element={<SiteDetail />}
          />
          <Route path="admin/add-gateway" element={<AddGateway />} />
          <Route
            path="admin/site-management/gateway/:id"
            element={<ViewSiteGatewayDetail />}
          />
          <Route
            path="admin/site-management/branch_manager/:id"
            element={<ViewSiteBranchManagerDetail />}
          />
          <Route
            path="admin/site-management/node/:id"
            element={<ViewSiteNodeDetail />}
          />
          <Route
            path="admin/user-management/view-user/:id"
            element={<ViewUser />}
          />
          <Route
            path="admin/device-management"
            element={<DeviceManagement />}
          />
          <Route
            path="admin/device-management/gateway/:id"
            element={<ViewGatewayDM />}
          />
          <Route
            path="/admin/device-management/node/:id"
            element={<ViewNodeDM />}
          />
          <Route
            path="/admin/device-management/branch-manager/:id"
            element={<ViewBranchManagerDM />}
          />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.USER]} />}>
          <Route path="user/dashboard" element={<UserDashboard />} />
          <Route path="user/site-management" element={<UserSiteManagement />} />
          <Route path="user/profile" element={<UserProfile />} />
          {/* <Route path="user/add-site" element={<AddSite />} /> */}
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
