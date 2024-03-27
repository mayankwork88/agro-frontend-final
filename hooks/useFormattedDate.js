import moment from "moment/moment";

const useFormattedDate = () => {
  const getFormattedDate = (dataString,type) => {
    const time = moment(dataString).format("LT");
    const date = moment(dataString).format("DD-MM-YYYY");
    return type === "d" ? date : type === "t" ? time : `${time}, ${date}`;
  };

  const getFormattedTime = (dataString) => {
    return moment(dataString).format("LT");
  };

  const apiDateFormate = (dataString, type) => {
    const startDate = moment(dataString).startOf("day").toDate();
    const endDate = moment(dataString).endOf("day").toDate();

    return type === "start" ? startDate : endDate;
  };

  return { getFormattedDate, getFormattedTime, apiDateFormate };
};

export default useFormattedDate;
