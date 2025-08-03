import React, { useEffect, useState } from 'react';
import { Admin, Resource } from 'react-admin';
import { supabase } from './supabaseClient';
import supabaseDataProvider from './supabaseDataProvider';
import authProvider from './authProvider';
import Auth from './Auth';
import CustomDashboard from './components/CustomDashboard';
import { RoomList } from './components/RoomList';
import { TenantList } from './components/TenantList';
import { ContractList } from './components/ContractList';

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
      dashboard={CustomDashboard}
      dataProvider={supabaseDataProvider}
      authProvider={authProvider}
    >
      <Resource name="rooms" list={RoomList} />
      <Resource name="tenants" list={TenantList} />
      <Resource name="contracts" list={ContractList} />
    </Admin>
  );
}

export default App;
