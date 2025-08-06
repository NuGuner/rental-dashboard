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
  usePermissions,
  useRecordContext,
} from 'react-admin';
import {
  Box,
  Chip,
  Typography,
  Card,
  CardContent,
  Fade,
  IconButton,
  Avatar
} from '@mui/material';
import {
  Description as ContractIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { PermissionGate } from './RoleBasedAccess';

const ModernListActions = ({ record, basePath }) => {
  const { permissions } = usePermissions();
  
  return (
    <Box display="flex" gap={1}>
      <IconButton
        size="small"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <ViewIcon fontSize="small" />
      </IconButton>
      
      <PermissionGate action="update">
        <EditButton
          record={record}
          basePath={basePath}
          icon={<EditIcon />}
          sx={{
            background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
            color: 'white',
            minWidth: 'auto',
            width: 32,
            height: 32,
            '&:hover': {
              background: 'linear-gradient(135deg, #26d0ce 0%, #1a2980 100%)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        />
      </PermissionGate>

      <PermissionGate action="delete">
        <DeleteButton
          record={record}
          basePath={basePath}
          icon={<DeleteIcon />}
          sx={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
            color: 'white',
            minWidth: 'auto',
            width: 32,
            height: 32,
            '&:hover': {
              background: 'linear-gradient(135deg, #ff5252 0%, #d63031 100%)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        />
      </PermissionGate>
    </Box>
  );
};

const StatusChip = () => {
  const record = useRecordContext();
  if (!record) return null;
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'ใช้งาน':
        return 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
      case 'หมดอายุ':
        return 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
      case 'ระงับ':
        return 'linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  return (
    <Chip
      label={record.status || 'ไม่ระบุ'}
      size="small"
      sx={{
        background: getStatusColor(record.status),
        color: 'white',
        fontWeight: 600,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    />
  );
};

const ContractIdField = () => {
  const record = useRecordContext();
  if (!record) return null;
  
  return (
    <Box display="flex" alignItems="center">
      <Avatar
        sx={{
          width: 32,
          height: 32,
          mr: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontSize: '0.875rem'
        }}
      >
        <ContractIcon fontSize="small" />
      </Avatar>
      <Box>
        <Typography variant="subtitle2" fontWeight="600">
          #{record.id}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          สัญญาเช่า
        </Typography>
      </Box>
    </Box>
  );
};

export const ContractList = () => (
  <div>
    <Fade in timeout={800}>
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                mr: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              <ContractIcon />
            </Avatar>
            <Box flex={1}>
              <Typography 
                variant="h5" 
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                จัดการสัญญาเช่า
              </Typography>
              <Typography variant="body2" color="text.secondary">
                รายการสัญญาเช่าและข้อมูลที่เกี่ยวข้อง
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>

    <List
      sx={{
        '& .RaList-content': {
          background: 'transparent',
          boxShadow: 'none',
        },
        '& .MuiToolbar-root': {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '16px 16px 0 0',
          '& .MuiInputBase-root': {
            color: 'white',
            '&::before, &::after': {
              borderColor: 'rgba(255,255,255,0.5)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255,255,255,0.8)',
          },
        },
      }}
    >
      <Datagrid
        rowClick="show"
        sx={{
          '& .MuiTableContainer-root': {
            borderRadius: 2,
            overflow: 'hidden',
          },
          '& .MuiTableRow-root': {
            '&:hover': {
              backgroundColor: 'rgba(102, 126, 234, 0.04)',
              transform: 'scale(1.001)',
              transition: 'all 0.2s ease',
            },
          },
          '& .MuiTableCell-root': {
            borderBottom: '1px solid rgba(224, 224, 224, 0.3)',
            padding: '16px',
          },
        }}
      >
        <ContractIdField source="id" label="รหัสสัญญา" />
        <ReferenceField source="room_id" reference="rooms" label="ห้อง">
          <TextField 
            source="room_name"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
            }}
          />
        </ReferenceField>
        <ReferenceField source="tenant_id" reference="tenants" label="ผู้เช่า">
          <TextField 
            source="full_name"
            sx={{
              fontWeight: 600,
              color: 'secondary.main',
            }}
          />
        </ReferenceField>
        <ReferenceField source="landlord_id" reference="landlords" label="เจ้าของ">
          <TextField source="full_name" />
        </ReferenceField>
        <DateField 
          source="start_date" 
          label="วันที่เริ่มสัญญา"
          locales="th-TH"
          options={{
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }}
        />
        <DateField 
          source="end_date" 
          label="วันหมดสัญญา"
          locales="th-TH"
          options={{
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }}
          sx={{
            fontWeight: 600,
            color: 'warning.main',
          }}
        />
        <NumberField 
          source="contract_duration" 
          label="อายุสัญญา (เดือน)"
          sx={{
            fontWeight: 600,
          }}
        />
        <StatusChip source="status" label="สถานะสัญญา" />
        <ModernListActions />
      </Datagrid>
    </List>
  </div>
);

const ModernFormCard = ({ children, title, subtitle }) => (
  <Fade in timeout={800}>
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Box mb={4}>
          <Typography 
            variant="h5" 
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  </Fade>
);

export const ContractEdit = () => (
  <Edit>
    <ModernFormCard
      title="แก้ไขสัญญาเช่า"
      subtitle="อัปเดตข้อมูลสัญญาเช่าและรายละเอียดที่เกี่ยวข้อง"
    >
      <SimpleForm
        sx={{
          '& .MuiFormControl-root': {
            mb: 3,
          },
        }}
      >
        <ReferenceInput source="room_id" reference="rooms" label="ห้อง">
          <SelectInput 
            optionText="room_name"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </ReferenceInput>
        <ReferenceInput source="tenant_id" reference="tenants" label="ผู้เช่า">
          <SelectInput 
            optionText="full_name"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </ReferenceInput>
        <ReferenceInput source="landlord_id" reference="landlords" label="เจ้าของ">
          <SelectInput 
            optionText="full_name"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </ReferenceInput>
        <DateInput 
          source="start_date" 
          label="วันที่เริ่มสัญญา" 
          validate={[required()]}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <DateInput 
          source="end_date" 
          label="วันหมดสัญญา" 
          validate={[required()]}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <NumberInput 
          source="contract_duration" 
          label="อายุสัญญา (เดือน)" 
          validate={[required()]}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <TextInput 
          source="status" 
          label="สถานะสัญญา" 
          validate={[required()]}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      </SimpleForm>
    </ModernFormCard>
  </Edit>
);

export const ContractCreate = () => (
  <Create>
    <ModernFormCard
      title="สร้างสัญญาเช่าใหม่"
      subtitle="เพิ่มสัญญาเช่าใหม่พร้อมรายละเอียดครบถ้วน"
    >
      <SimpleForm
        sx={{
          '& .MuiFormControl-root': {
            mb: 3,
          },
        }}
      >
        <ReferenceInput source="room_id" reference="rooms" label="ห้อง">
          <SelectInput 
            optionText="room_name"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </ReferenceInput>
        <ReferenceInput source="tenant_id" reference="tenants" label="ผู้เช่า">
          <SelectInput 
            optionText="full_name"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </ReferenceInput>
        <ReferenceInput source="landlord_id" reference="landlords" label="เจ้าของ">
          <SelectInput 
            optionText="full_name"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </ReferenceInput>
        <DateInput 
          source="start_date" 
          label="วันที่เริ่มสัญญา" 
          validate={[required()]}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <DateInput 
          source="end_date" 
          label="วันหมดสัญญา" 
          validate={[required()]}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <NumberInput 
          source="contract_duration" 
          label="อายุสัญญา (เดือน)" 
          validate={[required()]}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <TextInput 
          source="status" 
          label="สถานะสัญญา" 
          validate={[required()]}
          defaultValue="ใช้งาน"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      </SimpleForm>
    </ModernFormCard>
  </Create>
);
