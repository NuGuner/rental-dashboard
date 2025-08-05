import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import { supabase } from '../supabaseClient';

const CustomDashboard = () => {
  const [roomCount, setRoomCount] = useState(0);
  const [tenantCount, setTenantCount] = useState(0);
  const [contractCount, setContractCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const rooms = await supabase.from('rooms').select('*', { count: 'exact' });
      const tenants = await supabase.from('tenants').select('*', { count: 'exact' });
      const contracts = await supabase.from('contracts').select('*', { count: 'exact' });

      if (rooms.count) setRoomCount(rooms.count);
      if (tenants.count) setTenantCount(tenants.count);
      if (contracts.count) setContractCount(contracts.count);
    };

    fetchCounts();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom><HomeIcon /> ห้องทั้งหมด</Typography>
            <Typography variant="h4">{roomCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom><PeopleIcon /> ผู้เช่าทั้งหมด</Typography>
            <Typography variant="h4">{tenantCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom><DescriptionIcon /> สัญญาเช่า</Typography>
            <Typography variant="h4">{contractCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CustomDashboard;
