import React, { FC, PropsWithChildren, useState } from 'react';

import { API } from '../../../utils/axios';
import { useDebounce } from '../../../hooks/useDebounce/useDebounce';
import './inputProducerAutocomplete.scss';


interface InputProducerProps {
	value: string | undefined
	onChange: (e: any) => void;
}

const InputProducerAutocomplete: FC<PropsWithChildren<InputProducerProps>> = ({value, onChange}) => {

	const [options, setOptions] = useState<string[] | null>(null);

	const debouncedInputValue = useDebounce(value?.length && value, 2000);

	const handleInputChange = async () => {
		onChange();

		if (debouncedInputValue.length > 3) {
			const {data} = await API.get(`/producer/${debouncedInputValue}`);

			setOptions(data);
		}
	}

	return (
		<div className='input-producer'>
			<input type="text" placeholder='Year' value={value} onChange={handleInputChange}/>
			{options?.length && (
				<div className='input-producer__options'>
					{options.map(item => (
						<div className='input-producer__item'>{item}</div>
					))}
				</div>
			)}
		</div>
	);
};

export default InputProducerAutocomplete;