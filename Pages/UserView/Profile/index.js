import React from "react";
import {
  AppLayout,
  CustomTextField,
  UserProfileCard,
  SwitchButtonCard,
} from "../../../components";
import { Heading28 } from "../../../components/CustomComponent";
import { Stack, Box } from "@mui/material";
import { useTheme } from "@emotion/react";

const UserProfile = () => {
  const theme = useTheme();
  return (
    <AppLayout>
      <Stack direction={"column"} gap={3}>
        <Heading28>User Profile</Heading28>
        <UserProfileCard title="personal details">
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            p="28px 28px 36px 28px"
            gap={10}
          >
            <CustomTextField
              placeholder="UID"
              disabled={false}
              name="uid"
              select={false}
              label="UID"
              value={""}
              onInputChange={() => {}}
              background={"#F2F2F2"}
            />
            <CustomTextField
              placeholder="Name"
              disabled={false}
              name="name"
              select={false}
              label="Name"
              value={""}
              onInputChange={() => {}}
              background={"#F2F2F2"}
            />
          </Stack>
        </UserProfileCard>
        <UserProfileCard title="Password">
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            p="28px 28px 36px 28px"
            gap={5}
          >
            <CustomTextField
              placeholder="Enter your current password"
              disabled={false}
              name="currentPassword"
              select={false}
              label="Current Password"
              value={""}
              onInputChange={() => {}}
               background={"#F2F2F2"}
            />
            <CustomTextField
              placeholder="Enter your new password"
              disabled={false}
              name="newPassword"
              select={false}
              label="New Password"
              value={""}
              onInputChange={() => {}}
               background={"#F2F2F2"}
            />
            <CustomTextField
              placeholder="Please confirm the password"
              disabled={false}
              name="confirmPassword"
              select={false}
              label="Confirm Password"
              value={""}
              onInputChange={() => {}}
               background={"#F2F2F2"}
            />
          </Stack>
        </UserProfileCard>
        <UserProfileCard title="Notifications" toggle={true}>
          <Stack
            direction={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box sx={{display:'flex', width:'100%'}}>
              <SwitchButtonCard title="Get Alerts" sx={{borderBottom:'1px solid #dddddd', borderRight:'1px solid #dddddd'}} />
              <SwitchButtonCard title="New site assigned" sx={{borderBottom:'1px solid #dddddd'}} />
            </Box>
            <Box sx={{display:'flex', width:'100%'}}>
              <SwitchButtonCard title="New branch manager assigned" sx={{borderRight:'1px solid #dddddd'}}/>
              <SwitchButtonCard title="New device assigned" />
            </Box>
          </Stack>
        </UserProfileCard>
      </Stack>
    </AppLayout>
  );
};

export default UserProfile;
