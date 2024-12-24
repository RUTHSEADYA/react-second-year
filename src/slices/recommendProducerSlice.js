import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AddRecommendProducer, DeleteRecommendProducer, GetProducerRecommend } from "../services/recommendProducerService";


const initialState={
    recommendations:[],
    loading:false,
    error :""   
}


export const getRecommendProducer = createAsyncThunk(
    'producerRecommend/getRecommendProducer',
    async (producerId) => {
      try {
        const recommendData = await GetProducerRecommend(producerId);
        return { producerId, recommendations: recommendData };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );

  
export const addRecommendProducer= createAsyncThunk(
  'producerRecommendations/addRecommendations',
  async ({ producerId, recommend }) => {
    try {
      const recommendationData = await AddRecommendProducer(producerId, recommend);
      return { producerId, recommendations: recommendationData };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

  export const deleteRecommendProducer = createAsyncThunk('flowers/deleteRecommendProducer', async (id) => {
    try {
      const deleteData = await DeleteRecommendProducer(id);
      return deleteData;
    }
  
    catch (error) {
      throw new Error(error.message);
    }
  })
  
    

const recommendProducerSlice=createSlice({
    name:"producerRecommend",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder

        .addCase(getRecommendProducer.pending,(state)=>{
            state.loading=true;
        })
        builder
        .addCase(getRecommendProducer.fulfilled,(state,action)=>{
        const {producerId,recommendations} =action.payload;
        state.recommendations[producerId]=recommendations;
        state.loading=false;
         })
         .addCase(getRecommendProducer.rejected,(state,action)=>{
          state.error=action.error.message;
          state.loading=false;
         })

         .addCase(addRecommendProducer.pending, (state) => {
          state.loading = true;
        })
        .addCase(addRecommendProducer.fulfilled, (state, action) => {
          const { producerId, recommendations } = action.payload;
          if (!state.recommendations[producerId]) {
            state.recommendations[producerId] = [];
          }
          state.recommendations[producerId].push(recommendations);
          state.loading = false;
          alert("תגובתך התקבלה בהצלחה")
        })
        
        .addCase(addRecommendProducer.rejected, (state, action) => {
          state.error = action.error.message;
          state.loading = false;
        })

         .addCase(deleteRecommendProducer.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteRecommendProducer.fulfilled, (state, action) => {
          state.recommendations = state.recommendations.filter(recommend => recommend.id !== action.payload); 
                 state.loading = false;
        })
        .addCase(deleteRecommendProducer.rejected, (state, action) => {
          state.error = action.error.message;
          state.loading = false;
        })
  
    }

})

export default recommendProducerSlice.reducer;
