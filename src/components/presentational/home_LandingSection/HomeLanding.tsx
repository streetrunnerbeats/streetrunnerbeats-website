// ==> React
import { useNavigate } from 'react-router-dom';

// ==> Packages
import { Row, Col, Typography } from 'antd';

// ==> Project Imports
import { LandingHeader } from 'assets';
import { Button, Overlay } from 'components';
import routes from 'routes';

// ==> Component
import Style from './homeLanding.module.scss';

const { Text, Title } = Typography;

const LandingSection = () => {
	const navigate = useNavigate();

	return (
		<Row
			className={Style.LandingWrapper}
			style={{ backgroundImage: `url(${LandingHeader})` }}
			align='middle'
			justify={'center'}>
			<Overlay type='light' />
			<Col span='16' className={Style.Wrapper}>
				<Title className={Style.Title} level={1}>
					STREETRUNNER
				</Title>
				<Text className={Style.SubText}>
					Nine time Grammy nominated producer and award winner.{' '}
					<span onClick={() => navigate(routes.ABOUT)}>READ MORE</span>
				</Text>

				<Button onClick={() => navigate(routes.DISCOGRAPHY)}>Browse Discography</Button>
			</Col>
		</Row>
	);
};

export default LandingSection;
