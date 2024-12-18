


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddPotographer, DeletePotographer, GetPotographer, UpdatePhotographer } from '../services/photographerService';

const initialState = {
  photographers: [],
  loading: false,
  error: '',
};

export const getPhotographers = createAsyncThunk('photographers/getphotographers', async () => {
  try {
    const photographerData = await GetPotographer();
    return photographerData;
  } catch (error) {
    throw new Error(error.message);
  }
});

// export const addHall = createAsyncThunk('halls/addFlowers', async (hall) => {
//   try {
//     const addData = await AddHall(hall);
//     return addData;
//   }
//   catch (error) {
//     throw new Error(error.message);
//   }
// });

export const deletePhotographer = createAsyncThunk('photographers/deletephotographers', async (id) => {
  try {
    const deleteData = await DeletePotographer(id);
    return deleteData;
  }

  catch (error) {
    throw new Error(error.message);
  }
})





export const updatePhotographers = createAsyncThunk(
  "photographer/updatePhotographer",
  async ({ photographerData, imageFile, id }) => {
    try {
      const response = await UpdatePhotographer(photographerData, imageFile, id);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);




export const addPhotographerWithImage = createAsyncThunk(
  'photographers/addPhotographerWithImage',
  async ({ photographerData, imageFile }, { rejectWithValue }) => {
    try {
      const response = await AddPotographer(photographerData, imageFile);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




const photographersSlice = createSlice({
  name: 'photographers',
  initialState,
  reducers: {
    setSelectedPhotographerId(state, action) {
      state.selectedPhotographerId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhotographers.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getPhotographers.fulfilled, (state, action) => {
        state.photographers = action.payload;
        state.loading = false;
      })
      .addCase(getPhotographers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addPhotographerWithImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPhotographerWithImage.fulfilled, (state, action) => {
        state.photographers.push(action.payload);
        state.loading = false;
      })
      .addCase(addPhotographerWithImage.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(deletePhotographer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePhotographer.fulfilled, (state, action) => {
        state.photographers = state.photographers.filter(photographer => photographer.id !== action.payload);
        state.loading = false;
      })
      .addCase(deletePhotographer.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(updatePhotographers.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePhotographers.fulfilled, (state, action) => {
        const { id, photographer } = action.payload;
        state.photographers = state.photographers.map((p) =>
          p.id === id ? photographer : p
        );
        state.loading = false;
      })
      .addCase(updatePhotographers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

  },
});

export const { setSelectedPhotographerId } = photographersSlice.actions;
export default photographersSlice.reducer;