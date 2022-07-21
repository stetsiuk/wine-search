import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from '../pages/main/main';

const AppRouter: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Main/>}/>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRouter;