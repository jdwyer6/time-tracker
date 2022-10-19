import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: 'currentUser',
    initialState: {
        user: ''
    },
    reducers: {
        setUser: (state, action)=>{
            state.user = action.payload;
        }
    }
})

const employee = createSlice({
    name: 'currentEmployee',
    initialState: {
        employee: ''
    },
    reducers: {
        setUser: (state, action) => {
            state.employee = action.payload;
        }
    }
})


export const { setUser } = user.actions;
export const { setEmployee } = employee.actions;
export default user.reducer;