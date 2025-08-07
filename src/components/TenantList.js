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
      <TextInput 
        source="full_name" 
        label="ชื่อ-นามสกุล" 
        validate={[required()]} 
        helperText="กรุณากรอกชื่อและนามสกุลของผู้เช่า เช่น สมชาย ใจดี"
      />
      <TextInput 
        source="phone" 
        label="เบอร์โทร" 
        validate={[required()]} 
        helperText="กรุณากรอกเบอร์โทรศัพท์ เช่น 081-234-5678 หรือ 0812345678"
      />
      <TextInput 
        source="email" 
        label="อีเมล" 
        helperText="กรุณากรอกอีเมลที่ใช้งานได้ เช่น somchai@example.com"
      />
      <TextInput 
        source="address" 
        label="ที่อยู่" 
        validate={[required()]} 
        helperText="กรุณากรอกที่อยู่ปัจจุบัน เช่น 123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110"
      />
    </SimpleForm>
  </Edit>
);

export const TenantCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput 
        source="full_name" 
        label="ชื่อ-นามสกุล" 
        validate={[required()]} 
        helperText="กรุณากรอกชื่อและนามสกุลของผู้เช่า เช่น สมชาย ใจดี"
      />
      <TextInput 
        source="phone" 
        label="เบอร์โทร" 
        validate={[required()]} 
        helperText="กรุณากรอกเบอร์โทรศัพท์ เช่น 081-234-5678 หรือ 0812345678"
      />
      <TextInput 
        source="email" 
        label="อีเมล" 
        validate={[required()]} 
        helperText="กรุณากรอกอีเมลที่ใช้งานได้ เช่น somchai@example.com"
      />
      <TextInput 
        source="address" 
        label="ที่อยู่" 
        validate={[required()]} 
        helperText="กรุณากรอกที่อยู่ปัจจุบัน เช่น 123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110"
      />
    </SimpleForm>
  </Create>
);
