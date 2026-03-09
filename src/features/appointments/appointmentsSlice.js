import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [
    {
      id: 1,
      patientName: 'Alice Johnson',
      doctorName: 'Dr. Smith',
      date: '2026-03-12',
      time: '09:00',
      status: 'Confirmed',
    },
    {
      id: 2,
      patientName: 'Bob Williams',
      doctorName: 'Dr. Patel',
      date: '2026-03-13',
      time: '11:30',
      status: 'Pending',
    },
    {
      id: 3,
      patientName: 'Carol Davis',
      doctorName: 'Dr. Smith',
      date: '2026-03-14',
      time: '14:00',
      status: 'Completed',
    },
    {
      id: 4,
      patientName: 'David Lee',
      doctorName: 'Dr. Nguyen',
      date: '2026-03-15',
      time: '10:00',
      status: 'Pending',
    },
  ],
  nextId: 5,
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push({ ...action.payload, id: state.nextId });
      state.nextId += 1;
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const appointment = state.appointments.find((a) => a.id === id);
      if (appointment) appointment.status = status;
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(
        (a) => a.id !== action.payload
      );
    },
  },
});

export const { addAppointment, updateStatus, deleteAppointment } =
  appointmentsSlice.actions;

export default appointmentsSlice.reducer;
