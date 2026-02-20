import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { petsAPI } from '../../services/api';

// Async Thunks
export const fetchPets = createAsyncThunk(
  'pets/fetchPets',
  async ({ page = 1, search = '', species = '', limit = 12 }, { rejectWithValue }) => {
    try {
      const response = await petsAPI.getAllPets(page, search, species, limit);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pets');
    }
  }
);

export const fetchSinglePet = createAsyncThunk(
  'pets/fetchSinglePet',
  async (id, { rejectWithValue }) => {
    try {
      const response = await petsAPI.getPetById(id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pet details');
    }
  }
);

export const addPet = createAsyncThunk(
  'pets/addPet',
  async (petData, { rejectWithValue }) => {
    try {
      const response = await petsAPI.addPet(petData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add pet');
    }
  }
);

export const updatePet = createAsyncThunk(
  'pets/updatePet',
  async ({ id, petData }, { rejectWithValue }) => {
    try {
      const response = await petsAPI.updatePet(id, petData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update pet');
    }
  }
);

export const deletePet = createAsyncThunk(
  'pets/deletePet',
  async (id, { rejectWithValue }) => {
    try {
      await petsAPI.deletePet(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete pet');
    }
  }
);

// Initial State
const initialState = {
  pets: [],
  singlePet: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalPets: 0,
  },
};

// Slice
const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSinglePet: (state) => {
      state.singlePet = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Pets
    builder
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload.pets;
        state.pagination = {
          currentPage: action.payload.pagination.currentPage,
          totalPages: action.payload.pagination.totalPages,
          totalPets: action.payload.pagination.totalPets,
        };
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Single Pet
    builder
      .addCase(fetchSinglePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSinglePet.fulfilled, (state, action) => {
        state.loading = false;
        state.singlePet = action.payload;
      })
      .addCase(fetchSinglePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Pet
    builder
      .addCase(addPet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets.push(action.payload);
      })
      .addCase(addPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Pet
    builder
      .addCase(updatePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.pets.findIndex((pet) => pet._id === action.payload._id);
        if (index !== -1) {
          state.pets[index] = action.payload;
        }
        if (state.singlePet && state.singlePet._id === action.payload._id) {
          state.singlePet = action.payload;
        }
      })
      .addCase(updatePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Pet
    builder
      .addCase(deletePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = state.pets.filter((pet) => pet._id !== action.payload);
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSinglePet } = petSlice.actions;
export default petSlice.reducer;
