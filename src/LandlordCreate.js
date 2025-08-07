import { Create, SimpleForm, TextInput } from 'react-admin';

const LandlordCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput 
        source="full_name" 
        label="ชื่อ-นามสกุล" 
        helperText="กรุณากรอกชื่อและนามสกุลของเจ้าของ เช่น สมหญิง รักดี"
      />
      <TextInput 
        source="email" 
        label="อีเมล" 
        helperText="กรุณากรอกอีเมลที่ใช้งานได้ เช่น somying@example.com"
      />
      <TextInput 
        source="phone" 
        label="เบอร์โทร" 
        helperText="กรุณากรอกเบอร์โทรศัพท์ เช่น 081-234-5678 หรือ 0812345678"
      />
    </SimpleForm>
  </Create>
);

export default LandlordCreate;
