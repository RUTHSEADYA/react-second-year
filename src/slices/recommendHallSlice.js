




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddRecommendHall, DeleteRecommendHall, GetRecommendHalls } from '../services/recommendHallsService';

const initialState = {
  recommendations: [],
  loading: false,
  error: '',
};

export const getRecommendHalls = createAsyncThunk(
  'hallRecommendations/getRecommendations',
  async (hallId) => {
    try {
      const recommendationData = await GetRecommendHalls(hallId);
      return { hallId, recommendations: recommendationData };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);



export const addRecommendHall = createAsyncThunk(
  'hallRecommendations/addRecommendations',
  async ({ hallId, recommend }) => {
    try {
      const recommendationData = await AddRecommendHall(hallId, recommend);
      return { hallId, recommendations: recommendationData };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteRecommendHall = createAsyncThunk('flowers/deleteRecommendHall', async (id) => {
  try {
    const deleteData = await DeleteRecommendHall(id);
    return deleteData;
  }

  catch (error) {
    throw new Error(error.message);
  }
})

const hallRecommendationsSlice = createSlice({
  name: 'hallRecommendations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendHalls.pending, (state) => {
        state.loading = true;
      })
      builder
      .addCase(getRecommendHalls.fulfilled, (state, action) => {
        const { hallId, recommendations } = action.payload;
        state.recommendations[hallId] = recommendations;
        state.loading = false;
      })
    
      .addCase(getRecommendHalls.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(addRecommendHall.pending, (state) => {
        state.loading = true;
      })
      
      .addCase(addRecommendHall.fulfilled, (state, action) => {
        const { hallId, recommendations } = action.payload;
        if (!state.recommendations[hallId]) {
          state.recommendations[hallId] = [];
        }
        state.recommendations[hallId].push(recommendations);
        state.loading = false;
        alert("תגובתך התקבלה בהצלחה")
      })
      
      .addCase(addRecommendHall.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(deleteRecommendHall.pending, (state) => {
        state.loading = true;
      })
   
      .addCase(deleteRecommendHall.fulfilled, (state, action) => {
        state.recommendations = state.recommendations.filter(
          (recommendation) => recommendation.id !== action.payload
        );
        state.loading = false;
      })
    
      .addCase(deleteRecommendHall.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

  },
});

export default hallRecommendationsSlice.reducer;