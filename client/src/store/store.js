import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "./root-reducer";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from "redux-persist";
import logger from "react-logger";
import { rootSaga } from "./root-saga";
import createSagaMiddleware from "@redux-saga/core";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV !== 'development' && logger, sagaMiddleware].filter(Boolean)

const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares))

export const store = createStore(
    persistedReducer,
     undefined, 
     composedEnhancers
)

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)

