// src/components/UserManagement.js
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Alert,
  Box,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Security as SecurityIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { supabase } from '../supabaseClient';
import emailService from '../services/emailService';
import { useRolePermissions } from './RoleBasedAccess';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState([]);
  
  const { isAdmin, canManageUsers } = useRolePermissions();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    role: 'viewer',
    fullName: ''
  });

  useEffect(() => {
    if (canManageUsers) {
      loadUsers();
      loadNotifications();
    }
  }, [canManageUsers]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      
      // In a real app, you'd fetch from your users table
      // For now, we'll simulate with allowed users
      const allowedUsers = {
        'panutorn@gmail.com': 'admin',
        'magic_oil@hotmail.com': 'admin'
      };

      const userList = Object.entries(allowedUsers).map(([email, role]) => ({
        id: email,
        email,
        role,
        fullName: email.split('@')[0],
        status: 'active',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }));

      setUsers(userList);
    } catch (error) {
      setError('ไม่สามารถโหลดข้อมูลผู้ใช้ได้');
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      // In a real implementation, you'd add to your users table
      // and send invitation email
      
      const newUser = {
        id: formData.email,
        email: formData.email,
        role: formData.role,
        fullName: formData.fullName || formData.email.split('@')[0],
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      setUsers([...users, newUser]);
      
      // Send invitation email
      await emailService.sendUserRegistrationNotification(
        { email: formData.email },
        'panutorn@gmail.com'
      );

      setOpenDialog(false);
      setFormData({ email: '', role: 'viewer', fullName: '' });
      setError('');
      
      // Show success message
      setError(''); // Clear any previous errors
      
    } catch (error) {
      setError('ไม่สามารถเพิ่มผู้ใช้ได้: ' + error.message);
    }
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setFormData({
      email: user.email,
      role: user.role,
      fullName: user.fullName
    });
    setOpenDialog(true);
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUsers = users.map(user =>
        user.id === currentUser.id
          ? { ...user, role: formData.role, fullName: formData.fullName }
          : user
      );
      
      setUsers(updatedUsers);
      setOpenDialog(false);
      setCurrentUser(null);
      setFormData({ email: '', role: 'viewer', fullName: '' });
      
    } catch (error) {
      setError('ไม่สามารถอัปเดตผู้ใช้ได้: ' + error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('ต้องการลบผู้ใช้นี้หรือไม่?')) {
      try {
        const filteredUsers = users.filter(user => user.id !== userId);
        setUsers(filteredUsers);
      } catch (error) {
        setError('ไม่สามารถลบผู้ใช้ได้: ' + error.message);
      }
    }
  };

  const sendTestNotification = async () => {
    try {
      await emailService.sendSystemAlert(
        {
          type: 'test',
          title: 'ทดสอบระบบแจ้งเตือน',
          message: 'นี่คือการทดสอบระบบแจ้งเตือนอีเมล',
          severity: 'info'
        },
        ['panutorn@gmail.com']
      );
      
      alert('ส่งการแจ้งเตือนทดสอบแล้ว');
    } catch (error) {
      setError('ไม่สามารถส่งการแจ้งเตือนได้: ' + error.message);
    }
  };

  if (!canManageUsers) {
    return (
      <Alert severity="error">
        คุณไม่มีสิทธิ์ในการจัดการผู้ใช้
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        จัดการผู้ใช้งาน
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 3 }}>
        <Tab icon={<PeopleIcon />} label="ผู้ใช้งาน" />
        <Tab icon={<EmailIcon />} label="การแจ้งเตือน" />
        <Tab icon={<SecurityIcon />} label="การตั้งค่า" />
      </Tabs>

      {/* Users Tab */}
      {activeTab === 0 && (
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">รายการผู้ใช้งาน</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
              >
                เพิ่มผู้ใช้
              </Button>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>อีเมล</TableCell>
                    <TableCell>ชื่อ</TableCell>
                    <TableCell>สิทธิ์</TableCell>
                    <TableCell>สถานะ</TableCell>
                    <TableCell>เข้าสู่ระบบล่าสุด</TableCell>
                    <TableCell>การดำเนินการ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role === 'admin' ? 'ผู้ดูแล' : 'ผู้ดู'}
                          color={user.role === 'admin' ? 'primary' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.status === 'active' ? 'ใช้งาน' : 'รอการอนุมัติ'}
                          color={user.status === 'active' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('th-TH') : '-'}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditUser(user)} size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteUser(user.id)} size="small">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Notifications Tab */}
      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">การแจ้งเตือน</Typography>
              <Button
                variant="outlined"
                startIcon={<EmailIcon />}
                onClick={sendTestNotification}
              >
                ทดสอบการแจ้งเตือน
              </Button>
            </Box>

            {notifications.length === 0 ? (
              <Typography>ไม่มีการแจ้งเตือน</Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ผู้รับ</TableCell>
                      <TableCell>หัวข้อ</TableCell>
                      <TableCell>สถานะ</TableCell>
                      <TableCell>วันที่</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notifications.map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell>{notification.recipient_email}</TableCell>
                        <TableCell>{notification.subject}</TableCell>
                        <TableCell>
                          <Chip
                            label={notification.status === 'sent' ? 'ส่งแล้ว' : 'รอส่ง'}
                            color={notification.status === 'sent' ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(notification.created_at).toLocaleDateString('th-TH')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      )}

      {/* Settings Tab */}
      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>การตั้งค่าระบบ</Typography>
            
            <Box mb={3}>
              <Typography variant="subtitle1" gutterBottom>การแจ้งเตือนอัตโนมัติ</Typography>
              <Button
                variant="outlined"
                onClick={async () => {
                  try {
                    await emailService.checkAndNotifyExpiringContracts();
                    alert('ตรวจสอบสัญญาที่ใกล้หมดอายุแล้ว');
                  } catch (error) {
                    setError('ไม่สามารถตรวจสอบสัญญาได้: ' + error.message);
                  }
                }}
                sx={{ mr: 2 }}
              >
                ตรวจสอบสัญญาที่ใกล้หมดอายุ
              </Button>
            </Box>

            <Box mb={3}>
              <Typography variant="subtitle1" gutterBottom>สิทธิ์ผู้ใช้</Typography>
              <Typography variant="body2" color="text.secondary">
                • ผู้ดูแล (Admin): สามารถดู แก้ไข เพิ่ม ลบข้อมูลทั้งหมด
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • ผู้ดู (Viewer): สามารถดูข้อมูลได้อย่างเดียว
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentUser ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้ใหม่'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="อีเมล"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            margin="normal"
            disabled={!!currentUser}
          />
          <TextField
            fullWidth
            label="ชื่อ"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>สิทธิ์</InputLabel>
            <Select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <MenuItem value="admin">ผู้ดูแล (Admin)</MenuItem>
              <MenuItem value="viewer">ผู้ดู (Viewer)</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>ยกเลิก</Button>
          <Button
            onClick={currentUser ? handleUpdateUser : handleAddUser}
            variant="contained"
          >
            {currentUser ? 'อัปเดต' : 'เพิ่ม'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;