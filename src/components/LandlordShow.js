import { Show, SimpleShowLayout, TextField, EmailField } from 'react-admin';

const LandlordShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="full_name" />
      <EmailField source="email" />
      <TextField source="phone" />
    </SimpleShowLayout>
  </Show>
);

export default LandlordShow;
