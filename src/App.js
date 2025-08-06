import React from 'react';
import ContractShow from './ContractShow';
import LandlordList from './LandlordList';
import LandlordCreate from './LandlordCreate';
import LandlordEdit from './LandlordEdit';
import LandlordShow from './LandlordShow';
import { Admin, Resource } from 'react-admin';
import theme from './theme';
import CustomDashboard from './components/CustomDashboard';
import { RoomList, RoomEdit, RoomCreate } from './components/RoomList';
import { TenantList, TenantEdit, TenantCreate } from './components/TenantList';
import { ContractList, ContractEdit, ContractCreate } from './components/ContractList';
import dataProvider from './supabaseDataProvider';
import MyAppBar from './components/MyAppBar';

function App() {
  return (
    <Admin
      theme={theme}
      dashboard={CustomDashboard}
      dataProvider={dataProvider}
      // authProvider={authProvider} // Disabled authentication
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
