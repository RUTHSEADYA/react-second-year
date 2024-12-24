


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  AddHall, DeleteHall, GetHalls,UpdateHall} from '../services/hallService';
import axios from 'axios';

const initialState = {
  halls: [],
  cities: [],
  loading: false,
  error: '',
};
const username = 'ruth_606';


export const getHalls = createAsyncThunk('halls/gethalls', async () => {
  try {
    const hallData = await GetHalls();
    return hallData;
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

export const deleteHall = createAsyncThunk('halls/deletehalls', async (id) => {
  try {
    const deleteData = await DeleteHall(id);
    return deleteData;
  }

  catch (error) {
    throw new Error(error.message);
  }
})





export const updateHall = createAsyncThunk(
  "hall/updateHall",
  async ({ hallData, imageFile, id }) => {
    try {
      const response = await UpdateHall(hallData, imageFile, id);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);



export const addHallWithImage = createAsyncThunk(
  'halls/addHallWithImage',
  async ({ hallData, imageFile }, { rejectWithValue }) => {
    try {
      const response = await AddHall(hallData, imageFile);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const CitiesInIsrael = createAsyncThunk(
  'halls/fetchCities',
  async () => {
    try{
    const apiUrl = `http://api.geonames.org/searchJSON?country=IL&username=${username}&maxRows=1000&featureClass=P`;
    const response = await axios.get(apiUrl);
    return response.data.geonames.map(city => city.name);
    }catch(error){
      console.error("error",error);
    }
  }
);





const hallsSlice = createSlice({
  name: 'halls',
  initialState,
  reducers: {
    setSelectedHallId(state, action) {
      state.selectedHallId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHalls.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getHalls.fulfilled, (state, action) => {
        state.halls = action.payload;
        state.loading = false;
      })
      .addCase(getHalls.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addHallWithImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(addHallWithImage.fulfilled, (state, action) => {
        state.halls.push(action.payload);
        state.loading = false;
      })
      .addCase(addHallWithImage.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(deleteHall.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteHall.fulfilled, (state, action) => {
        state.halls = state.halls.filter(hall => hall.id !== action.payload); 
               state.loading = false;
      })
      .addCase(deleteHall.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(updateHall.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateHall.fulfilled, (state, action) => {
        const { id, hall } = action.payload;
state.halls = state.halls.map((h) =>
  h.id === id ? hall : h
);

               state.loading = false;
      })
      .addCase(updateHall.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(CitiesInIsrael.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CitiesInIsrael.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cities = action.payload;
      })
      .addCase(CitiesInIsrael.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });



  },
});

export const { setSelectedHallId } = hallsSlice.actions;
export default hallsSlice.reducer;