import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus, deleteAppointment } from '../features/appointments/appointmentsSlice';
import {
  Card, Table, Tag, Select, Button, Popconfirm,
  Space, Badge, Typography, Segmented,
} from 'antd';
import DeleteOutlined   from '@ant-design/icons/DeleteOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';

const { Text } = Typography;

const STATUS_COLOR = { Pending: 'gold', Confirmed: 'blue', Completed: 'green' };

const STATUS_OPTIONS = [
  { value: 'Pending',   label: 'Pending' },
  { value: 'Confirmed', label: 'Confirmed' },
  { value: 'Completed', label: 'Completed' },
];

const FILTER_OPTIONS = ['All', 'Pending', 'Confirmed', 'Completed'];

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

function AppointmentList() {
  const dispatch     = useDispatch();
  const appointments = useSelector((state) => state.appointments.appointments);
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered =
    filterStatus === 'All'
      ? appointments
      : appointments.filter((a) => a.status === filterStatus);

  const columns = [
    {
      title: '#',
      key: 'index',
      width: 52,
      render: (_, __, index) => (
        <Text type="secondary" style={{ fontSize: 13 }}>{index + 1}</Text>
      ),
    },
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
      key: 'patientName',
      render: (name) => <Text strong>{name}</Text>,
    },
    {
      title: 'Doctor',
      dataIndex: 'doctorName',
      key: 'doctorName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: formatDate,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
          color={STATUS_COLOR[status]}
          style={{ borderRadius: 20, padding: '2px 12px', fontWeight: 500 }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size={8}>
          <Select
            value={record.status}
            size="small"
            style={{ width: 126 }}
            options={STATUS_OPTIONS}
            onChange={(value) => dispatch(updateStatus({ id: record.id, status: value }))}
          />
          <Popconfirm
            title="Delete this appointment?"
            description="This action cannot be undone."
            onConfirm={() => dispatch(deleteAppointment(record.id))}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={
        <Space>
          <CalendarOutlined style={{ color: '#1677ff', fontSize: 16 }} />
          <span style={{ fontWeight: 600 }}>Appointments</span>
          <Badge count={filtered.length} color="#1677ff" />
        </Space>
      }
      extra={
        <Segmented
          value={filterStatus}
          onChange={setFilterStatus}
          options={FILTER_OPTIONS}
          size="small"
        />
      }
      style={{ borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
      styles={{ header: { borderBottom: '1px solid #f0f0f0', padding: '14px 24px' } }}
    >
      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        size="middle"
        pagination={{ pageSize: 8, size: 'small', hideOnSinglePage: true }}
        locale={{ emptyText: 'No appointments found.' }}
      />
    </Card>
  );
}

export default AppointmentList;
