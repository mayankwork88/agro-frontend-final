import useFormattedDate from "../../../hooks/useFormattedDate";

export const getGatewayFormattedData = (data) => {
    const {getFormattedDate} = useFormattedDate();
    return data?.map((ele) => ({
      Uid: ele?.uid,
      deviceName: ele?.name,
      macId: ele?.address,
      addedOn: getFormattedDate(ele?.createdAt),
      status: [
        <CustomLabel
          text={getStatus(ele?.status)?.value || "N/A"}
          type={getStatus(ele?.status)?.color || "error"}
        />,
      ],
      devices: ele?.assignedDevices,
      assignBM: [
        <IconButton
          aria-label="add"
          onClick={() => {
            handleModal("assignBranchManagerToGateway");
            getAllUnassignedBM();
            setSelectedDeviceForAssigned(ele?._id);
          }}
        >
          <AddCircleOutlineIcon
            fontSize="medium"
            sx={{ color: theme.palette.primary.main }}
          />
        </IconButton>,
      ],
      viewDetails: [
        <ViewButton
          onClick={() =>
            navigate(`/admin/device-management/gateway/${ele?._id}`)
          }
        >
          View
        </ViewButton>,
      ],
      Delete: [
        <IconButton
          aria-label="delete"
          disabled={ele?.status !== "not_assigned"}
          onClick={() => {
            handleModal("delete");
            setSelectedDeviceForDeletion({ id: ele?._id, type: "Gateway" });
          }}
        >
          <DeleteOutlineOutlinedIcon fontSize="medium" />
        </IconButton>,
      ],
    }));
  };
