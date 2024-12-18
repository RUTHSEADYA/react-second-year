
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  AddProducer, DeleteProducer, GetProducers, UpdateProducer } from "../services/producerService";

const initialState={
    producers: [],
    loading: false,
    error: ""
    
};


export const getProducers=createAsyncThunk("producer/getProducers",async ()=>{
    try{
const getData=await GetProducers();
return getData;
    }catch(error){
throw new Error(error.message) ;   }

})

// export const addProducer=createAsyncThunk("producer/addProducer",async(producer)=>{
//     try{
//    const addData=await AddProducer(producer);
//    return addData;
//     }catch(error){
//         throw new Error(error.message);
//     }
// })

export const deleteProducer=createAsyncThunk("producer/deleteProducer",async(id)=>{
    try{
        const deleteData=await DeleteProducer(id);
        return deleteData;
    }catch(error){
        throw new Error(error.message);
    }
})

export const updateProducer = createAsyncThunk(
    "producer/updateProducer",
    async ({ producerData, imageFile, id }) => {
      try {
        const response = await UpdateProducer(producerData, imageFile, id);
        return response;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );
  


export const addProducerWithImage = createAsyncThunk(
    'halls/addProducerWithImage',
    async ({ producerData, imageFile }, { rejectWithValue }) => {
      try {
        const response = await AddProducer(producerData, imageFile);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const producerSlice=createSlice({

    name:"producers",
    initialState,
    reducers: {
        setSelectedProducerId(state, action) {
            state.selectedProdecerId = action.payload;
          },
    },

    extraReducers: (builder)=>{
        builder
.addCase(getProducers.pending,(state)=>{
state.loading=true;

})
.addCase(getProducers.fulfilled,(state,action)=>{
state.producers=action.payload;
state.loading=false;

})
.addCase(getProducers.rejected,(state,action)=>{
    state.error=action.error.message;
    state.loading=false;

})
.addCase(addProducerWithImage.pending,(state)=>{
    state.loading=true;

})
.addCase(addProducerWithImage.fulfilled,(state,action)=>{
    state.producers.push(action.payload);
    state.loading=false;
})
.addCase(addProducerWithImage.rejected,(state,action)=>{
    state.error=action.error.message;
    state.loading=false;
})

.addCase(updateProducer.pending, (state) => {
    state.loading = true;
  })
  .addCase(updateProducer.fulfilled, (state, action) => {
    const { id, producer } = action.payload; // חילוץ ID ואובייקט הזמר מהתוצאה
    state.producers = state.producers.map((p) =>
      p.id === id ? producer : p
    );
    state.loading = false;
  })
  
  .addCase(updateProducer.rejected, (state, action) => {
    state.error = action.error.message;
    state.loading = false;
  })
  

.addCase(deleteProducer.pending,(state)=>{
    state.loading=true;
})
.addCase(deleteProducer.fulfilled,(state,action)=>{
   state.producers= state.producers.filter(producer=>producer.id!==action.payload);
   state.loading=false;
})
.addCase(deleteProducer.rejected,(state,action)=>{
    state.error=action.error.message;
    state.loading=false;
})

    }
});

export const {setSelectedProducerId}=producerSlice.actions;
export default producerSlice.reducer;


