import {createStore} from "redux";
import {combineReducers} from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import SingUp from "./SingUp/reducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
    key: 'Persist-root',
    storage,
}

const reducers = combineReducers({SingUp})
const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {

    return{
        ...createStore(persistedReducer, composeWithDevTools())
    }
}