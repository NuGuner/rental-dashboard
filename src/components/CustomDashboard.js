// src/components/CustomDashboard.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { supabase } from '../supabaseClient';
import dayjs from 'dayjs';

const CustomDashboard = () => {
  const [rentedCount, setRentedCount] = useState(0);
  const [expiringContracts, setExpiringContracts] = useState([]);

  useEffect(() => {
    // ดึงจำนวนห้องที่มีการเช่า
    supabase
      .from('rooms')
      .select('*')
      .eq('status', 'มีผู้เช่า')
      .then(({ data }) => {
        setRentedCount(data.length);
      });

    // ดึงสัญญาที่ใกล้หมดอายุ (ภายใน 30 วัน)
    const today = dayjs();
    const next30 = today.add(30, 'day').format('YYYY-MM-DD');

    supabase
      .from('contracts')
      .select('*')
      .lte('end_date', next30)
      .then(({ data }) => {
        setExpiringContracts(data);
      });
  }, []);

  return (
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
  );
};

export default CustomDashboard;
