import { List, Datagrid, TextField, EmailField } from 'react-admin';

const LandlordList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="full_name" />
      <EmailField source="email" />
      <TextField source="phone" />
    </Datagrid>
  </List>
);

export default LandlordList;
