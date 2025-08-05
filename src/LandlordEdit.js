import { Edit, SimpleForm, TextInput } from 'react-admin';

const LandlordEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="full_name" />
      <TextInput source="email" />
      <TextInput source="phone" />
    </SimpleForm>
  </Edit>
);

export default LandlordEdit;
