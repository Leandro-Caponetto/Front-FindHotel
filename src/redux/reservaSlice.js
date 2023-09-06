import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step1: {
    User_id:'64e825d14bd146895d387ed4',
    firstName: '',

    lastName: '',
    correo: '',
    guest: '',
  },
  step2: {
    Hotel_id: "",
    RoomType_id: '',
    address: '',
    country: '',
    checkIn: '2023-09-01',
    checkOut: '2023-09-02',
    time: '',
    quantity: 1,

  },
  step3: {
    city: '',
    postalCode: '',
    phone: '',
    aceptaTerminos: false,
  },
};

const reservaSlice = createSlice({
  name: 'reserva ',

  initialState,
  reducers: {
    updateStep1: (state, action) => {
      state.step1 = { ...state.step1, ...action.payload };
    },
    updateStep2: (state, action) => {
      console.log("updateStep2",action.payload)
      state.step2 = { ...state.step2, ...action.payload };
    },
    updateStep3: (state, action) => {
      state.step3 = { ...state.step3, ...action.payload };
    },
    resetSteps: (state) => {
      state.step1 = initialState.step1;
      state.step2 = initialState.step2;
      state.step3 = initialState.step3;
    },
  },
});

export const {
  updateStep1,
  updateStep2,
  updateStep3,
  resetSteps,
} = reservaSlice.actions;

export default reservaSlice.reducer;