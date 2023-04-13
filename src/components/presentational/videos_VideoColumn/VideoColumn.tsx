// ==> React
import * as React from 'react';

// ==> Packages
import { Col, Modal, Spin, Typography } from 'antd';

// ==> Project Imports
import { YouTubeEmbed } from 'components';

// ==> Component
import Style from './videoColumn.module.scss';

const { Text } = Typography;

/**
 *------------------------
 *>> YouTube Video Column
 *------------------------
 * A component that will generate a responsive grid column for YouTube videos. Title and Images provided by YouTube item, the column
 * displays aas a decorative card and opens the video in a Modal when clicked. The component will only mount video embeds when
 * clicked and destroys them when the modal is closed.
 *
 * @param {youtube video item} video (required) - When hitting YouTube API for a playlist, video items are returned in the 'items' array
 *
 * @returns A Video Card inside of an responsive AntDesign column.
 */

const YouTubeVideoColumn = ({ video }: { video: any }) => {
	// Video Data
	const [thumbnail, setThumbnail] = React.useState<string>('');
	const [title, setVideoTitle] = React.useState<string>('');
	const [videoId, setVideoId] = React.useState<null | string>(null);

	// Component State
	const [open, toggleOpen] = React.useState<boolean>(false);
	const [hide, setHide] = React.useState<boolean>(false);

	// Helpers
	const close = () => toggleOpen(false);

	// Set video data on mount
	React.useEffect(() => {
		if (video) {
			let data = video.snippet;

			if (data.title === 'Private Video') {
				/**
				 * NOTE:
				 * Ideally no private videos will be passed into this component. But sometimes
				 * there are cases where a video on a public playlist goes private but is still
				 * listed on the public playlist. YouTube considers that the owner of the playlist
				 * may have access to the video, but you with access to their playlist maybe don't.
				 * The data for the private video is not returned though, so trying to render this
				 * component with a "Private Video" object will break the component.
				 */

				setHide(true);
			} else {
				setThumbnail(data.thumbnails.high.url);
				setVideoId(data.resourceId.videoId);
				setVideoTitle(data.title);
			}
		}
	}, [video]);

	/**
	 * NOTE:
	 * This component uses AntDesign responsive column and Modal. If you move the modal inside of the Col
	 * to get rid of the fragment, the modal will start disregarding the close functions and won't close.
	 * This may or may not be a bug, but it is easier to separate in a fragmant than try to override how
	 * AntD works with these things (potentially creating another issue.)
	 */
	return (
		(!hide || !videoId) && (
			<>
				<Col
					xs={24}
					sm={22}
					md={12}
					lg={8}
					xl={6}
					xxl={6}
					key={Math.random()}
					className={Style.ColWrapper}
					onClick={() => toggleOpen(true)}>
					{!videoId ? (
						<Spin />
					) : (
						<div className={Style.VideoCardWrapper}>
							<div className={Style.ThumbWrapper} style={{ backgroundImage: `url(${thumbnail})` }} />
							<div className={Style.VideoDetails}>
								<Text ellipsis>{title}</Text>
							</div>
						</div>
					)}
				</Col>
				<Modal
					width={'100vw'}
					style={{ maxWidth: '900px' }}
					open={open}
					destroyOnClose={true}
					onCancel={close}
					footer={React.createElement(() => null)}>
					{videoId && <YouTubeEmbed videoID={videoId} onEndCallback={close} />}
				</Modal>
			</>
		)
	);
};

export default YouTubeVideoColumn;
