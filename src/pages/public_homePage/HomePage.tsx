import { useNavigate } from 'react-router-dom';

// Project
import { Footer, ScrollToTop, ContentCol } from 'layout';
import routes from 'routes';
import { InfiniteReel, Button, DiscographyCard, HomeLanding, GrammyAwards, RIAACertificationsTable } from 'components';

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<>
			<HomeLanding />
			<InfiniteReel />
			<ContentCol>
				<GrammyAwards />
				<RIAACertificationsTable />
				<DiscographyCard />

				<div style={{ width: '100%', display: 'flex' }}>
					<Button style={{ margin: '0 auto' }} onClick={() => navigate(routes.DISCOGRAPHY)}>
						See Full Discography
					</Button>
				</div>
			</ContentCol>
			<Footer />
			<ScrollToTop />
		</>
	);
};

export default HomePage;
