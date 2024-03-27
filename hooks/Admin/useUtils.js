import { useState } from "react";

const useUtils = () => {
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);

  const getStatus = (str) => {
    const color =
      str === "assigned" ? "info" : str === "pending" ? "warning" : "error";
    const value = str
      .split("_")
      .map((ele) => ele.charAt(0).toUpperCase() + ele.slice(1).toLowerCase())
      .join(" ");
    return { value, color };
  };
  return {
    openBackdropLoader,
    setOpenBackdropLoader,
    getStatus
  };
};

export default useUtils;
