import { Modal, Box } from "@mui/material";

export default function CustomModal({
  openModal,
  handleClose,
  content,
  customWidth,
  background,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: `${!background ? "transparent" : "background.paper"}`,
    boxShadow: 24,
    width: { lg: customWidth ? customWidth : "40%", md: "70%", sm: "90%" },
    p: 0,
    borderRadius: "5px",
    boxShadow: `${!background || "none"}`,
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{content}</Box>
      </Modal>
    </div>
  );
}
