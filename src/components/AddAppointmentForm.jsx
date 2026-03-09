import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from '../features/appointments/appointmentsSlice';
import {
  Card, Form, Input, Select, DatePicker, TimePicker,
  Button, Row, Col, Space,
} from 'antd';
import UserAddOutlined from '@ant-design/icons/UserAddOutlined';
import PlusOutlined    from '@ant-design/icons/PlusOutlined';
import ClearOutlined   from '@ant-design/icons/ClearOutlined';

const STATUS_OPTIONS = [
  { value: 'Pending',   label: 'Pending' },
  { value: 'Confirmed', label: 'Confirmed' },
  { value: 'Completed', label: 'Completed' },
];

function AddAppointmentForm() {
  const dispatch = useDispatch();
  const doctors  = useSelector((state) => state.doctor.doctors);
  const [form]   = Form.useForm();

  const handleFinish = (values) => {
    dispatch(
      addAppointment({
        patientName: values.patientName,
        doctorName:  values.doctorName,
        date:        values.date.format('YYYY-MM-DD'),
        time:        values.time.format('HH:mm'),
        status:      values.status,
      })
    );
    form.resetFields();
  };

  return (
    <Card
      title={
        <Space>
          <UserAddOutlined style={{ color: '#52c41a', fontSize: 16 }} />
          <span style={{ fontWeight: 600 }}>Add New Appointment</span>
        </Space>
      }
      style={{ marginBottom: 24, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
      styles={{ header: { borderBottom: '1px solid #f0f0f0', padding: '14px 24px' } }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ status: 'Pending' }}
        requiredMark="optional"
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="patientName"
              label="Patient Name"
              rules={[{ required: true, message: 'Patient name is required' }]}
            >
              <Input
                size="large"
                placeholder="Enter patient full name"
                prefix={<UserAddOutlined style={{ color: '#bbb' }} />}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="doctorName"
              label="Doctor"
              rules={[{ required: true, message: 'Please select a doctor' }]}
            >
              <Select
                size="large"
                placeholder="Select a doctor"
                options={doctors.map((doc) => ({
                  value: doc.name,
                  label: `${doc.name} — ${doc.specialty}`,
                }))}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Date is required' }]}
            >
              <DatePicker size="large" style={{ width: '100%' }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="time"
              label="Time"
              rules={[{ required: true, message: 'Time is required' }]}
            >
              <TimePicker size="large" style={{ width: '100%' }} format="HH:mm" minuteStep={15} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item name="status" label="Status">
              <Select size="large" options={STATUS_OPTIONS} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginBottom: 0, marginTop: 4 }}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              icon={<PlusOutlined />}
              style={{ background: '#52c41a', borderColor: '#52c41a' }}
            >
              Add Appointment
            </Button>
            <Button
              size="large"
              icon={<ClearOutlined />}
              onClick={() => form.resetFields()}
            >
              Clear
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AddAppointmentForm;
