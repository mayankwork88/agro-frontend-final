import { useContext } from 'react';
import { AddSiteContext } from '../../context/Admin/Site/AddSiteContext';

const useAddSiteContext = () => {
  return useContext(AddSiteContext)
}

export default useAddSiteContext;
