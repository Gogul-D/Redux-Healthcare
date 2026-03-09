import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from '../features/appointments/appointmentsSlice';
import doctorReducer from '../features/doctor/doctorSlice';

const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    doctor: doctorReducer,
  },
});

export default store;
