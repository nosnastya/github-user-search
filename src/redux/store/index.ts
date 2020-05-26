import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer, { RootState } from "../reducers";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saveToLocalStorage = (state:RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log(e)
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch(e) {
        console.log(e)
        return undefined
    }

};

const persistedState = loadFromLocalStorage();

export const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(
        applyMiddleware(thunk),
    )
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export const persistor = persistStore(store);
