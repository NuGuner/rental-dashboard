import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import { supabase } from '../supabaseClient';
import dayjs from 'dayjs';

const CustomDashboard = () => {
  const [roomCount, setRoomCount] = useState(0);
  const [tenantCount, setTenantCount] = useState(0);
  const [contractCount, setContractCount] = useState(0);
  const [rentedCount, setRentedCount] = useState(0);
  const [expiringContracts, setExpiringContracts] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      // ดึงจำนวนข้อมูลทั้งหมด
      const rooms = await supabase.from('rooms').select('*', { count: 'exact' });
      const tenants = await supabase.from('tenants').select('*', { count: 'exact' });
      const contracts = await supabase.from('contracts').select('*', { count: 'exact' });

      if (rooms.count) setRoomCount(rooms.count);
      if (tenants.count) setTenantCount(tenants.count);
      if (contracts.count) setContractCount(contracts.count);

      // ดึงจำนวนห้องที่มีการเช่า
      const rentedRooms = await supabase
        .from('rooms')
        .select('*')
        .eq('status', 'มีผู้เช่า');
      
      if (rentedRooms.data) setRentedCount(rentedRooms.data.length);

      // ดึงสัญญาที่ใกล้หมดอายุ (ภายใน 30 วัน)
      const today = dayjs();
      const next30 = today.add(30, 'day').format('YYYY-MM-DD');

      const expiringData = await supabase
        .from('contracts')
        .select('*')
        .lte('end_date', next30);
      
      if (expiringData.data) setExpiringContracts(expiringData.data);
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <HomeIcon /> ห้องทั้งหมด
              </Typography>
              <Typography variant="h4">{roomCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <PeopleIcon /> ผู้เช่าทั้งหมด
              </Typography>
              <Typography variant="h4">{tenantCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <DescriptionIcon /> สัญญาเช่า
              </Typography>
              <Typography variant="h4">{contractCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">สรุปข้อมูล</Typography>
              <Typography variant="body1">จำนวนห้องที่มีการเช่า: {rentedCount}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                สัญญาใกล้หมดอายุ:
              </Typography>
              {expiringContracts.length > 0 ? (
                expiringContracts.map(contract => (
                  <Typography key={contract.id} variant="body2">
                    ห้อง {contract.room_id} หมดอายุวันที่ {dayjs(contract.end_date).format('DD/MM/YYYY')}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">ไม่มีสัญญาที่ใกล้หมดอายุ</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomDashboard;
