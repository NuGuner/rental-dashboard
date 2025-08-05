import { Create, SimpleForm, TextInput } from 'react-admin';

const LandlordCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="full_name" />
      <TextInput source="email" />
      <TextInput source="phone" />
    </SimpleForm>
  </Create>
);

export default LandlordCreate;
