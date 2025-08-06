import * as React from 'react';
import { AppBar } from 'react-admin';
import { Typography } from '@mui/material';

const MyAppBar = (props) => (
  <AppBar {...props}>
    <Typography
      variant="h6"
      color="inherit"
      sx={{ flex: 1, textAlign: 'left', paddingLeft: 2 }}
      id="react-admin-title"
    >
      ระบบจัดการการเช่า
    </Typography>
  </AppBar>
);

export default MyAppBar;
