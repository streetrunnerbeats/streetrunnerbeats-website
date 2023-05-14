import { Icon } from '@iconify/react';

import Style from './iconifyIcon.module.scss';

interface IconifyIconProps {
	icon: string;
	size?: 'sm' | 'md' | 'lg';
	additionalClass?: string;
	[x: string]: any;
}

const IconifyIcon = ({ icon, size = 'md', additionalClass, ...rest }: IconifyIconProps) => {
	return (
		<div className={`${Style.Wrapper} ${additionalClass}`} data-size={size} {...rest}>
			<Icon icon={icon} />
		</div>
	);
};

export default IconifyIcon;
