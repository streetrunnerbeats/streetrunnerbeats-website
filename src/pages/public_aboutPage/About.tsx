// React
import { useNavigate } from 'react-router-dom';

// ==> Packages
import { Row, Col, Typography } from 'antd';

// ==> Project Imports
import { BioHeaderPic, BioFooterPic } from 'assets';
import { Button, SocialButtons, InfiniteReel, Overlay } from 'components';
import { Footer, ScrollToTop, ContentCol } from 'layout';
import routes from 'routes';

// ==> Component
import Style from './about.module.scss';
const { Title } = Typography;

const AboutPage = () => {
	const navigate = useNavigate();

	return (
		<Row justify={'center'} align='middle' style={{ padding: '45px 0 ' }} className={Style.BioSection}>
			{/* HEADER PHOTO */}
			<div className={Style.HeaderContainer}>
				<Overlay type='light' />
				<img src={BioHeaderPic} className={Style.BGPic} alt='streetrunner looking at award' />
				<div className={Style.BottomUpGradient} />
			</div>

			{/* PAGE TEXT CONTENT */}
			<Col span={24} className={Style.Content}>
				<ContentCol style={{ padding: 0 }}>
					<Title level={1}>STREETRUNNER</Title>
					<p className={Style.BodyLarge}>
						Nicholas Warwar, professionally known as STREETRUNNER, is an American, Grammy Award winning,
						multi-platinum record producer from Miami, Florida who currently resides in Atlanta, Georgia.
					</p>

					<p className={Style.BodySmall}>
						He began his music career as a DJ and gained recognition as a producer in 2004 with the
						Billboard charting hit single “Take Me Home” by Terror Squad. He has since become a major
						fixture as a high-profile hip-hop producer, working with artists such as Lil Wayne, Eminem, Jay
						Z, Fat Joe, Fabolous, The Game, Meek Mill, 2 Chainz, Rick Ross, Big Sean, DJ Khaled and many
						others. STREETRUNNER is a 9x Grammy Nominated Producer and has won three awards for Rap Album of
						the year (Lil Wayne- Tha Carter III 2008), Rap Album of the year (Eminem- Marshall Mathers LP 2
						2015), Best Rap Sung Performance (DJ Khaled “Higher” featuring Nipsey Hussle & John Legend
						2019).
					</p>
				</ContentCol>
			</Col>

			{/* SOCIAL LINKS WITH PHOTO */}
			<div className={Style.SocialSection}>
				<Overlay type='light' />
				<Row className={Style.ButtonWrapper}>
					<Col xs={24} md={9} style={{ position: 'relative' }}>
						<Button fluid bottomSpace='md' onClick={() => navigate(routes.DISCOGRAPHY)}>
							Discography
						</Button>
						<Button fluid bottomSpace='lg' type='secondary' onClick={() => navigate(routes.VIDEOS)}>
							Videos
						</Button>
						<SocialButtons />
					</Col>
				</Row>
				<img className={Style.BGPic} src={BioFooterPic} alt='streetrunner looking at his phone' />

				{/* PHOTO REEL */}
				<div className={Style.ReelWrapper}>
					<InfiniteReel />
				</div>

				<div className={Style.TopDownGradient} />
			</div>
			<div style={{ width: '100%' }}>
				<Footer color='solid' />
			</div>

			{/* FOOTER */}
			<ScrollToTop />
		</Row>
	);
};

export default AboutPage;
