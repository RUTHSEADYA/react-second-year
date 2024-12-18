


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddCatering, DeleteCatering, GetCatering, UpdateCatering } from '../services/CateringService';

const initialState = {
  catering: [],
  loading: false,
  error: '',
};

export const getCatering = createAsyncThunk('catering/getCatering ', async () => {
  try {
    const cateringData = await GetCatering();
    return cateringData;
  } catch (error) {
    throw new Error(error.message);
  }
});



export const addCateringWithImage = createAsyncThunk(
  'catering /addCatering WithImage',
  async ({ cateringData, imageFile }, { rejectWithValue }) => {
    try {
      const response = await AddCatering(cateringData, imageFile);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCatering = createAsyncThunk('catering /deleteCatering ', async (id) => {
  try {
    const deleteData = await DeleteCatering(id);
    return deleteData;
  }

  catch (error) {
    throw new Error(error.message);
  }
})

export const updateCatering = createAsyncThunk(
  "catering/updateCatering ",
  async ({ cateringData, imageFile, id }) => {
    try {
      const response = await UpdateCatering(cateringData, imageFile, id);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);






const cateringSlice = createSlice({
  name: 'catering',
  initialState,
  reducers: {
    setSelectedCateringId(state, action) {
      state.selectedCateringId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatering.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getCatering.fulfilled, (state, action) => {
        state.catering = action.payload;
        state.loading = false;
      })
      .addCase(getCatering.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addCateringWithImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCateringWithImage.fulfilled, (state, action) => {
        state.catering.push(action.payload);
        state.loading = false;
      })
      .addCase(addCateringWithImage.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(deleteCatering.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCatering.fulfilled, (state, action) => {
        state.catering = state.catering.filter(c => c.id !== action.payload); 
               state.loading = false;
      })
      .addCase(deleteCatering.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(updateCatering.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCatering.fulfilled, (state, action) => {
        const { id, catering } = action.payload; // ודא ששם השדה תואם לנתונים המוחזרים
        state.catering = state.catering.map((c) =>
          c.id === id ? catering : c
        );
        state.loading = false;
      })
      
      .addCase(updateCatering.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      

  },
});

export const { setSelectedCateringId } = cateringSlice.actions;
export default cateringSlice.reducer;