import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { LoadingView } from "./components/ui/LoadingView";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor }  from "./redux/store";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<LoadingView/>} persistor={persistor}>
            <Router>
                <App />
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
