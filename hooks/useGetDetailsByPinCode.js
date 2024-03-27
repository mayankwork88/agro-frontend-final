import { useEffect, useState } from "react";
import axios from "axios";

const useGetDetailsByPinCode = (query, pinCode) => {
  const [PinCodeDetails, setPinCodeDetails] = useState({
    city: "",
    state: "",
    country: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });
  const [inputLoader, setInputLoader] = useState(false);

  useEffect(() => {
    const delayDebounceFnc = query
      ? setTimeout(() => {
          setInputLoader(true);
          axios
            .get(`https://api.postalpincode.in/pincode/${query}`)
            .then((res) => {
              if (res?.data[0]?.PostOffice) {
                const { District, State, Country } =
                  res?.data[0]?.PostOffice[0];
                setPinCodeDetails({
                  ...PinCodeDetails,
                  city: District,
                  state: State,
                  country: Country,
                });
                setErrorMessage({
                  error: false,
                  message: "",
                });
              } else {
                setErrorMessage({
                  error:true,
                  message: "Pin code not found",
                });
              }
            })
            .catch((err) =>
              setErrorMessage({ error: "true", message: err.message })
            )
            .finally(() => setInputLoader(false));
        }, 1000)
      : null;
    return () => clearTimeout(delayDebounceFnc);
  }, [query]);

  return { PinCodeDetails, errorMessage, inputLoader };
};

export default useGetDetailsByPinCode;
