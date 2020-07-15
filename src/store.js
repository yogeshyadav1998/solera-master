import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from "redux-thunk";
import rootReducer from "./Reducers";
import { logger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
// eslint-disable-next-line
const initialState = {};
const middleware = [thunk, logger];
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth','user']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
let store;
// eslint-disable-next-line
if(process.env.NODE_ENV == "development"){
   store = createStore( persistedReducer, compose(composeWithDevTools(applyMiddleware(...middleware))))
}
else {
   store = createStore( persistedReducer, compose(applyMiddleware(...middleware)))
}
const persistor = persistStore(store)
export { store, persistor };