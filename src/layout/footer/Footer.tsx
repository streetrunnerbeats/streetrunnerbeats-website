// React
import { Link, useNavigate } from 'react-router-dom';

// ==> Packages
import { Row, Col } from 'antd';

// ==> Project Imports
import { SocialButtons } from 'components';
import { Logo192 } from 'assets';
import routes from 'routes';

// Component
import Style from './footer.module.scss';

interface FooterProps {
	color?: 'opaq' | 'solid';
}

const Footer = ({ color = 'opaq' }: FooterProps) => {
	const navigate = useNavigate();
	return (
		<Row justify={'center'} align='middle' className={Style.FooterWrapper}>
			<Col span={24}>
				<Row justify={'center'} align='middle' className={Style.FooterInner} data-color={color}>
					<div className={Style.OverlayColor} />
					<Col span={18}>
						<Row justify={'center'} align='middle'>
							<Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18} className={Style.FooterLeft}>
								<Link to={routes.HOME}>
									<img className={Style.Logo} alt='footer logo home link' src={Logo192} />
								</Link>
								<div>
									<div className={Style.Links}>
										<Link to={routes.VIDEOS}>VIDEOS</Link>
										<Link to={routes.DISCOGRAPHY}>DISCOGRAPHY</Link>
										<Link to={routes.ABOUT}>ABOUT</Link>
									</div>
									<p className={Style.Footnote}>
										© 2015 STREETRUNNER BEATS • All Rights Reserved{' '}
										<span className={Style.AdminLogin} onClick={() => navigate(routes.CMS_ADMIN)}>
											• Admin
										</span>
									</p>
								</div>
							</Col>
							<Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
								<SocialButtons />
							</Col>
						</Row>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default Footer;
