import { useContext } from "react";
import { ViewSiteContext } from "../../context/Admin/Site/ViewSiteContext";

const useViewSiteContext = () => {
  return useContext(ViewSiteContext);
};

export default useViewSiteContext;
