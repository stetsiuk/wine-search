import React from 'react';
import { Provider } from 'react-redux';

import AppRouter from './router/router';
import { store } from './store/store';
import './style/style.scss';

function App() {
	return (
		<Provider store={store}>
			<AppRouter/>
		</Provider>
	);
}

export default App;