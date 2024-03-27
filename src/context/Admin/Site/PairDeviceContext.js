import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { apiRequest } from "../../../apis";

const PairDeviceContext = createContext();

const actions = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  UPDATE_STATUS: "UPDATE_STATUS",
};

const initialState = {
  loading: false,
  error: null,
  status: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.LOADING:
      return { ...state, loading: action.payload };
    case actions.ERROR:
      return { ...state, error: action.payload };
    case actions.UPDATE_STATUS:
      return { ...state, error: null, status: action.payload };
  }
};

const getErrorMessage = (res) => {
  return (
    res?.response?.data?.msg || res?.message || "Server error, try again later"
  );
};

export const PairDeviceContextProvider = ({ children }) => {
  const [pairDevice, dispatch] = useReducer(reducer, initialState);
  const [selectedSite, setSelectedSite] = useState(null);
  const [checkStatus, setCheckStatus] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      getPairingStatus();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePairDevice = () => {
    const body = {
      siteId: selectedSite,
    };
    dispatch({ type: actions.LOADING, payload: true });
    apiRequest({
      url: `/api/site/pairDevices`,
      method: "POST",
      data: body,
    })
      .then((res) => {
        if (res?.status === 200) {
          dispatch({ type: actions.UPDATE_STATUS, payload: "pairing" });
          setCheckStatus(true);
        } else {
          const error = getErrorMessage(res);
          setCheckStatus(false);
          throw new Error(error);
        }
      })
      .catch((err) => dispatch({ type: actions.ERROR, payload: err?.message }));
  };

  const getPairingStatus = () => {
    apiRequest({
      url: `/api/site/getPairingStatusById/${selectedSite}`,
    })
      .then((res) => {
        if (res?.status === 200) {
          dispatch({ type: actions.ERROR, payload: null });
        } else {
          const error = getErrorMessage(res);
          throw new Error(error);
        }
      })
      .catch((err) => dispatch({ type: actions.ERROR, payload: err?.message }));
  };
  return (
    <PairDeviceContext.Provider
      value={{
        handlePairDevice,
        getPairingStatus,
        pairDevice,
        setSelectedSite,
      }}
    >
      {children}
    </PairDeviceContext.Provider>
  );
};

export const usePairDeviceContext = () => useContext(PairDeviceContext);
