import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Box,
  LinearProgress,
  Chip,
  Avatar,
  IconButton,
  Fade,
  Grow,
  Divider
} from '@mui/material';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Description as DescriptionIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Refresh as RefreshIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import { supabase } from '../supabaseClient';
import dayjs from 'dayjs';

const CustomDashboard = () => {
  const [roomCount, setRoomCount] = useState(0);
  const [tenantCount, setTenantCount] = useState(0);
  const [contractCount, setContractCount] = useState(0);
  const [rentedCount, setRentedCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [expiringContracts, setExpiringContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rentalStats, setRentalStats] = useState({
    monthlyIncome: 0,
    averageRent: 0,
    activeContracts: 0,
    expiredContracts: 0,
    maintenanceRooms: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        
        // ดึงจำนวนข้อมูลทั้งหมด
        const rooms = await supabase.from('rooms').select('*', { count: 'exact' });
        const tenants = await supabase.from('tenants').select('*', { count: 'exact' });
        const contracts = await supabase.from('contracts').select('*', { count: 'exact' });

        if (rooms.count) setRoomCount(rooms.count);
        if (tenants.count) setTenantCount(tenants.count);
        if (contracts.count) setContractCount(contracts.count);

        // ดึงจำนวนห้องที่มีการเช่า - ตรวจสอบทั้ง 2 สถานะที่เป็นไปได้
        const rentedRooms = await supabase
          .from('rooms')
          .select('*')
          .in('status', ['มีผู้เช่า', 'เช่าแล้ว', 'ไม่ว่าง', 'rented']);
        
        console.log('All rooms data:', rooms.data);
        console.log('Rented rooms data:', rentedRooms.data);
        
        if (rentedRooms.data) setRentedCount(rentedRooms.data.length);

        // ดึงจำนวนห้องว่าง
        const availableRooms = await supabase
          .from('rooms')
          .select('*')
          .in('status', ['ว่าง', 'พร้อมให้เช่า', 'available']);
        
        console.log('Available rooms data:', availableRooms.data);
        if (availableRooms.data) setAvailableCount(availableRooms.data.length);

        // ดึงจำนวนห้องที่กำลังซ่อม
        const maintenanceRooms = await supabase
          .from('rooms')
          .select('*')
          .in('status', ['กำลังซ่อม', 'maintenance']);

        // ดึงสัญญาที่ใกล้หมดอายุ (ภายใน 30 วัน)
        const today = dayjs();
        const next30 = today.add(30, 'day').format('YYYY-MM-DD');

        const expiringData = await supabase
          .from('contracts')
          .select('*')
          .lte('end_date', next30)
          .eq('status', 'ใช้งาน');
        
        if (expiringData.data) setExpiringContracts(expiringData.data);

        // คำนวณสถิติการเช่า
        if (rooms.data && contracts.data) {
          let monthlyIncome = 0;
          let totalRent = 0;
          let activeContracts = 0;
          let expiredContracts = 0;

          // คำนวณรายได้ต่อเดือนจากห้องที่เช่า
          rooms.data.forEach(room => {
            if (['rented', 'เช่าแล้ว', 'มีผู้เช่า', 'ไม่ว่าง'].includes(room.status)) {
              monthlyIncome += room.monthly_rent || 0;
            }
          });

          // คำนวณสัญญาที่ใช้งานและหมดอายุ
          contracts.data.forEach(contract => {
            if (contract.status === 'ใช้งาน') {
              activeContracts++;
              if (dayjs(contract.end_date).isBefore(today)) {
                expiredContracts++;
              }
            }
          });

          // คำนวณค่าเช่าเฉลี่ย
          const rentedRoomsWithRent = rooms.data.filter(room => 
            ['rented', 'เช่าแล้ว', 'มีผู้เช่า', 'ไม่ว่าง'].includes(room.status) && room.monthly_rent
          );
          const averageRent = rentedRoomsWithRent.length > 0 
            ? Math.round(rentedRoomsWithRent.reduce((sum, room) => sum + room.monthly_rent, 0) / rentedRoomsWithRent.length)
            : 0;

          setRentalStats({
            monthlyIncome,
            averageRent,
            activeContracts,
            expiredContracts,
            maintenanceRooms: maintenanceRooms.data ? maintenanceRooms.data.length : 0
          });
        }

        // Debug: แสดงสถานะของห้องทั้งหมด
        if (rooms.data) {
          const statusCounts = rooms.data.reduce((acc, room) => {
            const status = room.status || 'ไม่มีสถานะ';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
          }, {});
          console.log('Room status breakdown:', statusCounts);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const occupancyRate = roomCount > 0 ? Math.round((rentedCount / roomCount) * 100) : 0;
  const calculatedAvailable = Math.max(0, roomCount - rentedCount); // Fallback calculation

  const StatCard = ({ icon, title, value, subtitle, color, gradient, delay = 0 }) => (
    <Grow in={!loading} timeout={1000} style={{ transitionDelay: `${delay}ms` }}>
      <Card
        sx={{
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: gradient,
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(102, 126, 234, 0.2)',
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="space-between"
            flexDirection={{ xs: 'column', sm: 'row' }}
            textAlign={{ xs: 'center', sm: 'left' }}
            gap={{ xs: 2, sm: 0 }}
          >
            <Box sx={{ order: { xs: 2, sm: 1 } }}>
              <Typography 
                variant={{ xs: 'subtitle2', sm: 'h6' }}
                color="text.secondary" 
                gutterBottom
              >
                {title}
              </Typography>
              <Typography 
                variant={{ xs: 'h4', sm: 'h3' }}
                fontWeight="bold" 
                sx={{ 
                  background: gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {loading ? '-' : value}
              </Typography>
              {subtitle && (
                <Typography 
                  variant={{ xs: 'caption', sm: 'body2' }}
                  color="text.secondary" 
                  sx={{ mt: 1 }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
            <Avatar
              sx={{
                width: { xs: 48, sm: 56, md: 64 },
                height: { xs: 48, sm: 56, md: 64 },
                background: gradient,
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                order: { xs: 1, sm: 2 }
              }}
            >
              {React.cloneElement(icon, { 
                sx: { 
                  fontSize: { xs: 20, sm: 24, md: 28 }
                } 
              })}
            </Avatar>
          </Box>
          {loading && (
            <LinearProgress 
              sx={{ 
                mt: 2, 
                borderRadius: 2,
                height: 4,
                '& .MuiLinearProgress-bar': {
                  background: gradient,
                }
              }} 
            />
          )}
        </CardContent>
      </Card>
    </Grow>
  );

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 }, // Responsive padding: smaller on mobile
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Fade in={true} timeout={800}>
        <Box mb={{ xs: 3, md: 4 }}>
          <Box 
            display="flex" 
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between" 
            mb={2}
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={{ xs: 2, sm: 0 }}
          >
            <Box>
              <Typography 
                variant={{ xs: 'h5', sm: 'h4' }} // Smaller heading on mobile
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                แดชบอร์ดภาพรวม
              </Typography>
              <Typography 
                variant={{ xs: 'body2', sm: 'body1' }} 
                color="text.secondary" 
                sx={{ mt: 1 }}
              >
                ข้อมูลสรุปการจัดการระบบการเช่า ณ วันที่ {dayjs().format('DD/MM/YYYY')}
              </Typography>
            </Box>
            <IconButton
              onClick={() => window.location.reload()}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                alignSelf: { xs: 'flex-end', sm: 'center' },
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  transform: 'rotate(180deg)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Box>
        </Box>
      </Fade>

      {/* Statistics Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }} mb={{ xs: 3, md: 4 }}>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            icon={<HomeIcon sx={{ fontSize: 28 }} />}
            title="ห้องทั้งหมด"
            value={roomCount}
            subtitle={`ห้องว่าง ${availableCount || calculatedAvailable} ห้อง`}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            delay={0}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            icon={<PeopleIcon sx={{ fontSize: 28 }} />}
            title="ผู้เช่าทั้งหมด"
            value={tenantCount}
            subtitle="ผู้เช่าปัจจุบัน"
            gradient="linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)"
            delay={100}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            icon={<DescriptionIcon sx={{ fontSize: 28 }} />}
            title="สัญญาเช่า"
            value={contractCount}
            subtitle="สัญญาทั้งหมด"
            gradient="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
            delay={200}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            icon={<TrendingUpIcon sx={{ fontSize: 28 }} />}
            title="อัตราการเช่า"
            value={`${occupancyRate}%`}
            subtitle={`${rentedCount} จาก ${roomCount} ห้อง`}
            gradient="linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)"
            delay={300}
          />
        </Grid>
      </Grid>

      {/* Detailed Information */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} lg={8}>
          <Fade in={!loading} timeout={1200}>
            <Card>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <WarningIcon 
                    sx={{ 
                      mr: 2, 
                      color: '#ff6b6b',
                      fontSize: { xs: 24, sm: 28 }
                    }} 
                  />
                  <Typography 
                    variant={{ xs: 'subtitle1', sm: 'h6' }}
                    fontWeight="bold"
                  >
                    สัญญาใกล้หมดอายุ (30 วันข้างหน้า)
                  </Typography>
                </Box>
                
                {expiringContracts.length === 0 ? (
                  <Box textAlign="center" py={{ xs: 3, sm: 4 }}>
                    <CheckCircleIcon 
                      sx={{ 
                        fontSize: { xs: 48, sm: 64 }, 
                        color: '#4ecdc4',
                        mb: 2
                      }} 
                    />
                    <Typography 
                      variant={{ xs: 'subtitle1', sm: 'h6' }}
                      color="text.secondary"
                    >
                      ไม่มีสัญญาที่ใกล้หมดอายุ
                    </Typography>
                    <Typography 
                      variant={{ xs: 'caption', sm: 'body2' }}
                      color="text.secondary"
                    >
                      สัญญาทั้งหมดยังมีระยะเวลาการเช่ามากกว่า 30 วัน
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    {expiringContracts.map((contract, index) => (
                      <Fade in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }} key={contract.id}>
                        <Box
                          sx={{
                            p: { xs: 1.5, sm: 2 },
                            mb: 2,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(255, 182, 182, 0.1) 100%)',
                            border: '1px solid rgba(255, 107, 107, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: { xs: 1, sm: 0 }
                          }}
                        >
                          <Box 
                            display="flex" 
                            alignItems="center"
                            justifyContent={{ xs: 'center', sm: 'flex-start' }}
                            width={{ xs: '100%', sm: 'auto' }}
                          >
                            <ScheduleIcon sx={{ mr: 2, color: '#ff6b6b', fontSize: { xs: 20, sm: 24 } }} />
                            <Box textAlign={{ xs: 'center', sm: 'left' }}>
                              <Typography 
                                variant={{ xs: 'body1', sm: 'subtitle1' }}
                                fontWeight="600"
                              >
                                ห้อง {contract.room_id}
                              </Typography>
                              <Typography 
                                variant={{ xs: 'caption', sm: 'body2' }}
                                color="text.secondary"
                              >
                                หมดอายุวันที่ {dayjs(contract.end_date).format('DD/MM/YYYY')}
                              </Typography>
                            </Box>
                          </Box>
                          <Chip
                            label={`เหลือ ${dayjs(contract.end_date).diff(dayjs(), 'day')} วัน`}
                            size={{ xs: 'small', sm: 'medium' }}
                            sx={{
                              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                              color: 'white',
                              fontWeight: 600,
                              fontSize: { xs: '0.75rem', sm: '0.875rem' }
                            }}
                          />
                        </Box>
                      </Fade>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Fade>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Fade in={!loading} timeout={1400}>
            <Card>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <AssessmentIcon 
                    sx={{ 
                      mr: 2, 
                      color: '#667eea',
                      fontSize: { xs: 24, sm: 28 }
                    }} 
                  />
                  <Typography 
                    variant={{ xs: 'subtitle1', sm: 'h6' }}
                    fontWeight="bold"
                  >
                    สถิติการเช่า
                  </Typography>
                </Box>
                
                {/* รายได้ต่อเดือน */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%)',
                    border: '1px solid rgba(255, 193, 7, 0.2)',
                    mb: 2,
                  }}
                >
                  <Box display="flex" alignItems="center" mb={1}>
                    <MoneyIcon sx={{ mr: 1, color: '#ffc107', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      รายได้ต่อเดือน
                    </Typography>
                  </Box>
                  <Typography 
                    variant={{ xs: 'h5', sm: 'h4' }}
                    fontWeight="bold" 
                    color="#ffc107"
                  >
                    ฿{rentalStats.monthlyIncome.toLocaleString()}
                  </Typography>
                </Box>

                {/* อัตราการเช่า */}
                <Box mb={3}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      อัตราการเช่า
                    </Typography>
                    <Typography variant="body2" fontWeight="600">
                      {occupancyRate}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={occupancyRate}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(102, 126, 234, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* สถิติรายละเอียด */}
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    สถานะห้อง
                  </Typography>
                  
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      ห้องที่มีผู้เช่า
                    </Typography>
                    <Typography variant="body2" fontWeight="600" color="#4ecdc4">
                      {rentedCount}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      ห้องว่าง
                    </Typography>
                    <Typography variant="body2" fontWeight="600" color="#667eea">
                      {availableCount || calculatedAvailable}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      ห้องกำลังซ่อม
                    </Typography>
                    <Typography variant="body2" fontWeight="600" color="#ff9800">
                      {rentalStats.maintenanceRooms}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* สถิติสัญญา */}
                <Box>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    สถานะสัญญา
                  </Typography>
                  
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      สัญญาที่ใช้งาน
                    </Typography>
                    <Typography variant="body2" fontWeight="600" color="#4caf50">
                      {rentalStats.activeContracts}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      สัญญาหมดอายุ
                    </Typography>
                    <Typography variant="body2" fontWeight="600" color="#f44336">
                      {rentalStats.expiredContracts}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      ค่าเช่าเฉลี่ย
                    </Typography>
                    <Typography variant="body2" fontWeight="600" color="#9c27b0">
                      ฿{rentalStats.averageRent.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomDashboard;
