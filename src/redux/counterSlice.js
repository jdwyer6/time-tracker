import { createSlice } from '@reduxjs/toolkit'

const count = createSlice({
    name: 'counter',
    initialState: {
      count: 0
    },
    reducers: {
      increment: state => {
        state.count += 1
      },
      decrement: state => {
        state.count -= 1
      },
      incrementByAmount: (state, action) => {
        state.count += action.payload;
      }
    }
  })
  
  export const { increment, decrement, incrementByAmount } = count.actions
  export default count.reducer;
  
//   const store = configureStore({
//     reducer: count.reducer
//   })
  
//   // Can still subscribe to the store
//   store.subscribe(() => console.log(store.getState()))
  
//   // Still pass action objects to `dispatch`, but they're created for us
//   store.dispatch(incremented())
//   // {value: 1}
//   store.dispatch(incremented())
//   // {value: 2}
//   store.dispatch(decremented())
//   // {value: 1}