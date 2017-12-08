import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import './styles/mobile.css';
import { sounds } from './config/sounds.js';
//import { getCookie } from './modules/cookie.js';
import { getUrlState } from './modules/urlstate.js';

let buttons = [];
buttons = [...sounds.main, ...sounds.additional];
const initialState = {
    words: getUrlState(),
    buttons
};

ReactDOM.render(<App state={initialState}/>, document.getElementById('root'));
registerServiceWorker();
