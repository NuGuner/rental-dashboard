import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  Create,
  required,
} from 'react-admin';

export const RoomList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="รหัสห้อง" />
      <TextField source="room_name" label="ชื่อห้อง" />
      <TextField source="location" label="ที่ตั้ง" />
      <NumberField source="size" label="ขนาด (ตร.ม.)" />
      <NumberField source="monthly_rent" label="ราคาเช่าต่อเดือน" />
      <TextField source="status" label="สถานะ" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="room_name" label="ชื่อห้อง" validate={[required()]} />
      <TextInput source="location" label="ที่ตั้ง" validate={[required()]} />
      <NumberInput source="size" label="ขนาด (ตร.ม.)" validate={[required()]} />
      <NumberInput source="monthly_rent" label="ราคาเช่าต่อเดือน" validate={[required()]} />
      <TextInput source="status" label="สถานะ" validate={[required()]} />
    </SimpleForm>
  </Edit>
);

export const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="room_name" label="ชื่อห้อง" validate={[required()]} />
      <TextInput source="location" label="ที่ตั้ง" validate={[required()]} />
      <NumberInput source="size" label="ขนาด (ตร.ม.)" validate={[required()]} />
      <NumberInput source="monthly_rent" label="ราคาเช่าต่อเดือน" validate={[required()]} />
      <TextInput source="status" label="สถานะ" validate={[required()]} />
    </SimpleForm>
  </Create>
);
