import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '../pages/main/main';
import WinesPage from '../pages/wines/wines';

const AppRouter: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainPage/>}/>
				<Route path='/wines' element={<WinesPage/>}/>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRouter;