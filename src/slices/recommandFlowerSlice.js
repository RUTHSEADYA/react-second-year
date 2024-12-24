




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {AddRecommendFlowers, DeleteRecommendFlower, GetRecommendFlowers } from '../services/recommandFlowersService';

const initialState = {
  recommendations: [],
  loading: false,
  error: '',
};

export const getRecommendFlowers = createAsyncThunk(
  'flowerRecommendations/getRecommendations',
  async (flowerId) => {
    try {
      const recommendationData = await GetRecommendFlowers(flowerId);
      return { flowerId, recommendations: recommendationData };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);



export const addRecommendFlowers = createAsyncThunk(
  'flowerRecommendations/addRecommendations',
  async ({ flowerId, recommend }) => {
    try {
      const recommendationData = await AddRecommendFlowers(flowerId, recommend);
      return { flowerId, recommendations: recommendationData };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteRecommendFlower = createAsyncThunk('flowers/deleteRecommendFlower', async (id) => {
  try {
    const deleteData = await DeleteRecommendFlower(id);
    return deleteData;
  }

  catch (error) {
    throw new Error(error.message);
  }
})

const flowerRecommendationsSlice = createSlice({
  name: 'flowerRecommendations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendFlowers.pending, (state) => {
        state.loading = true;
      })
      builder
      .addCase(getRecommendFlowers.fulfilled, (state, action) => {
        const { flowerId, recommendations } = action.payload;
        state.recommendations[flowerId] = recommendations;
        state.loading = false;
      })
    
      .addCase(getRecommendFlowers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addRecommendFlowers.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRecommendFlowers.fulfilled, (state, action) => {
        const { flowerId, recommendations } = action.payload;
        if (!state.recommendations[flowerId]) {
          state.recommendations[flowerId] = [];
        }
        state.recommendations[flowerId].push(recommendations);
        state.loading = false;
        alert("תגובתך התקבלה בהצלחה")
      })
      
      .addCase(addRecommendFlowers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteRecommendFlower.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRecommendFlower.fulfilled, (state, action) => {
        state.recommendations = state.recommendations.filter(recommend => recommend.id !== action.payload); 
               state.loading = false;
      })
      .addCase(deleteRecommendFlower.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      
  },
});

export default flowerRecommendationsSlice.reducer;