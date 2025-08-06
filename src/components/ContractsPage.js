import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
  Create,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  required,
  Show,
  SimpleShowLayout,
} from 'react-admin';

// Simple List Component
export const ContractsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="รหัสสัญญา" />
      <ReferenceField source="room_id" reference="rooms" label="ห้อง">
        <TextField source="room_name" />
      </ReferenceField>
      <ReferenceField source="tenant_id" reference="tenants" label="ผู้เช่า">
        <TextField source="full_name" />
      </ReferenceField>
      <ReferenceField source="landlord_id" reference="landlords" label="เจ้าของ">
        <TextField source="full_name" />
      </ReferenceField>
      <DateField source="start_date" label="วันเริ่มสัญญา" />
      <DateField source="end_date" label="วันหมดสัญญา" />
      <NumberField source="contract_duration" label="ระยะเวลา (เดือน)" />
      <TextField source="status" label="สถานะ" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Simple Edit Component
export const ContractsEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="room_id" reference="rooms" label="ห้อง">
        <SelectInput optionText="room_name" validate={[required()]} />
      </ReferenceInput>
      <ReferenceInput source="tenant_id" reference="tenants" label="ผู้เช่า">
        <SelectInput optionText="full_name" validate={[required()]} />
      </ReferenceInput>
      <ReferenceInput source="landlord_id" reference="landlords" label="เจ้าของ">
        <SelectInput optionText="full_name" validate={[required()]} />
      </ReferenceInput>
      <DateInput source="start_date" label="วันเริ่มสัญญา" validate={[required()]} />
      <DateInput source="end_date" label="วันหมดสัญญา" validate={[required()]} />
      <NumberInput source="contract_duration" label="ระยะเวลา (เดือน)" validate={[required()]} />
      <TextInput source="status" label="สถานะ" validate={[required()]} />
    </SimpleForm>
  </Edit>
);

// Simple Create Component
export const ContractsCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="room_id" reference="rooms" label="ห้อง">
        <SelectInput optionText="room_name" validate={[required()]} />
      </ReferenceInput>
      <ReferenceInput source="tenant_id" reference="tenants" label="ผู้เช่า">
        <SelectInput optionText="full_name" validate={[required()]} />
      </ReferenceInput>
      <ReferenceInput source="landlord_id" reference="landlords" label="เจ้าของ">
        <SelectInput optionText="full_name" validate={[required()]} />
      </ReferenceInput>
      <DateInput source="start_date" label="วันเริ่มสัญญา" validate={[required()]} />
      <DateInput source="end_date" label="วันหมดสัญญา" validate={[required()]} />
      <NumberInput source="contract_duration" label="ระยะเวลา (เดือน)" validate={[required()]} />
      <TextInput source="status" label="สถานะ" defaultValue="ใช้งาน" validate={[required()]} />
    </SimpleForm>
  </Create>
);

// Simple Show Component
export const ContractsShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" label="รหัสสัญญา" />
      <ReferenceField source="room_id" reference="rooms" label="ห้อง">
        <TextField source="room_name" />
      </ReferenceField>
      <ReferenceField source="tenant_id" reference="tenants" label="ผู้เช่า">
        <TextField source="full_name" />
      </ReferenceField>
      <ReferenceField source="landlord_id" reference="landlords" label="เจ้าของ">
        <TextField source="full_name" />
      </ReferenceField>
      <DateField source="start_date" label="วันเริ่มสัญญา" />
      <DateField source="end_date" label="วันหมดสัญญา" />
      <NumberField source="contract_duration" label="ระยะเวลา (เดือน)" />
      <TextField source="status" label="สถานะ" />
    </SimpleShowLayout>
  </Show>
);