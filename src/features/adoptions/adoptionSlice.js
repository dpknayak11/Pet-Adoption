import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adoptionsAPI } from '../../services/api';

// Async Thunks
export const applyAdoption = createAsyncThunk(
  'adoptions/applyAdoption',
  async (petId, { rejectWithValue }) => {
    try {
      const response = await adoptionsAPI.applyAdoption(petId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to apply for adoption');
    }
  }
);

export const getMyApplications = createAsyncThunk(
  'adoptions/getMyApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adoptionsAPI.getMyApplications();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch applications');
    }
  }
);

export const getAllApplications = createAsyncThunk(
  'adoptions/getAllApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adoptionsAPI.getAllApplications();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all applications');
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  'adoptions/updateApplicationStatus',
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const response = await adoptionsAPI.updateApplicationStatus(applicationId, status);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update application status');
    }
  }
);

// Initial State
const initialState = {
  myApplications: [],
  allApplications: [],
  loading: false,
  error: null,
  successMessage: null,
};

// Slice
const adoptionSlice = createSlice({
  name: 'adoptions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Apply Adoption
    builder
      .addCase(applyAdoption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyAdoption.fulfilled, (state, action) => {
        state.loading = false;
        state.myApplications.push(action.payload);
        state.successMessage = 'Application submitted successfully';
      })
      .addCase(applyAdoption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get My Applications
    builder
      .addCase(getMyApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.myApplications = action.payload;
      })
      .addCase(getMyApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get All Applications
    builder
      .addCase(getAllApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.allApplications = action.payload;
      })
      .addCase(getAllApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Application Status
    builder
      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Update in myApplications
        const myAppIndex = state.myApplications.findIndex(
          (app) => app._id === action.payload._id
        );
        if (myAppIndex !== -1) {
          state.myApplications[myAppIndex] = action.payload;
        }
        // Update in allApplications
        const allAppIndex = state.allApplications.findIndex(
          (app) => app._id === action.payload._id
        );
        if (allAppIndex !== -1) {
          state.allApplications[allAppIndex] = action.payload;
        }
        state.successMessage = 'Application status updated';
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccessMessage } = adoptionSlice.actions;
export default adoptionSlice.reducer;
