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
  Container,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
  Fade,
  Slide
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Home as HomeIcon,
  Security as SecurityIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  VpnKey as VpnKeyIcon
} from '@mui/icons-material';
import { supabase } from './supabaseClient';

const Auth = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setMessage('');
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
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
            role: 'viewer'
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

  const TabPanel = ({ children, value, index }) => (
    <Fade in={value === index} timeout={300}>
      <div hidden={value !== index}>
        {value === index && children}
      </div>
    </Fade>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          animation: 'float 20s ease-in-out infinite'
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }}
    >
      <Container maxWidth="sm">
        <Slide direction="up" in={true} timeout={800}>
          <Paper
            elevation={24}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative'
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                padding: 4,
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)'
                }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}
              >
                <HomeIcon sx={{ fontSize: 48, mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                    ระบบจัดการการเช่า
                  </Typography>
                  <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                    Rental Management System
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                เข้าสู่ระบบเพื่อจัดการข้อมูลการเช่าอสังหาริมทรัพย์
              </Typography>
            </Box>

            <CardContent sx={{ padding: 4 }}>
              {/* Custom Tabs */}
              <Box sx={{ mb: 3 }}>
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange} 
                  centered
                  sx={{
                    '& .MuiTab-root': {
                      minHeight: 60,
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      borderRadius: 2,
                      margin: '0 4px',
                      minWidth: 120,
                      transition: 'all 0.3s ease'
                    },
                    '& .MuiTab-root.Mui-selected': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                    },
                    '& .MuiTabs-indicator': {
                      display: 'none'
                    }
                  }}
                >
                  <Tab 
                    icon={<SecurityIcon />} 
                    label="เข้าสู่ระบบ" 
                    iconPosition="start"
                  />
                  <Tab 
                    icon={<PersonIcon />} 
                    label="สมัครสมาชิก" 
                    iconPosition="start"
                  />
                  <Tab 
                    icon={<VpnKeyIcon />} 
                    label="รีเซ็ตรหัสผ่าน" 
                    iconPosition="start"
                  />
                </Tabs>
              </Box>

              {/* Alert Messages */}
              {error && (
                <Fade in={true}>
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3, 
                      borderRadius: 2,
                      '& .MuiAlert-icon': {
                        fontSize: 24
                      }
                    }}
                  >
                    {error}
                  </Alert>
                </Fade>
              )}

              {message && (
                <Fade in={true}>
                  <Alert 
                    severity="success" 
                    sx={{ 
                      mb: 3, 
                      borderRadius: 2,
                      '& .MuiAlert-icon': {
                        fontSize: 24
                      }
                    }}
                  >
                    {message}
                  </Alert>
                </Fade>
              )}

              {/* Login Tab */}
              <TabPanel value={activeTab} index={0}>
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        height: 56,
                        '&:hover fieldset': {
                          borderColor: '#667eea',
                        },
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="รหัสผ่าน"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        height: 56,
                        '&:hover fieldset': {
                          borderColor: '#667eea',
                        },
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ 
                      mt: 3, 
                      mb: 2, 
                      height: 56,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <>
                        <SecurityIcon sx={{ mr: 1 }} />
                        เข้าสู่ระบบ
                      </>
                    )}
                  </Button>
                </Box>
              </TabPanel>

              {/* Sign Up Tab */}
              <TabPanel value={activeTab} index={1}>
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        height: 56,
                        '&:hover fieldset': {
                          borderColor: '#667eea',
                        },
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="รหัสผ่าน"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                    disabled={loading}
                    helperText="อย่างน้อย 6 ตัวอักษร"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        height: 56,
                        '&:hover fieldset': {
                          borderColor: '#667eea',
                        },
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="ยืนยันรหัสผ่าน"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    margin="normal"
                    required
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        height: 56,
                        '&:hover fieldset': {
                          borderColor: '#667eea',
                        },
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ 
                      mt: 3, 
                      mb: 2, 
                      height: 56,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: '0 4px 15px rgba(78, 205, 196, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #26d0ce 0%, #1a2980 100%)',
                        boxShadow: '0 6px 20px rgba(78, 205, 196, 0.6)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <>
                        <PersonIcon sx={{ mr: 1 }} />
                        สมัครสมาชิก
                      </>
                    )}
                  </Button>
                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    <Typography variant="body2">
                      หมายเหตุ: จำเป็นต้องได้รับการอนุมัติจากผู้ดูแลระบบ
                    </Typography>
                  </Alert>
                </Box>
              </TabPanel>

              {/* Password Reset Tab */}
              <TabPanel value={activeTab} index={2}>
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        height: 56,
                        '&:hover fieldset': {
                          borderColor: '#667eea',
                        },
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ 
                      mt: 3, 
                      mb: 2, 
                      height: 56,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #ff5252 0%, #d63031 100%)',
                        boxShadow: '0 6px 20px rgba(255, 107, 107, 0.6)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <>
                        <VpnKeyIcon sx={{ mr: 1 }} />
                        ส่งลิงก์รีเซ็ตรหัสผ่าน
                      </>
                    )}
                  </Button>
                </Box>
              </TabPanel>

              {/* Footer */}
              <Divider sx={{ my: 3 }} />
              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  © 2024 ระบบจัดการการเช่า. สงวนลิขสิทธิ์
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  เพื่อความปลอดภัย กรุณาไม่แชร์ข้อมูลการเข้าสู่ระบบกับผู้อื่น
                </Typography>
              </Box>
            </CardContent>
          </Paper>
        </Slide>
      </Container>
    </Box>
  );
};

export default Auth;
