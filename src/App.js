import React, { useEffect, useState } from 'react';
// import ContractShow from './ContractShow'; // Replaced with new ContractsPage
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
import { ContractsList, ContractsEdit, ContractsCreate, ContractsShow } from './components/ContractsPage';
import UserManagement from './components/UserManagement';
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
        list={ContractsList}
        create={ContractsCreate}
        edit={ContractsEdit}
        show={ContractsShow}
        options={{ label: 'สัญญาเช่า' }}
      />
      <Resource
        name="rooms"
        list={RoomList}
        edit={RoomEdit}
        create={RoomCreate}
        options={{ label: 'ห้องเช่า' }}
      />
      <Resource
        name="tenants"
        list={TenantList}
        edit={TenantEdit}
        create={TenantCreate}
        options={{ label: 'ผู้เช่า' }}
      />
      <Resource
        name="landlords"
        list={LandlordList}
        create={LandlordCreate}
        edit={LandlordEdit}
        show={LandlordShow}
        options={{ label: 'เจ้าของ' }}
      />
      {/* User Management - Admin Only */}
      <Resource
        name="users"
        list={UserManagement}
        options={{ label: 'จัดการผู้ใช้' }}
      />
    </Admin>
  );
}

export default App;
