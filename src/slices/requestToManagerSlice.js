
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { DeleteReqeust, GetReqeusts } from "../services/reqeustToManagerService";


const initialState={
requests:[],
loading: false,
error:""
    
};

export const getReqeusts=createAsyncThunk('request/getReqeusts',async()=>{
    try{
        const requestData=await GetReqeusts();
        return requestData;
    }
    catch(error){
throw new Error(error.massage);
    }
});

export const deleteReqeust=createAsyncThunk('request/deleteReqeust',async(id)=>{
    try{
        const deleteData=await DeleteReqeust(id);
        return deleteData;
    }catch(error){
        throw new Error(error.massage);
    }
})


const requestSlice=createSlice({
    name:"requestToManager",
    initialState,
    reducers :{},


    extraReducers:(builder)=>{
        builder

    .addCase(getReqeusts.pending, (state) => {
                state.loading = true;
            })
.addCase(getReqeusts.fulfilled,(state,action)=>{
    state.requests=action.payload;
    state.loading=false;
})
.addCase(getReqeusts.rejected,(state,action)=>{
    state.error=action.error.message;
    state.loading=false;
})
.addCase(deleteReqeust.pending,(state)=>{
    state.loading=true;
})
.addCase(deleteReqeust.fulfilled,(state,action)=>{
    state.requests=state.requests.filter(request=>request.id!==action.payload);
    state.loading=false;
})
.addCase(deleteReqeust.rejected,(state,action)=>{
    state.error=action.error.message;
    state.loading=false;
})

}
}
);


export default requestSlice.reducer;
