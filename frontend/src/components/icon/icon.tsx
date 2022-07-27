import { FC, PropsWithChildren } from 'react';

import { iconList } from './iconList';

interface IconProps {
	type: keyof typeof iconList
	size?: string,
	height?: string,
	width?: string,
	fill?: string,
}

const Icon: FC<PropsWithChildren<IconProps>> = ({ type, size = '16', width, height, fill = 'black'}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width ? width : size}
			height={height ? height : size}
			fill={fill}
			viewBox={`0 0 ${width ? width : size} ${height ? height : size}`}
		>
			{iconList[type]}
		</svg>
	);
};


export default Icon;
