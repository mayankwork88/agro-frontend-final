

const useCheckStatus = () => {
    const checkRequestStatus = (request) => {
        if (request?.status?.toString()?.toLowerCase()?.includes("2")) return null;
        else if (request?.status?.toString()?.toLowerCase()?.includes("3"))
          return null;
        else if (
          request?.response?.status?.toString()?.toLowerCase()?.includes("4")
        )
          return request?.response?.data?.msg || "Validation Error";
        else return "Something went wrong!";
      };
  return{checkRequestStatus}
}

export default useCheckStatus;
