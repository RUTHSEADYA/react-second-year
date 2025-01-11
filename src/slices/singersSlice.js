


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  AddSinger, DeleteSinger, FilterSingers, GetSingers, UpdateSinger } from "../services/singersService";

const initialState={
    singers: [],
    loading: false,
    error: ""
    
};


export const getSingers=createAsyncThunk("singers/getSingers",async ()=>{
    try{
const getData=await GetSingers();
return getData;
    }catch(error){
throw new Error(error.message) ;   }

})



export const addSingerWithImage = createAsyncThunk(
    'singer/addSingerWithImage',
    async ({ singerData, imageFile }, { rejectWithValue }) => {
      try {
        const response = await AddSinger(singerData, imageFile);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const deleteSinger=createAsyncThunk("singer/deleteSinger",async(id)=>{
    try{
        const deleteData=await DeleteSinger(id);
        return deleteData;
    }catch(error){
        throw new Error(error.message);
    }
})

export const updateSinger = createAsyncThunk(
  "singer/updateSinger",
  async ({ singerData, imageFile, id }) => {
    try {
      const response = await UpdateSinger(singerData, imageFile, id);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);


export const filterSingers = createAsyncThunk("singers/filterSingers", async (name) => {
    try {
      const filterData=await FilterSingers({name})
       return filterData;
      }
    
    catch (error) {
      throw new Error(error.message);
    }
  })
  

const singerSlice=createSlice({

    name:"singers",
    initialState,
    reducers: {
        setSelectedSingerId(state, action) {
            state.selectedSingerId = action.payload;
          },
    },

    extraReducers: (builder)=>{
        builder
.addCase(getSingers.pending,(state)=>{
state.loading=true;

})
.addCase(getSingers.fulfilled,(state,action)=>{
state.singers=action.payload;
state.loading=false;

})
.addCase(getSingers.rejected,(state,action)=>{
    state.error=action.error.message;
    state.loading=false;

})
.addCase(addSingerWithImage.pending,(state)=>{
    state.loading=true;

})
.addCase(addSingerWithImage.fulfilled,(state,action)=>{
    state.singers.push(action.payload);
    state.loading=false;
})
.addCase(addSingerWithImage.rejected,(state,action)=>{
    state.error=action.error.message;
    state.loading=false;
})

.addCase(deleteSinger.pending,(state)=>{
    state.loading=true;
})
.addCase(deleteSinger.fulfilled,(state,action)=>{
   state.singers= state.singers.filter(singer=>singer.id!==action.payload);
   state.loading=false;
})
.addCase(deleteSinger.rejected,(state,action)=>{
    state.error=action.error.message;
    state.loading=false;
})

.addCase(updateSinger.pending, (state) => {
  state.loading = true;
})
.addCase(updateSinger.fulfilled, (state, action) => {
  const { id, singer } = action.payload; 
  state.singers = state.singers.map((s) =>
    s.id === id ? singer : s
  );
  state.loading = false;
})

.addCase(updateSinger.rejected, (state, action) => {
  state.error = action.error.message;
  state.loading = false;
})

.addCase(filterSingers.pending, (state) => {
    state.loading = true;
  })
  .addCase(filterSingers.fulfilled, (state, action) => {
    state.filteredSingers = action.payload; 
    state.loading = false;
    state.error = null;
  })
  .addCase(filterSingers.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  })

    }
});

export const {setSelectedSingerId}=singerSlice.actions;
export default singerSlice.reducer;


