// ==> Packages
import { Row, Col } from 'antd';

// ==> Component Imports
import Style from './viewContainer.module.scss';
import layoutOptions from '../layoutConfig';

interface ViewContainerProps {
	maxWidth: number | string;
	fluid: boolean;
	padding: string;
	isolatedFormOrCard?: boolean | null;
	children?: JSX.Element | JSX.Element[];
}

export default function ViewContainer({
	maxWidth = layoutOptions.DEFAULT_MAX_WIDTH,
	fluid = false,
	isolatedFormOrCard = null,
	children,
}: ViewContainerProps) {
	function Column({
		isolatedFormOrCard,
		children,
	}: {
		isolatedFormOrCard: boolean | null;
		children?: JSX.Element | JSX.Element[];
	}) {
		if (isolatedFormOrCard) {
			return (
				<Col xs={{ span: 22 }} md={{ span: 16 }} lg={{ span: 12 }}>
					{children}
				</Col>
			);
		} else {
			return (
				<Col xs={23} md={22}>
					{children}
				</Col>
			);
		}
	}

	return (
		<Row justify={'center'}>
			<Column isolatedFormOrCard={isolatedFormOrCard}>
				<div className={Style.Outer} id={layoutOptions.VIEW_OUTER_ID}>
					<div
						className={Style.Inner}
						style={{ maxWidth: fluid ? 'unset' : maxWidth }}
						id={layoutOptions.VIEW_INNER_ID}>
						{children}
					</div>
				</div>
			</Column>
		</Row>
	);
}
