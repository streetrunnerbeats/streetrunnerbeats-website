import { Input } from 'antd';

import Style from './input.module.scss';

interface CustomInputInterface {
	[s: string]: any;
}

const CustomInput = ({ ...rest }: CustomInputInterface) => {
	return <Input className={Style.Input} {...rest} />;
};

export default CustomInput;
