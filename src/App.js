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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!session) {
    return (
      <Auth
        onLogin={async ({ username, password }) => {
          await authProvider.login({ username, password });
          const { data } = await supabase.auth.getSession();
          setSession(data.session);
        }}
      />
    );
  }

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
