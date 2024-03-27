import React, { useEffect, useState } from "react";
import { Heading28, ViewButton } from "../../../components/CustomComponent";
import {
  DashboardCard,
  CustomTable,
  AppLayout,
  Skeleton,
  TableSkeleton,
} from "../../../components";
import { SitesDash, DevicesDash } from "../../../Images";
import { Stack } from "@mui/material";
import { headerTabsData } from "../Data";
import useAddSiteContext from "../../../hooks/Admin/useAddSiteContext";
import { useNavigate } from "react-router-dom";
import useUserManagementContext from "../../../hooks/Admin/useUserManagementContext";
import { apiRequest } from "../../../apis";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const { allSites, setOpenBackdropLoader, openBackdropLoader } =
    useAddSiteContext();
  const { users } = useUserManagementContext();
  const navigate = useNavigate();

  const [state, setState] = useState([]);
  const { paths } = state;

  useEffect(() => getDashboardData(), []);

  const dashboardCardData = [
    {
      id: 1,
      title: "users",
      total: "53,000",
      img: SitesDash,
    },
    {
      id: 2,
      title: "sites",
      total: "53,000",
      img: DevicesDash,
    },
  ];

  const dashboardCardData2 = [
    {
      id: 1,
      title: "gateways",
      total: "53,000",
      img: SitesDash,
    },
    {
      id: 2,
      title: "devices",
      total: "53,000",
      img: DevicesDash,
    },
  ];

  const siteHeadData = ["UID", "Name", "Gateways", "Devices", "Action"];
  const userHeadData = ["UID", "Name", "sites", "Action"];

  const getDashboardData = () => {
    setOpenBackdropLoader(true);
    apiRequest({
      url: `/api/site/getDashboardDetails`,
    })
      .then((res) => {
        if (res?.status === 200) {
          const data = res?.data?.data;
          setDashboardData(data);
        } else {
          setDashboardData({});
          throw new Error(res);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  const getFormattedSiteData = (data) => {
    return data?.map((ele) => ({
      Uid: ele?.uid,
      siteName: ele?.name,
      Gateways: ele?.gatewayCount,
      devices: ele?.deviceCount,
      viewDetails: [
        <ViewButton
          onClick={() => navigate(`/admin/site-management/site/${ele?._id}`)}
        >
          View
        </ViewButton>,
      ],
    }));
  };

  const getUserFormattedData = (data) => {
    return data?.map((user) => ({
      Uid: user?.uid,
      userName: user?.name,
      site: user?.sites || "0",
      viewDetails: [
        <ViewButton
          onClick={() =>
            navigate(`/admin/user-management/view-user/${user?._id}`)
          }
        >
          View
        </ViewButton>,
      ],
    }));
  };

  const dashboardFormattedData = (data, format) => {
    if (data) {
      return format?.map((ele) => ({
        ...ele,
        total: data[ele?.title?.toLowerCase()],
      }));
    } else {
      alert("dashboard data is not available");
      return [];
    }
  };
  return (
    <AppLayout headerTabsData={headerTabsData}>
      <Heading28 mb={2}>Dashboard</Heading28>
      <Stack direction={"column"} gap={5}>
        <Stack direction={"row"} gap={5}>
          <Stack direction={"column"} width={"50%"} gap={3}>
            <Stack direction={"row"} gap={4}>
              {dashboardFormattedData(dashboardData, dashboardCardData)?.map(
                (ele) =>
                  openBackdropLoader ? (
                    <Skeleton width={"100%"} height={"100px"} />
                  ) : (
                    <DashboardCard
                      key={ele?.id}
                      title={ele?.title}
                      total={ele?.total}
                      img={ele?.img}
                    />
                  )
              )}
            </Stack>
            {openBackdropLoader ? (
              <TableSkeleton
                rowNumber={new Array(10).fill(0)}
                tableCell={new Array(5).fill("20%")}
              />
            ) : (
              <CustomTable
                paneText="Sites"
                btnText="see all"
                onClick={() => navigate(`/admin/site-management`)}
                headBackgroundColor="#EAF2E6"
                tableHeadData={siteHeadData}
                tableRowData={getFormattedSiteData(allSites)}
              />
            )}
          </Stack>
          <Stack direction={"column"} width={"50%"} gap={3}>
            <Stack direction={"row"} gap={4}>
              {dashboardFormattedData(dashboardData, dashboardCardData2)?.map(
                (ele) =>
                  openBackdropLoader ? (
                    <Skeleton width={"100%"} height={"100px"} />
                  ) : (
                    <DashboardCard
                      key={ele?.id}
                      title={ele?.title}
                      total={ele?.total}
                      img={ele?.img}
                    />
                  )
              )}
            </Stack>
            {openBackdropLoader ? (
              <TableSkeleton
                rowNumber={new Array(10).fill(0)}
                tableCell={new Array(5).fill("20%")}
              />
            ) : (
              <CustomTable
                paneText="Users"
                btnText="see all"
                onClick={() => navigate(`/admin/user-management`)}
                headBackgroundColor="#EAF2E6"
                tableHeadData={userHeadData}
                tableRowData={getUserFormattedData(users)}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </AppLayout>
  );
};

export default AdminDashboard;
