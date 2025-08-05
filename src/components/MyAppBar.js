import * as React from 'react';
import { AppBar, Logout, UserMenu, useGetIdentity } from 'react-admin';
import { MenuItem, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';

const MyUserMenu = (props) => {
  const { data: identity } = useGetIdentity();

  return (
    <UserMenu {...props}>
      {identity && (
        <MenuItem disabled>
          <AccountCircleIcon style={{ marginRight: 8 }} />
          {identity.fullName}
        </MenuItem>
      )}
      <MenuItem onClick={() => window.location.href = '/change-password'}>
        <LockResetIcon style={{ marginRight: 8 }} />
        เปลี่ยนรหัสผ่าน
      </MenuItem>
      <Logout />
    </UserMenu>
  );
};

const MyAppBar = (props) => (
  <AppBar {...props} userMenu={<MyUserMenu />}>
    <Typography
      variant="h6"
      color="inherit"
      sx={{ flex: 1, textAlign: 'left', paddingLeft: 2 }}
      id="react-admin-title"
    />
  </AppBar>
);

export default MyAppBar;
