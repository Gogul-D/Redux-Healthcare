import { Layout, Space, Typography, Tag } from 'antd';
import MedicineBoxOutlined from '@ant-design/icons/MedicineBoxOutlined';

const { Header } = Layout;
const { Title, Text } = Typography;

function Navbar() {
  return (
    <Header
      style={{
        background: 'linear-gradient(135deg, #1677ff 0%, #0747a6 100%)',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
        height: 64,
      }}
    >
      <Space align="center" size={12}>
        <MedicineBoxOutlined style={{ fontSize: 28, color: '#fff' }} />
        <Title level={4} style={{ color: '#fff', margin: 0, letterSpacing: 0.4 }}>
          HealthCare Manager
        </Title>
      </Space>
      <Tag
        color="rgba(255,255,255,0.15)"
        style={{
          color: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: 20,
          padding: '2px 14px',
          fontSize: 12,
        }}
      >
        Patient Appointment System
      </Tag>
    </Header>
  );
}

export default Navbar;
