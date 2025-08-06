import * as React from 'react';
import { AppBar, Logout, UserMenu, useGetIdentity } from 'react-admin';
import { MenuItem, Typography, Avatar, Box, Chip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VisibilityIcon from '@mui/icons-material/Visibility';

const MyUserMenu = (props) => {
  const { data: identity } = useGetIdentity();

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <AdminPanelSettingsIcon style={{ marginRight: 8 }} />;
      case 'viewer':
        return <VisibilityIcon style={{ marginRight: 8 }} />;
      default:
        return <AccountCircleIcon style={{ marginRight: 8 }} />;
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'ผู้ดูแลระบบ';
      case 'viewer':
        return 'ผู้ดูข้อมูล';
      default:
        return 'ผู้ใช้';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'primary';
      case 'viewer':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <UserMenu {...props}>
      {identity && (
        <>
          {/* User Info Section */}
          <MenuItem disabled sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar 
                src={identity.avatar} 
                sx={{ width: 32, height: 32, mr: 1 }}
              >
                {identity.fullName?.charAt(0) || 'U'}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  {identity.fullName || 'ผู้ใช้'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {identity.email}
                </Typography>
              </Box>
            </Box>
            <Chip
              icon={getRoleIcon(identity.role)}
              label={getRoleLabel(identity.role)}
              size="small"
              color={getRoleColor(identity.role)}
              variant="outlined"
            />
          </MenuItem>
          
          {/* Divider */}
          <MenuItem disabled sx={{ borderTop: 1, borderColor: 'divider', mt: 1, pt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              การตั้งค่าบัญชี
            </Typography>
          </MenuItem>
        </>
      )}
      
      {/* Change Password Option */}
      <MenuItem 
        onClick={() => {
          // You can implement actual password change functionality here
          alert('ฟีเจอร์เปลี่ยนรหัสผ่านจะเพิ่มในอนาคต\nสามารถใช้ฟีเจอร์ "รีเซ็ตรหัสผ่าน" ในหน้าเข้าสู่ระบบได้');
        }}
      >
        <LockResetIcon style={{ marginRight: 8 }} />
        เปลี่ยนรหัสผ่าน
      </MenuItem>
      
      {/* Logout */}
      <Logout />
    </UserMenu>
  );
};

const MyAppBar = (props) => {
  const { data: identity } = useGetIdentity();
  
  return (
    <AppBar {...props} userMenu={<MyUserMenu />}>
      <Typography
        variant={{ xs: 'subtitle1', sm: 'h6' }}
        color="inherit"
        sx={{ 
          flex: 1, 
          textAlign: 'left', 
          paddingLeft: { xs: 1, sm: 2 },
          fontSize: { xs: '1rem', sm: '1.25rem' }
        }}
        id="react-admin-title"
      >
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>ระบบจัดการการเช่า</Box>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>จัดการเช่า</Box>
      </Typography>
      
      {/* Show current user and role in app bar */}
      {identity && (
        <Box 
          display="flex" 
          alignItems="center" 
          mr={{ xs: 1, sm: 2 }}
          gap={{ xs: 0.5, sm: 1 }}
        >
          <Typography 
            variant={{ xs: 'caption', sm: 'body2' }}
            color="inherit" 
            sx={{ 
              mr: 1,
              display: { xs: 'none', md: 'block' }
            }}
          >
            สวัสดี, {identity.fullName}
          </Typography>
          <Chip
            label={identity.role === 'admin' ? 'Admin' : 'Viewer'}
            size="small"
            color={identity.role === 'admin' ? 'secondary' : 'default'}
            sx={{ 
              backgroundColor: identity.role === 'admin' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: { xs: '0.7rem', sm: '0.75rem' }
            }}
          />
        </Box>
      )}
    </AppBar>
  );
};

export default MyAppBar;
