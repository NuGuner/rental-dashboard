// src/components/RoomList.js
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
} from 'react-admin';

export const RoomList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="ชื่อห้อง" />
      <TextField source="location" label="ที่ตั้ง" />
      <NumberField source="size" label="ขนาด (ตร.ม.)" />
      <NumberField source="price" label="ราคาเช่าต่อเดือน" />
      <TextField source="status" label="สถานะ" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="ชื่อห้อง" />
      <TextInput source="location" label="ที่ตั้ง" />
      <NumberInput source="size" label="ขนาด (ตร.ม.)" />
      <NumberInput source="price" label="ราคาเช่าต่อเดือน" />
      <TextInput source="status" label="สถานะ" />
    </SimpleForm>
  </Edit>
);

export const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="ชื่อห้อง" />
      <TextInput source="location" label="ที่ตั้ง" />
      <NumberInput source="size" label="ขนาด (ตร.ม.)" />
      <NumberInput source="price" label="ราคาเช่าต่อเดือน" />
      <TextInput source="status" label="สถานะ" />
    </SimpleForm>
  </Create>
);
