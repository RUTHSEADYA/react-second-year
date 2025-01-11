

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddRecommendSinger, DeleteRecommendSinger, GetSingerRecommend } from "../services/recommendSingersService";



const initialState = {
  recommendations: [],
  singerImages: {},
  loading: false,
  error: ""
};

export const getRecommendSinger = createAsyncThunk(
  "singerRecommend/getSingerProducer",
  async (singerId) => {
    try {
      const recommendData = await GetSingerRecommend(singerId);
      return { singerId, recommendations: recommendData };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const addRecommendSinger = createAsyncThunk(
  "singerRecommendations/addRecommendations",
  async ({ singerId, recommend }) => {
    try {
      const recommendationData = await AddRecommendSinger(singerId, recommend);
      return { singerId, recommendations: recommendationData };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteRecommendSinger = createAsyncThunk(
  "flowers/deleteRecommendSinger",
  async (id) => {
    try {
      const deleteData = await DeleteRecommendSinger(id);
      return deleteData;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const recommendSingerSlice = createSlice({
  name: "singerRecommend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      

      .addCase(getRecommendSinger.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecommendSinger.fulfilled, (state, action) => {
        const { singerId, recommendations } = action.payload;
        state.recommendations[singerId] = recommendations;
        state.loading = false;
      })
      .addCase(getRecommendSinger.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addRecommendSinger.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRecommendSinger.fulfilled, (state, action) => {
        const { singerId, recommendations } = action.payload;
        if (!state.recommendations[singerId]) {
          state.recommendations[singerId] = [];
        }
        state.recommendations[singerId].push(recommendations);
        state.loading = false;
        alert("תגובתך התקבלה בהצלחה");
      })
      .addCase(addRecommendSinger.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteRecommendSinger.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRecommendSinger.fulfilled, (state, action) => {
        state.recommendations = state.recommendations.filter(
          (recommend) => recommend.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteRecommendSinger.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default recommendSingerSlice.reducer;

