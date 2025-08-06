// Auth.js
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  Box,
  Tabs,
  Tab,
  CircularProgress,
  Link
} from '@mui/material';
import { supabase } from './supabaseClient';

const Auth = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setMessage('');
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await onLogin({ username: email, password });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            role: 'viewer' // Default role
          }
        }
      });
      
      if (error) throw error;
      
      setMessage('ส่งอีเมลยืนยันแล้ว กรุณาตรวจสอบอีเมลของคุณ');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (err.message.includes('User already registered')) {
        setError('อีเมลนี้ได้ลงทะเบียนแล้ว');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (!email) {
      setError('กรุณากรอกอีเมล');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      setMessage('ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว');
    } catch (err) {
      setError('เกิดข้อผิดพลาด: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#f5f5f5', padding: 2 }}
    >
      <Card sx={{ maxWidth: 450, width: '100%' }}>
        <CardContent sx={{ padding: 4 }}>
          <Typography variant="h4" align="center" gutterBottom color="primary">
            ระบบจัดการการเช่า
          </Typography>
          
          <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
            <Tab label="เข้าสู่ระบบ" />
            <Tab label="สมัครสมาชิก" />
            <Tab label="รีเซ็ตรหัสผ่าน" />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          {/* Login Tab */}
          {activeTab === 0 && (
            <Box component="form" onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="อีเมล"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                disabled={loading}
              />
              <TextField
                fullWidth
                label="รหัสผ่าน"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                disabled={loading}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'เข้าสู่ระบบ'}
              </Button>
            </Box>
          )}

          {/* Sign Up Tab */}
          {activeTab === 1 && (
            <Box component="form" onSubmit={handleSignUp}>
              <TextField
                fullWidth
                label="อีเมล"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                disabled={loading}
              />
              <TextField
                fullWidth
                label="รหัสผ่าน"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                disabled={loading}
                helperText="อย่างน้อย 6 ตัวอักษร"
              />
              <TextField
                fullWidth
                label="ยืนยันรหัสผ่าน"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                disabled={loading}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'สมัครสมาชิก'}
              </Button>
              <Typography variant="body2" color="text.secondary" align="center">
                หมายเหตุ: จำเป็นต้องได้รับการอนุมัติจากผู้ดูแลระบบ
              </Typography>
            </Box>
          )}

          {/* Password Reset Tab */}
          {activeTab === 2 && (
            <Box component="form" onSubmit={handlePasswordReset}>
              <TextField
                fullWidth
                label="อีเมล"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                disabled={loading}
                helperText="กรอกอีเมลที่ใช้สมัครสมาชิก"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'ส่งลิงก์รีเซ็ตรหัสผ่าน'}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Auth;
