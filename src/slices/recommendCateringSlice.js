




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {AddRecommendFlowers, DeleteRecommendFlower, GetRecommendFlowers } from '../services/recommandFlowersService';
import { AddRecommendCatering, DeleteRecommendCatering, GetRecommendCatring } from '../services/recommendCateringService';

const initialState = {
  recommendations: [],
  loading: false,
  error: '',
};

export const getRecommendCatring = createAsyncThunk(
  'cateringRecommendations/getRecommendations',
  async (cateringId) => {
    try {
      const recommendationData = await GetRecommendCatring(cateringId);
      return { cateringId, recommendations: recommendationData };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);



export const addRecommendCatering = createAsyncThunk(
  'cateringRecommendations/addRecommendations',
  async ({ cateringId, recommend }) => {
    try {
      const recommendationData = await AddRecommendCatering(cateringId, recommend);
      return { cateringId, recommendations: recommendationData };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteRecommendCatering = createAsyncThunk('catering/deleteRecommendCatering', async (id) => {
  try {
    const deleteData = await DeleteRecommendCatering(id);
    return deleteData;
  }

  catch (error) {
    throw new Error(error.message);
  }
})

const cateringRecommendationsSlice = createSlice({
  name: 'cateringRecommendations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendCatring.pending, (state) => {
        state.loading = true;
      })
      builder
      .addCase(getRecommendCatring.fulfilled, (state, action) => {
        const { cateringId, recommendations } = action.payload;
        //console.log("Saving recommendations in Redux:", { cateringId, recommendations }); // הדפסה לבדיקה
        state.recommendations[cateringId] = recommendations;
        state.loading = false;
      })
    
      .addCase(getRecommendCatring.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addRecommendCatering.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRecommendCatering.fulfilled, (state, action) => {
        const { cateringId, recommendations } = action.payload;
        if (!state.recommendations[cateringId]) {
          state.recommendations[cateringId] = [];
        }
        state.recommendations[cateringId].push(recommendations);
        state.loading = false;
        alert("תגובתך התקבלה בהצלחה")
      })
      
      .addCase(addRecommendCatering.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteRecommendCatering.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRecommendCatering.fulfilled, (state, action) => {
        state.recommendations = state.recommendations.filter(recommend => recommend.id !== action.payload); 
               state.loading = false;
      })
      .addCase(deleteRecommendCatering.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      
  },
});

export default cateringRecommendationsSlice.reducer;