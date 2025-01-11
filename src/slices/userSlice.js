import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signUpUser,SigninUser, UpdateUser, SignOutUser } from "../services/userService"; 


const initialState = {
    currentUser: {},
    loading: false,
    error: ""
};


export const registerUser = createAsyncThunk("user/registerUser", async (user) => {
    const userData = await signUpUser(user);  
    return userData;
});

export const LoginUser=createAsyncThunk("user/LoginUser",async(user)=>{
    const userData=await SigninUser(user);
    return userData;
});

export const loadUserFromStorage = createAsyncThunk("user/loadUserFromStorage", async () => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
        return JSON.parse(storedUser);
    }
    return null; 
});
export const updateUser=createAsyncThunk("user/updateuser",async({ id, user })=>{
    try{
    const userData=await UpdateUser(user,id);
    return userData;
    }catch(error){
        console.error("an error occurred",error);
        
    }
})
export const signOutUser = createAsyncThunk("user/signOutUser", async () => {
    try {
        const logoutData=await SignOutUser();
        return logoutData;
    } catch (error) {
        console.error("An error occurred during signout:", error);
        throw error;
    }
});


const userSlice = createSlice({
    name: "user",
  initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
    },
    },
 
    extraReducers: (builder) => {
        builder
       
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.loading = false;
            })
           
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })


            .addCase(LoginUser.pending,(state)=>{
                state.loading=true;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.loading = false;
            })
            
              
  
            .addCase(LoginUser.rejected, (state, action) => {
          
                    state.error = action.error.message || "Unknown error";
                
                state.loading = false;
            })
               
        .addCase(loadUserFromStorage.fulfilled, (state, action) => {
            if (action.payload) {
                state.currentUser = action.payload;
            }
        })
        
      .addCase(updateUser.pending, (state) => {
                state.loading = true;
              })
              .addCase(updateUser.fulfilled, (state, action) => {
                const { id, user } = action.payload;
                if (state.users) {
                    state.users = state.users.map((u) => (u.id === id ? user : u));
                }
                state.loading = false;
            })
            
      

        .addCase(updateUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
              })
              .addCase(signOutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signOutUser.fulfilled, (state) => {
                state.currentUser = null;
                state.loading = false;
            })
            .addCase(signOutUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

            
           
    }
});

export const { logout } = userSlice.actions;


export default userSlice.reducer;
