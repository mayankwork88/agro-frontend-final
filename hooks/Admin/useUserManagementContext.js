import { useContext } from "react";
import { UserManagementContext } from "../../context/Admin/UserManagement/UserManagementContext";

const useUserManagementContext = () => {
  return useContext(UserManagementContext);
};

export default useUserManagementContext;
