import { AddRequest } from "../services/supplierRequestService";
import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";


const initialState={
    requests:[],
    loading: false,
    error:""
        
    };

    export const addRequest = createAsyncThunk('requests/addRequest', async (request) => {
        try {
          const addData = await AddRequest(request);
          return addData;
        }
        catch (error) {
          throw new Error(error.message);
        }
      });

     
const supplierRequestSlice = createSlice({
    name: 'supplierRequest',
    initialState,
    reducers: {
    
    },
    extraReducers: (builder) => {
      builder

        .addCase(addRequest.pending, (state) => {
          state.loading = true;
        })
        .addCase(addRequest.fulfilled, (state, action) => {
          state.requests.push(action.payload);
          state.loading = false;
        })
        .addCase(addRequest.rejected, (state, action) => {
          state.error = action.error.message;
          state.loading = false;
        })
  
   
     
  
    },
  });
  
export default supplierRequestSlice.reducer;