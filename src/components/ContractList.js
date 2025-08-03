// src/components/ContractList.js
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
} from 'react-admin';

export const ContractList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="room_id" label="รหัสห้อง" />
      <TextField source="tenant_id" label="รหัสผู้เช่า" />
      <TextField source="owner_id" label="รหัสเจ้าของ" />
      <DateField source="start_date" label="วันที่เริ่มสัญญา" />
      <DateField source="end_date" label="วันหมดสัญญา" />
      <NumberField source="duration_months" label="อายุสัญญา (เดือน)" />
      <TextField source="status" label="สถานะสัญญา" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ContractEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="room_id" label="รหัสห้อง" />
      <TextInput source="tenant_id" label="รหัสผู้เช่า" />
      <TextInput source="owner_id" label="รหัสเจ้าของ" />
      <DateInput source="start_date" label="วันที่เริ่มสัญญา" />
      <DateInput source="end_date" label="วันหมดสัญญา" />
      <NumberInput source="duration_months" label="อายุสัญญา (เดือน)" />
      <TextInput source="status" label="สถานะสัญญา" />
    </SimpleForm>
  </Edit>
);

export const ContractCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="room_id" label="รหัสห้อง" />
      <TextInput source="tenant_id" label="รหัสผู้เช่า" />
      <TextInput source="owner_id" label="รหัสเจ้าของ" />
      <DateInput source="start_date" label="วันที่เริ่มสัญญา" />
      <DateInput source="end_date" label="วันหมดสัญญา" />
      <NumberInput source="duration_months" label="อายุสัญญา (เดือน)" />
      <TextInput source="status" label="สถานะสัญญา" />
    </SimpleForm>
  </Create>
);
