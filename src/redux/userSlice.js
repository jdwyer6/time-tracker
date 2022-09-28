import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: 'currentUser',
    initialState: {
        user: -1
    },
    reducers: {
        setUser: (state, action)=>{
            state.user = action.payload;
        }
    }
})


export const { setUser } = user.actions;
export default user.reducer;