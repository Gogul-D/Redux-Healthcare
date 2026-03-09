import { useSelector } from 'react-redux';
import { Card, Row, Col, Statistic, Tag, Avatar, Space, Typography } from 'antd';
import CalendarOutlined    from '@ant-design/icons/CalendarOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import TeamOutlined        from '@ant-design/icons/TeamOutlined';

const { Title } = Typography;

const SPECIALTY_META = {
  Cardiology:  { color: '#ff4d4f', icon: '❤️' },
  Neurology:   { color: '#1677ff', icon: '🧠' },
  Orthopedics: { color: '#faad14', icon: '🦴' },
};

function DoctorOverview() {
  const doctors      = useSelector((state) => state.doctor.doctors);
  const appointments = useSelector((state) => state.appointments.appointments);

  const stats = doctors.map((doctor) => {
    const total     = appointments.filter((a) => a.doctorName === doctor.name).length;
    const upcoming  = appointments.filter((a) => a.doctorName === doctor.name && a.status !== 'Completed').length;
    const completed = appointments.filter((a) => a.doctorName === doctor.name && a.status === 'Completed').length;
    return { ...doctor, total, upcoming, completed };
  });

  return (
    <Card
      title={
        <Space>
          <TeamOutlined style={{ color: '#1677ff', fontSize: 16 }} />
          <span style={{ fontWeight: 600 }}>Doctor Overview</span>
        </Space>
      }
      style={{ marginBottom: 24, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
      styles={{ header: { borderBottom: '1px solid #f0f0f0', padding: '14px 24px' } }}
    >
      <Row gutter={[16, 16]}>
        {stats.map((doctor) => {
          const meta  = SPECIALTY_META[doctor.specialty] || { color: '#888', icon: '👨‍⚕️' };
          return (
            <Col key={doctor.id} xs={24} sm={24} md={8}>
              <Card
                style={{
                  borderRadius: 10,
                  borderTop: `4px solid ${meta.color}`,
                  background: '#fafafa',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
                }}
                styles={{ body: { padding: '18px 20px' } }}
              >
                <Space align="center" style={{ marginBottom: 16 }}>
                  <Avatar
                    size={46}
                    style={{ background: meta.color, fontSize: 22, lineHeight: '46px' }}
                  >
                    {meta.icon}
                  </Avatar>
                  <div>
                    <Title level={5} style={{ margin: 0 }}>{doctor.name}</Title>
                    <Tag color={meta.color} style={{ marginTop: 4, borderRadius: 20 }}>
                      {doctor.specialty}
                    </Tag>
                  </div>
                </Space>

                <Row gutter={8}>
                  <Col span={8}>
                    <Statistic
                      title="Total"
                      value={doctor.total}
                      valueStyle={{ fontSize: 22, color: '#1677ff' }}
                      prefix={<CalendarOutlined style={{ fontSize: 13 }} />}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Upcoming"
                      value={doctor.upcoming}
                      valueStyle={{ fontSize: 22, color: '#faad14' }}
                      prefix={<ClockCircleOutlined style={{ fontSize: 13 }} />}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Done"
                      value={doctor.completed}
                      valueStyle={{ fontSize: 22, color: '#52c41a' }}
                      prefix={<CheckCircleOutlined style={{ fontSize: 13 }} />}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
}

export default DoctorOverview;
