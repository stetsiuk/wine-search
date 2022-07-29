import React, { FC, PropsWithChildren, useState, KeyboardEvent } from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { changeItemSearchWine } from '../../../store/search/search.slice';
import { API } from '../../../utils/axios';
import './inputProducerAutocomplete.scss';


interface InputProducerProps {
	value: string | undefined
	index: number
}

const InputProducerAutocomplete: FC<PropsWithChildren<InputProducerProps>> = ({index, value}) => {
	const dispatch = useAppDispatch();

	const [options, setOptions] = useState<string[]>([]);

	const [inputFocus, setInputFocus] = useState(false);
	const [inputItemIndexFocus, setInputItemIndexFocus] = useState(-1);

	const handleInputChange = async (value: string) => {
		if (value.length >= 3) {
			dispatch(changeItemSearchWine({index, field: 'producer', value}));
			const {data} = await API.get(`/producer/${value}`);
			setOptions(data);
			return;
		}
		dispatch(changeItemSearchWine({index, field: 'producer', value}));
		setOptions([])
	}

	const handleInputItemFocus = (e: KeyboardEvent<HTMLInputElement>) => {
		switch (e.code) {
			case 'ArrowDown':
				if (inputItemIndexFocus < options.length - 1) {
					setInputItemIndexFocus(prevState => prevState + 1)
				} else {
					setInputItemIndexFocus(0)
				}
				return;

			case 'ArrowUp':
				if (inputItemIndexFocus > 0) {
					setInputItemIndexFocus(prevState => prevState - 1)
				} else {
					setInputItemIndexFocus(options.length - 1)
				}
				return;

			case 'Enter':
				if (inputItemIndexFocus !== -1) {
					handleInputChange(options[inputItemIndexFocus]);
				}
				setInputItemIndexFocus(-1);
				return;
		}
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
				onKeyDown={handleInputItemFocus}
			/>
			{options && options.length > 0 && inputFocus
				? <div
					className={`input-producer__options`}
					onMouseMove={() => setInputItemIndexFocus(-1)}
				>
					{options.map((item, index) => (
						<div
							key={index}
							className={`input-producer__item ${index === inputItemIndexFocus ? 'input-producer__item--focused' : ''}`}
							onClick={() => handleInputChange(item)}
						>
							{item}
						</div>
					))}
				</div>
				: null
			}
		</div>
	);
};

export default InputProducerAutocomplete;