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
  SelectInput,
  required,
} from 'react-admin';

// Custom Status Field Component
const StatusField = ({ record }) => {
  const statusMap = {
    'available': 'ว่าง',
    'rented': 'เช่าแล้ว',
    'maintenance': 'กำลังซ่อม'
  };
  
  return <span>{statusMap[record.status] || record.status}</span>;
};

export const RoomList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="รหัสห้อง" />
      <TextField source="room_name" label="ชื่อห้อง" />
      <TextField source="location" label="ที่ตั้ง" />
      <NumberField source="size" label="ขนาด (ตร.ม.)" />
      <NumberField source="monthly_rent" label="ราคาเช่าต่อเดือน" />
      <StatusField source="status" label="สถานะ" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput 
        source="room_name" 
        label="ชื่อห้อง" 
        validate={[required()]} 
        helperText="กรุณากรอกชื่อห้อง เช่น ห้อง 101 หรือ Studio A"
      />
      <TextInput 
        source="location" 
        label="ที่ตั้ง" 
        validate={[required()]} 
        helperText="กรุณากรอกที่ตั้งของห้อง เช่น ชั้น 1 อาคาร A หรือ 123 ถนนสุขุมวิท"
      />
      <NumberInput 
        source="size" 
        label="ขนาด (ตร.ม.)" 
        validate={[required()]} 
        helperText="กรุณากรอกขนาดห้องเป็นตารางเมตร เช่น 25 หรือ 30.5"
      />
      <NumberInput 
        source="monthly_rent" 
        label="ราคาเช่าต่อเดือน" 
        validate={[required()]} 
        helperText="กรุณากรอกราคาเช่าต่อเดือน เช่น 8000 หรือ 12000"
      />
      <SelectInput 
        source="status" 
        label="สถานะ" 
        validate={[required()]} 
        choices={[
          { id: 'available', name: 'Available' },
          { id: 'rented', name: 'Rented' },
          { id: 'maintenance', name: 'Maintenance' },
        ]}
        helperText="เลือกสถานะของห้อง"
      />
    </SimpleForm>
  </Edit>
);

export const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput 
        source="room_name" 
        label="ชื่อห้อง" 
        validate={[required()]} 
        helperText="กรุณากรอกชื่อห้อง เช่น ห้อง 101 หรือ Studio A"
      />
      <TextInput 
        source="location" 
        label="ที่ตั้ง" 
        validate={[required()]} 
        helperText="กรุณากรอกที่ตั้งของห้อง เช่น ชั้น 1 อาคาร A หรือ 123 ถนนสุขุมวิท"
      />
      <NumberInput 
        source="size" 
        label="ขนาด (ตร.ม.)" 
        validate={[required()]} 
        helperText="กรุณากรอกขนาดห้องเป็นตารางเมตร เช่น 25 หรือ 30.5"
      />
      <NumberInput 
        source="monthly_rent" 
        label="ราคาเช่าต่อเดือน" 
        validate={[required()]} 
        helperText="กรุณากรอกราคาเช่าต่อเดือน เช่น 8000 หรือ 12000"
      />
      <SelectInput 
        source="status" 
        label="สถานะ" 
        validate={[required()]} 
        choices={[
          { id: 'available', name: 'Available' },
          { id: 'rented', name: 'Rented' },
          { id: 'maintenance', name: 'Maintenance' },
        ]}
        defaultValue="available"
        helperText="เลือกสถานะของห้อง"
      />
    </SimpleForm>
  </Create>
);
