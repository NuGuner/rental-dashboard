import { Show, SimpleShowLayout, TextField, DateField, ReferenceField } from 'react-admin';

const ContractShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField source="room_id" reference="rooms"><TextField source="room_name" /></ReferenceField>
      <ReferenceField source="tenant_id" reference="tenants"><TextField source="full_name" /></ReferenceField>
      <ReferenceField source="landlord_id" reference="landlords"><TextField source="full_name" /></ReferenceField>
      <DateField source="start_date" />
      <DateField source="end_date" />
      <TextField source="contract_duration" />
      <TextField source="status" />
    </SimpleShowLayout>
  </Show>
);

export default ContractShow;
