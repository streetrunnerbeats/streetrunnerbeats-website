import { Row, Col } from 'antd';

/**
 * A component that reduces some of the redudant Row/Col setup for containing content on pages.
 */

interface ContentColProps {
	[x: string]: any;
	padding: string;
	customColumnClass: string;
	children: JSX.Element | JSX.Element[];
}

const ContentCol = ({ padding = '45px 0', children, customColumnClass, ...rest }: ContentColProps) => {
	return (
		<Row justify={'center'} align='middle' style={{ padding }} {...rest}>
			<Col xs={22} sm={22} md={18} lg={18} xl={18} xxl={18} className={customColumnClass}>
				{children}
			</Col>
		</Row>
	);
};

export default ContentCol;
