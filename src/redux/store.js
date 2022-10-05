import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userReducer from './userSlice';
import storage from 'redux-persist/lib/storage';

const persistConfig={
    key: 'root',
    storage
}

export default configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer
    }
});

