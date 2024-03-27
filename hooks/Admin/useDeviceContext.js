import { useContext } from 'react';
import { DeviceContext } from '../../context/Admin/Device/DeviceContext';

const useDeviceContext = () => {
  return useContext(DeviceContext);
}

export default useDeviceContext;
