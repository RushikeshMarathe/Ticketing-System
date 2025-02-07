import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null,
    loading: false,
    user: JSON.parse(localStorage.getItem("user")) || null, // Retrieve user from localStorage
    BASE_URL: 'http://localhost:3000/api/v1/',
    role:null,
};


const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload); // Persist token in localStorage
        },
        setUser: (state, action) => {
            state.user = action.payload; // Set user information
            localStorage.setItem("user", JSON.stringify(action.payload)); // Persist user in localStorage
        },
        getlogout: (state) => {
            
            localStorage.removeItem("token"); // Clear token from localStorage
            localStorage.removeItem("user"); // Clear user from localStorage
            state.token = null;
            state.user = null;
        },
        setRole: (state,action) => {
            state.role = action.payload;
        }
        
        
    }
})

export const {setLoading,setToken,setUser,getlogout,setRole} = authSlice.actions;
export default authSlice.reducer;