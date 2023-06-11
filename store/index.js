import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import signUpReducer from "./SingUp/reducer";
import logInReducer from "./User/reducer";

const persistConfig = {
    key: 'Persist-root',
    storage,
}

export default configureStore({
  reducer:{
    login: logInReducer,
    signup: signUpReducer,
  }
})