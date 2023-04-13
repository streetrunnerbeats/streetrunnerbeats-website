// ==> React
import * as React from 'react';

// ==> Packages
import YouTube from 'react-youtube';

/**
 *-----------------
 *>> YouTubeEmbed
 *-----------------
 * A component that will create a responsive YouTube embed that maintains a 16:9 ratio at its parents width.
 *
 * @param {string} videoID (required) - a valid YouTube video ID
 * @param {boolean} autoplay (optional) - default: true - If the video will autoplay on mount
 * @param {string} maxWidth (optional) - default: 100% - Sets the width of the wrapper. Video embed will always match this width
 * @param {function} closeCallback (optional) - a function that will be executed when the video is done playing
 *
 * @returns a responsive YouTube video embed
 */

interface YouTubeEmbedInterface {
	videoID: string;
	onEndCallback?: Function;
	autoplay?: boolean;
	maxWidth?: string;
}

const YouTubeEmbed = ({ videoID, onEndCallback, autoplay = true, maxWidth = '100%' }: YouTubeEmbedInterface) => {
	// Store width/height in React State
	const [width, setWidth] = React.useState<any>(null);
	const [height, setHeight] = React.useState<any>(null);

	// Wrapper ID for DOM Manipulation
	const wrapperID = `video_wrapper_${videoID}`;

	// A function that can calculate the video size based on container width
	const calcVideoWidth = React.useCallback(() => {
		// Get wrapper from DOM
		let wrapper = document.getElementById(wrapperID);

		if (wrapper) {
			// If we found the wrapper, set the width and calculate/set height
			setWidth(`${wrapper.getBoundingClientRect().width}`);
			setHeight(`${wrapper.getBoundingClientRect().width / 1.778}`);
		}
	}, [wrapperID]);

	// Calculate video size when the screen is resized
	window.onresize = () => {
		calcVideoWidth();
	};

	// Size video on mount
	React.useEffect(() => {
		calcVideoWidth();
	}, [calcVideoWidth]);

	return (
		<div id={wrapperID} style={{ width: maxWidth, height: '100%', display: 'flex', alignItems: 'center' }}>
			{width && height && (
				<YouTube
					videoId={videoID}
					onEnd={() => onEndCallback && onEndCallback()}
					opts={{
						height,
						width,
						playerVars: {
							autoplay: autoplay ? 1 : 0,
							modestbranding: 1,
						},
					}}
				/>
			)}
		</div>
	);
};

export default YouTubeEmbed;
