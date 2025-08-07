// src/components/TenantList.js
import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  required,
} from 'react-admin';

export const TenantList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="รหัสผู้เช่า" />
      <TextField source="id" />
      <TextField source="full_name" label="ชื่อ-นามสกุล" />
      <TextField source="phone" label="เบอร์โทร" />
      <EmailField source="email" label="อีเมล" />
      <TextField source="address" label="ที่อยู่" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const TenantEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="full_name" label="ชื่อ-นามสกุล" validate={[required()]} />
      <TextInput source="phone" label="เบอร์โทร" validate={[required()]} />
      <TextInput source="email" label="อีเมล" />
      <TextInput source="address" label="ที่อยู่" validate={[required()]} />
    </SimpleForm>
  </Edit>
);

export const TenantCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="full_name" label="ชื่อ-นามสกุล" validate={[required()]} />
      <TextInput source="phone" label="เบอร์โทร" validate={[required()]} />
      <TextInput source="email" label="อีเมล" validate={[required()]} />
      <TextInput source="address" label="ที่อยู่" validate={[required()]} />
    </SimpleForm>
  </Create>
);
