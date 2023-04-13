// ==> React
import * as React from 'react';

// ==> Packages
import axios from 'axios';
import { Row, Col } from 'antd';

// ==>  Project Imports
import { YouTubeVideoColumn, Button, Loader } from 'components';
import { Spacer, ContentCol, Footer } from 'layout';
import routes from 'routes';

// Component Imports
import Style from './videosPage.module.scss';

const VideosPage = () => {
	const [videos, setVideos] = React.useState<any[]>([]);

	//
	const [initalLoaded, setInitialLoaded] = React.useState<boolean>(false);
	const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);

	// YouTube Variables
	const [loadMoreToken, setLoadMoreToken] = React.useState<string>('');
	const [totalVideoCount, setTotalVideoCount] = React.useState<number>(0);

	// A function that fetches the current playlist ID from DB then the initial video fetch from YouTube
	const handleInit = React.useCallback(async () => {
		let { data } = await axios.get(`${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_VIDEO}`);
		if (data) {
			setVideos(data.items);
			setLoadMoreToken(data.nextPageToken);
			setTotalVideoCount(data.pageInfo.totalResults);
			setInitialLoaded(true);
		} else {
			// set some errors
		}
	}, []);

	React.useEffect(() => {
		if (!initalLoaded) {
			handleInit();
		}
	}, [initalLoaded, handleInit]);

	// Fetch more videos using the nextPageToken provided from youtube
	async function loadMore(pageToken: string) {
		setIsLoadingMore(true);
		let { data } = await axios.get(
			`${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_VIDEO}?pageToken=${pageToken}`
		);

		setLoadMoreToken(data.nextPageToken);
		setVideos([...videos, ...data.items]);
		setIsLoadingMore(false);
	}

	return (
		<>
			<ContentCol>
				<Spacer height='45px' />
				<h1>VIDEOGRAPHY</h1>
				<Row>
					{!initalLoaded && <Loader />}
					{videos &&
						videos.map((video: any) => {
							return <YouTubeVideoColumn video={video} key={video.snippet.resourceId.videoId} />;
						})}
					<Col span={24} className={Style.LoadWrapper}>
						<Spacer height='45px' />
						{isLoadingMore && initalLoaded ? (
							<Loader />
						) : videos.length < totalVideoCount ? (
							<Button onClick={() => loadMore(loadMoreToken)}>Load More</Button>
						) : null}
					</Col>
				</Row>
			</ContentCol>
			<Footer />
		</>
	);
};

export default VideosPage;
