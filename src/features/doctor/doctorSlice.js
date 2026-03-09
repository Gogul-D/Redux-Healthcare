import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctors: [
    { id: 1, name: 'Dr. Smith', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Patel', specialty: 'Neurology' },
    { id: 3, name: 'Dr. Nguyen', specialty: 'Orthopedics' },
  ],
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {},
});

export default doctorSlice.reducer;
