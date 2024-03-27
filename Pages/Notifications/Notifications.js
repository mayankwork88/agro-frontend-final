import AppLayout from "../../Layout";
import { Heading28 } from "../../components/CustomComponent";
import { headerTabsData } from "../AdminView/Data";
import { CustomTabs } from "../../components";
import ReadNotification from "./ReadNotification";
import UnreadNotification from "./UnreadNotification";
import { useNotificationContext } from "../../context/NotificationContext";

const siteTabData = [
  {
    label: "unread",
    child: <UnreadNotification />,
  },
  {
    label: "Read",
    child: <ReadNotification />,
  },
];

const Notifications = () => {
  const { snackbarAlert, onSnackbarAlertClose, openBackdropLoader } =
    useNotificationContext();
  return (
    <AppLayout
      headerTabsData={headerTabsData}
      openBackdropLoader={openBackdropLoader}
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      onAlertClose={onSnackbarAlertClose}
    >
      <Heading28 mb={2}>Manage Notifications</Heading28>
      <CustomTabs tabData={siteTabData} />
    </AppLayout>
  );
};

export default Notifications;
