import { lazy, Suspense } from 'react';
import { ConfigProvider, Layout, Skeleton } from 'antd';
import Navbar from './components/Navbar';
import DoctorOverview from './components/DoctorOverview';
import AppointmentList from './components/AppointmentList';
import './App.css';

// DatePicker + TimePicker are heavy — load them only after critical content paints
const AddAppointmentForm = lazy(() => import('./components/AddAppointmentForm'));

const { Content } = Layout;

const FormSkeleton = (
  <div style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
    <Skeleton active paragraph={{ rows: 3 }} />
  </div>
);

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <Navbar />
        <Content style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '28px 20px' }}>
          <DoctorOverview />
          <Suspense fallback={FormSkeleton}>
            <AddAppointmentForm />
          </Suspense>
          <AppointmentList />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
