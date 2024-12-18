


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {   DeleteFlower, FilterFlowers, GetFlowers, UpdateFlower, UploadFloewr } from '../services/flowersService'

const initialState = {
  flowers: [],
  loading: false,
  error: '',
};

export const getFlower = createAsyncThunk('flowers/getFlower', async () => {
  try {
    const flowerData = await GetFlowers();
    return flowerData;
  } catch (error) {
    throw new Error(error.message);
  }
});

// export const addFlower = createAsyncThunk('flowers/addFlowers', async (flower) => {
//   try {
//     const addData = await AddFlower(flower);
//     return addData;
//   }
//   catch (error) {
//     throw new Error(error.message);
//   }
// });

export const addFlowerWithImage = createAsyncThunk(
  'flower/addFlowerWithImage',
  async ({ flowerData, imageFile }, { rejectWithValue }) => {
    try {
      const response = await UploadFloewr(flowerData, imageFile);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFlower = createAsyncThunk('flowers/deleteFlowers', async (id) => {
  try {
    const deleteData = await DeleteFlower(id);
    return deleteData;
  }

  catch (error) {
    throw new Error(error.message);
  }
})

// export const updateFlower=createAsyncThunk('flowers/updateFlower',async({flower,id})=>{
//   try{
//     const updateData=await UpdateFlower(flower,id);
//     return {id,flower:updateData};
//   }catch(error){
//     throw new Error(error.message);
//   }
// })
export const updateFlower = createAsyncThunk(
  "flower/flowerSinger",
  async ({ flowerData, imageFile, id }) => {
    try {
      const response = await UpdateFlower(flowerData, imageFile, id);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);


export const filterFlowers=createAsyncThunk('flowers/filterFlowers',async(filters)=>{
  try{
    const filterData=await FilterFlowers(filters);
    return filterData;
  }catch(error){
    throw new Error(error.message);
  }
})




const flowersSlice = createSlice({
  name: 'flowers',
  initialState,
  reducers: {
    setSelectedFlowerId(state, action) {
      state.selectedFlowerId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFlower.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getFlower.fulfilled, (state, action) => {
        state.flowers = action.payload;
        state.loading = false;
      })
      .addCase(getFlower.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addFlowerWithImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFlowerWithImage.fulfilled, (state, action) => {
        state.flowers.push(action.payload);
        state.loading = false;
      })
      .addCase(addFlowerWithImage.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(deleteFlower.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFlower.fulfilled, (state, action) => {
        state.flowers = state.flowers.filter(flower => flower.id !== action.payload); 
               state.loading = false;
      })
      .addCase(deleteFlower.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(updateFlower.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFlower.fulfilled, (state, action) => {
        const {id,flower}=action.payload
        state.flowers = state.flowers.map((f) =>
          f.id === id ? flower : f);
               state.loading = false;
      })
      .addCase(updateFlower.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(filterFlowers.pending,(state)=>{
        state.loading=true;
      })
      .addCase(filterFlowers.fulfilled,(state,action)=>{
        state.flowers=action.payload;
        state.loading=false;
      })
      .addCase(filterFlowers.rejected,(state,action)=>{
        state.error=action.error.message;
        state.loading=false;
      })
     

  },
});

export const { setSelectedFlowerId } = flowersSlice.actions;
export default flowersSlice.reducer;