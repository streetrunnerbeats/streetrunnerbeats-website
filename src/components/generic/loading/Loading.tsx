import { Spin } from 'antd';

import Style from './loading.module.scss';

interface LoadingInterface {
	noWrapper?: boolean;
	includeText?: boolean;
	loadingText?: string;
	size?: 'default' | 'small' | 'large';
}

const Loading = ({
	noWrapper = false,
	includeText = false,
	loadingText = 'Loading',
	size = 'large',
}: LoadingInterface) => {
	return noWrapper ? (
		<Spin size={size} />
	) : (
		<div className={Style.Wrapper}>
			<Spin size={size} tip={includeText ? <p className={Style.LoadingText}>{loadingText}</p> : null} />
		</div>
	);
};

export default Loading;
