import React, { FC, PropsWithChildren, useState } from 'react';

import { API } from '../../../utils/axios';
import './inputProducerAutocomplete.scss';


interface InputProducerProps {
	value: string | undefined
	index: number
	handleChangeInputValue: (index: number, field: 'producer', value: string) => void;
}

const InputProducerAutocomplete: FC<PropsWithChildren<InputProducerProps>> = ({index, value, handleChangeInputValue}) => {

	const [options, setOptions] = useState<string[]>([]);

	const [inputFocus, setInputFocus] = useState(false);

	const handleInputChange = async (value: string) => {
		if (value.length >= 3) {
			handleChangeInputValue(index, 'producer', value)
			const {data} = await API.get(`/producer/${value}`);
			setOptions(data);
			return;
		}
		handleChangeInputValue(index, 'producer', value)
		setOptions([])
	}

	return (
		<div className='input-producer'>
			<input
				type="text"
				placeholder='Producer'
				value={value}
				onChange={(e) => handleInputChange(e.target.value)}
				onFocus={() => setInputFocus(true)}
				onBlur={() => setTimeout(() => setInputFocus(false), 100)}
			/>
			{options && options.length > 0 && inputFocus
				? <div className='input-producer__options'>
					{options.map((item, index) => (
						<div
							key={index}
							className='input-producer__item'
							onClick={() => handleInputChange(item)}
						>
							{item}
						</div>
					))}
				</div>
				: ''
			}
		</div>
	);
};

export default InputProducerAutocomplete;