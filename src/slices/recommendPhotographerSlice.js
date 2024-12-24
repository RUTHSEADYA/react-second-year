




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddRecommendPhotographer, DeleteRecommendPhotographer, GetRecommendPhotographer } from '../services/recommendPhotographerService';

const initialState = {
  recommendations: [],
  loading: false,
  error: '',
};

export const getRecommendPhotographer = createAsyncThunk(
  'photographerRecommendations/getRecommendations',
  async (photographerId) => {
    try {
      const recommendationData = await GetRecommendPhotographer(photographerId);
      return { photographerId, recommendations: recommendationData };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);



export const addRecommendPhotographer = createAsyncThunk(
  'photographerRecommendations/addRecommendations',
  async ({ photographerId, recommend }) => {
    try {
      const recommendationData = await AddRecommendPhotographer(photographerId, recommend);
      return { photographerId, recommendations: recommendationData };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteRecommendPhotographer = createAsyncThunk('photographer/deleteRecommendPhotographer', async (id) => {
  try {
    const deleteData = await DeleteRecommendPhotographer(id);
    return deleteData;
  }

  catch (error) {
    throw new Error(error.message);
  }
})

const photographerRecommendationsSlice = createSlice({
  name: 'photographerRecommendations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendPhotographer.pending, (state) => {
        state.loading = true;
      })
      builder
      .addCase(getRecommendPhotographer.fulfilled, (state, action) => {
        const { photographerId, recommendations } = action.payload;
        state.recommendations[photographerId] = recommendations;
        state.loading = false;
      })
    
      .addCase(getRecommendPhotographer.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(addRecommendPhotographer.pending, (state) => {
        state.loading = true;
      })
      
      .addCase(addRecommendPhotographer.fulfilled, (state, action) => {
        const { photographerId, recommendations } = action.payload;
        if (!state.recommendations[photographerId]) {
          state.recommendations[photographerId] = [];
        }
        state.recommendations[photographerId].push(recommendations);
        state.loading = false;
        alert("תגובתך התקבלה בהצלחה")
      })
      
      .addCase(addRecommendPhotographer.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(deleteRecommendPhotographer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRecommendPhotographer.fulfilled, (state, action) => {
        state.recommendations = state.recommendations.filter(recommend => recommend.id !== action.payload); 
               state.loading = false;
      })
      .addCase(deleteRecommendPhotographer.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

  },
});

export default photographerRecommendationsSlice.reducer;