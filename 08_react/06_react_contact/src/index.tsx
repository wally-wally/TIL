// IE11 cross browsing
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// import react library
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './App';

const element = (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

const app = document.querySelector('#app');

ReactDOM.render(element, app);
