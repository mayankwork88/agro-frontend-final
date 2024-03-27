import { apiRequest } from ".";

const checkRequestStatus = (request) => {
  if (request?.status?.toString()?.toLowerCase()?.includes("2")) return null;
  else if (request?.status?.toString()?.toLowerCase()?.includes("3"))
    return null;
  else if (
    request?.response?.status?.toString()?.toLowerCase()?.includes("4")
  ) {
    const notFound = request?.response?.status === 404;
    return notFound
      ? "Not Found"
      : request?.response?.data?.msg || "Validation Error";
  } else return "Something went wrong!";
};

export const assignUserToSite = async (body) => {
  if (body?.siteId?.length && body?.userId) {
    try {
      const response = await apiRequest({
        url: `/api/site/assignUserToSite`,
        method: "POST",
        data: body,
      });
      const status = checkRequestStatus(response);
      if (!status) {
        return response;
      } else {
        throw new Error(status);
      }
    } catch (e) {
      return e.message;
    }
  } else {
    const message = body?.siteId?.length
      ? "Something went wrong"
      : "Please select a user";
    return message;
  }
};

export const unassignUserToSite = async (body) => {
  if (body?.siteId && body?.userId) {
    try {
      const response = await apiRequest({
        url: `/api/site/unassignUserFromSite`,
        method: "POST",
        data: body,
      });
      const status = checkRequestStatus(response);
      if (!status) {
        return response;
      } else {
        throw new Error(status);
      }
    } catch (e) {
      return e.message;
    }
  } else {
    return "Site Id & User Id is required";
  }
};
