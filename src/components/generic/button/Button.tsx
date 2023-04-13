import { Button as AntBtn } from 'antd';
import Style from './button.module.scss';

interface ButtonProps {
	text?: string | null;
	fluid?: boolean;
	bottomSpace?: 'none' | 'sm' | 'md' | 'lg';
	type?: 'primary' | 'secondary';
	[x: string]: any;
	children?: JSX.Element | JSX.Element[];
}

const Button = ({
	text = null,
	type = 'primary',
	bottomSpace = 'none',
	fluid = false,
	children,
	...rest
}: ButtonProps) => {
	return (
		<AntBtn
			data-type={type}
			data-bottom-space={bottomSpace}
			className={Style.Button}
			data-fluid={fluid ? 1 : 0}
			{...rest}>
			{text ? text : children}
		</AntBtn>
	);
};

export default Button;
