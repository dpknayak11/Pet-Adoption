import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import petReducer from '../features/pets/petSlice';
import adoptionReducer from '../features/adoptions/adoptionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petReducer,
    adoptions: adoptionReducer,
  },
});

export default store;
