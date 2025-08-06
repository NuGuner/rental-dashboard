// src/components/RoleBasedAccess.js
import React from 'react';
import { usePermissions } from 'react-admin';
import { Alert, Box } from '@mui/material';

// Component to wrap content that requires specific permissions
export const PermissionGate = ({ 
  children, 
  action, 
  fallback = null, 
  showMessage = false 
}) => {
  const { permissions } = usePermissions();
  
  const rolePermissions = {
    admin: ['create', 'read', 'update', 'delete', 'manage_users', 'view_reports'],
    viewer: ['read']
  };

  const hasPermission = rolePermissions[permissions]?.includes(action);

  if (!hasPermission) {
    if (showMessage) {
      return (
        <Alert severity="warning" sx={{ margin: 2 }}>
          คุณไม่มีสิทธิ์ในการดำเนินการนี้ ต้องการสิทธิ์: {action}
        </Alert>
      );
    }
    return fallback;
  }

  return children;
};

// Component to show different content based on role
export const RoleBasedComponent = ({ 
  adminComponent, 
  viewerComponent, 
  defaultComponent = null 
}) => {
  const { permissions } = usePermissions();

  switch (permissions) {
    case 'admin':
      return adminComponent;
    case 'viewer':
      return viewerComponent;
    default:
      return defaultComponent;
  }
};

// Hook for checking permissions in components
export const useRolePermissions = () => {
  const { permissions } = usePermissions();
  
  const hasPermission = (action) => {
    const rolePermissions = {
      admin: ['create', 'read', 'update', 'delete', 'manage_users', 'view_reports'],
      viewer: ['read']
    };

    return rolePermissions[permissions]?.includes(action) || false;
  };

  const isAdmin = () => permissions === 'admin';
  const isViewer = () => permissions === 'viewer';

  return {
    permissions,
    hasPermission,
    isAdmin,
    isViewer,
    canCreate: hasPermission('create'),
    canUpdate: hasPermission('update'),
    canDelete: hasPermission('delete'),
    canManageUsers: hasPermission('manage_users'),
    canViewReports: hasPermission('view_reports')
  };
};

export default PermissionGate;