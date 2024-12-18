// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signUpUser,SigninUser, UpdateUser } from "../services/userService"; 

//מגדיר את המצב ההתחלתי של המתמש כרגע
//currentUser - מאחסן בתוכו את נתוני המתמש העכשווי
//loading- אם ישנה פעולה שנטענת-מתבצעת כרגע 
//והודעת שגיאה במידה שיש  
const initialState = {
    currentUser: {},
    loading: false,
    error: ""
};

// userData הפונקציה הזו קוראת לשרת ומחירה את התוצאה שהתקבלה ממנו לתוך 
//  שהיא מבצעת את הקריאות לשרת signUpUser בתוכה היא קוראת ל
//registerUser-  createAsyncThunk המזהה של הפעולה 
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
        return JSON.parse(storedUser);//ממירים כי הפונקציה לוקלסטורג מקבלת רק מחרוזת והמשתמש מגיע כאובייקט
    }
    return null; // אם אין משתמש שמור
});
export const updateUser=createAsyncThunk("user/updateuser",async({ id, user })=>{
    try{
    const userData=await UpdateUser(user,id);
    return userData;
    }catch(error){
        console.error("an error occurred",error);
        
    }
})

const userSlice = createSlice({
    name: "user",//השם של הסלייס משתמש לזיוי הסלייס והפעולות שלובתוך הסטור
  initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
    },//ריק , כי מגדיר פעולות סינכרוניות ואנו השתמשנו באסינכרוניות
    },
    //builder זה החלק שבו מנהלים את האסינכרוניות בעזרת
    extraReducers: (builder) => {
        builder
        //pending-  מתחילהA PI מופעל כשקריאה ל
        // לסמל שמידע נטען true לכן מאותחל ל
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })

            //fulfilled- הצליחה API מופעלת כשהקריאה ל-
            // action.payload באמצעות currentUser המידע נשמר ב
            // false מוחזר ל loading ה
            .addCase(registerUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.loading = false;
            })
            //rejected -נכשלת API מופעלת כשהקריאה ל
            //הודעת השגיאה נשמרת ב-error (באמצעות action.error.message).
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
            
              
            // .addCase(LoginUser.rejected,(state,action)=>{
            //     if(action.error == 404){
            //         state.error=action.error;
            //     }
            //     state.error=action.error.message;
            //     state.loading=false;

            // })
            .addCase(LoginUser.rejected, (state, action) => {
          
                    state.error = action.error.message || "Unknown error";
                
                state.loading = false;
            })
                // פעולה לטעינת משתמש מ-localStorage
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

            
           
    }
});

export const { logout } = userSlice.actions;


export default userSlice.reducer;
