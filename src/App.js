import React, { useEffect, useState } from 'react';
import ContractShow from './ContractShow';
import LandlordList from './LandlordList';
import LandlordCreate from './LandlordCreate';
import LandlordEdit from './LandlordEdit';
import LandlordShow from './LandlordShow';
import { Admin, Resource } from 'react-admin';
import { supabase } from './supabaseClient';
import theme from './theme';
import CustomDashboard from './components/CustomDashboard';
import { RoomList, RoomEdit, RoomCreate } from './components/RoomList';
import { TenantList, TenantEdit, TenantCreate } from './components/TenantList';
import { ContractList, ContractEdit, ContractCreate } from './components/ContractList';
import dataProvider from './supabaseDataProvider';
import authProvider from './authProvider';
import MyAppBar from './components/MyAppBar';
import Auth from './Auth';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        กำลังโหลด...
      </div>
    );
  }

  // Show login form if not authenticated
  if (!session) {
    return (
      <Auth
        onLogin={async ({ username, password }) => {
          try {
            await authProvider.login({ username, password });
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
          } catch (error) {
            throw error; // Let Auth component handle the error display
          }
        }}
      />
    );
  }

  // Show main app if authenticated
  return (
    <Admin
      theme={theme}
      dashboard={CustomDashboard}
      dataProvider={dataProvider}
      authProvider={authProvider}
      appBar={MyAppBar}
    >
      {/* เรียงลำดับใหม่: Contracts ก่อน Rooms */}
      <Resource
        name="contracts"
        list={ContractList}
        create={ContractCreate}
        edit={ContractEdit}
        show={ContractShow}
      />
      <Resource
        name="rooms"
        list={RoomList}
        edit={RoomEdit}
        create={RoomCreate}
      />
      <Resource
        name="tenants"
        list={TenantList}
        edit={TenantEdit}
        create={TenantCreate}
      />
      <Resource
        name="landlords"
        list={LandlordList}
        create={LandlordCreate}
        edit={LandlordEdit}
        show={LandlordShow}
      />
    </Admin>
  );
}

export default App;
