import { FC } from 'react';

import SearchInputs from '../../components/search-inputs/search-inputs';
import './main.scss';

const Main: FC = () => {

	return (
		<div className='main'>
			<h1>Wein Engine Beta</h1>
			<SearchInputs/>
		</div>
	)
}

export default Main;