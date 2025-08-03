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
  ReferenceField,
  ReferenceInput,
  SelectInput,
  required,
=======
} from 'react-admin';

export const ContractList = () => (
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
      <DateField source="start_date" label="วันที่เริ่มสัญญา" />
      <DateField source="end_date" label="วันหมดสัญญา" />
      <NumberField source="contract_duration" label="อายุสัญญา (เดือน)" />
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
      <ReferenceInput source="room_id" reference="rooms" label="ห้อง">
        <SelectInput optionText="room_name" />
      </ReferenceInput>
      <ReferenceInput source="tenant_id" reference="tenants" label="ผู้เช่า">
        <SelectInput optionText="full_name" />
      </ReferenceInput>
      <ReferenceInput source="landlord_id" reference="landlords" label="เจ้าของ">
<SelectInput optionText="full_name" />
</ReferenceInput>
      <DateInput source="start_date" label="วันที่เริ่มสัญญา" validate={[required()]} />
      <DateInput source="end_date" label="วันหมดสัญญา" validate={[required()]} />
      <NumberInput source="contract_duration" label="อายุสัญญา (เดือน)" validate={[required()]} />
      <TextInput source="status" label="สถานะสัญญา" validate={[required()]} />
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
      <ReferenceInput source="room_id" reference="rooms" label="ห้อง">
        <SelectInput optionText="room_name" />
      </ReferenceInput>
      <ReferenceInput source="tenant_id" reference="tenants" label="ผู้เช่า">
        <SelectInput optionText="full_name" />
      </ReferenceInput>
      <ReferenceInput source="landlord_id" reference="landlords" label="เจ้าของ">
<SelectInput optionText="full_name" />
</ReferenceInput>
      <DateInput source="start_date" label="วันที่เริ่มสัญญา" validate={[required()]} />
      <DateInput source="end_date" label="วันหมดสัญญา" validate={[required()]} />
      <NumberInput source="contract_duration" label="อายุสัญญา (เดือน)" validate={[required()]} />
      <TextInput source="status" label="สถานะสัญญา" validate={[required()]} />
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
