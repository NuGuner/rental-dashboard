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

// Simple List Component - Responsive
export const ContractsList = () => (
  <List>
    <Datagrid 
      rowClick="edit"
      sx={{
        '& .MuiTableContainer-root': {
          overflowX: 'auto',
        },
        '& .MuiTableCell-root': {
          whiteSpace: 'nowrap',
          '&:first-of-type': {
            position: 'sticky',
            left: 0,
            backgroundColor: 'background.paper',
            zIndex: 1,
          }
        },
        '& .MuiTableRow-root:hover .MuiTableCell-root:first-of-type': {
          backgroundColor: 'action.hover',
        }
      }}
    >
      <TextField source="id" label="รหัสสัญญา" />
      <ReferenceField source="room_id" reference="rooms" label="ห้อง">
        <TextField source="room_name" />
      </ReferenceField>
      <ReferenceField source="tenant_id" reference="tenants" label="ผู้เช่า">
        <TextField source="full_name" />
      </ReferenceField>
      <ReferenceField 
        source="landlord_id" 
        reference="landlords" 
        label="เจ้าของ"
        sx={{ display: { xs: 'none', md: 'table-cell' } }}
      >
        <TextField source="full_name" />
      </ReferenceField>
      <DateField 
        source="start_date" 
        label="วันเริ่มสัญญา"
        sx={{ display: { xs: 'none', sm: 'table-cell' } }}
      />
      <DateField source="end_date" label="วันหมดสัญญา" />
      <NumberField 
        source="contract_duration" 
        label="ระยะเวลา (เดือน)"
        sx={{ display: { xs: 'none', lg: 'table-cell' } }}
      />
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
        <SelectInput 
          optionText="room_name" 
          validate={[required()]} 
          helperText="เลือกห้องที่ต้องการทำสัญญาเช่า"
        />
      </ReferenceInput>
      <ReferenceInput source="tenant_id" reference="tenants" label="ผู้เช่า">
        <SelectInput 
          optionText="full_name" 
          validate={[required()]} 
          helperText="เลือกผู้เช่าที่จะทำสัญญา"
        />
      </ReferenceInput>
      <ReferenceInput source="landlord_id" reference="landlords" label="เจ้าของ">
        <SelectInput 
          optionText="full_name" 
          validate={[required()]} 
          helperText="เลือกเจ้าของห้อง"
        />
      </ReferenceInput>
      <DateInput 
        source="start_date" 
        label="วันเริ่มสัญญา" 
        validate={[required()]} 
        helperText="เลือกวันที่เริ่มต้นสัญญาเช่า"
      />
      <DateInput 
        source="end_date" 
        label="วันหมดสัญญา" 
        validate={[required()]} 
        helperText="เลือกวันที่สิ้นสุดสัญญาเช่า"
      />
      <NumberInput 
        source="contract_duration" 
        label="ระยะเวลา (เดือน)" 
        validate={[required()]} 
        helperText="กรอกระยะเวลาสัญญาเป็นเดือน เช่น 12 หรือ 24"
      />
      <TextInput 
        source="status" 
        label="สถานะ" 
        validate={[required()]} 
        helperText="สถานะสัญญา เช่น ใช้งาน, หมดอายุ, ยกเลิก"
      />
    </SimpleForm>
  </Edit>
);

// Simple Create Component
export const ContractsCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="room_id" reference="rooms" label="ห้อง">
        <SelectInput 
          optionText="room_name" 
          validate={[required()]} 
          helperText="เลือกห้องที่ต้องการทำสัญญาเช่า"
        />
      </ReferenceInput>
      <ReferenceInput source="tenant_id" reference="tenants" label="ผู้เช่า">
        <SelectInput 
          optionText="full_name" 
          validate={[required()]} 
          helperText="เลือกผู้เช่าที่จะทำสัญญา"
        />
      </ReferenceInput>
      <ReferenceInput source="landlord_id" reference="landlords" label="เจ้าของ">
        <SelectInput 
          optionText="full_name" 
          validate={[required()]} 
          helperText="เลือกเจ้าของห้อง"
        />
      </ReferenceInput>
      <DateInput 
        source="start_date" 
        label="วันเริ่มสัญญา" 
        validate={[required()]} 
        helperText="เลือกวันที่เริ่มต้นสัญญาเช่า"
      />
      <DateInput 
        source="end_date" 
        label="วันหมดสัญญา" 
        validate={[required()]} 
        helperText="เลือกวันที่สิ้นสุดสัญญาเช่า"
      />
      <NumberInput 
        source="contract_duration" 
        label="ระยะเวลา (เดือน)" 
        validate={[required()]} 
        helperText="กรอกระยะเวลาสัญญาเป็นเดือน เช่น 12 หรือ 24"
      />
      <TextInput 
        source="status" 
        label="สถานะ" 
        defaultValue="ใช้งาน" 
        validate={[required()]} 
        helperText="สถานะสัญญา เช่น ใช้งาน, หมดอายุ, ยกเลิก"
      />
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