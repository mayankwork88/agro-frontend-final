import React from "react";
import { CustomModal, SuccessMessage, MessageModalContent } from "./";

const MessageModal = ({
  open,
  setOpen,
  successModalMessage,
  modalContentType,
  onDeleteModalYes, 
  onDeleteModalNo
}) => {
  const getContent = (type) => {
    if (type === "message") {
      return <SuccessMessage message={successModalMessage} />;
    }
    return (
      <MessageModalContent
        onCancel={onDeleteModalNo}
        onConfirm={onDeleteModalYes}
      />
    );
  };
  return (
    <CustomModal
      content={getContent(modalContentType)}
      openModal={open}
      handleClose={setOpen}
      background={true}
      customWidth={modalContentType === "delete" ? "22%" : null}
    />
  );
};

export default MessageModal;
