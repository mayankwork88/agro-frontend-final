import { useState } from "react";

const useCheckBoxModal = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemChange = (ele) => {
    if (selectedItems?.includes(ele.target.value)) {
      const res = selectedItems?.filter((el) => el !== ele.target.value);
      setSelectedItems(res);
    } else {
      setSelectedItems([...selectedItems, ele.target.value]);
    }
  };

  const resetItems = () => {
    setSelectedItems([]);
  };
  return {handleItemChange, resetItems, selectedItems}
};

export default useCheckBoxModal;
