import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxThunk from 'redux-thunk';
import reducer from './reducer';

const persistConfig = {
	key: 'root9',
	storage,
};

const persistedReducer = persistReducer(
	persistConfig,
	reducer
);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

export const store = createStore(
	persistedReducer,
	composeEnhancer(applyMiddleware(reduxThunk))
);

export const persistor = persistStore(store);
