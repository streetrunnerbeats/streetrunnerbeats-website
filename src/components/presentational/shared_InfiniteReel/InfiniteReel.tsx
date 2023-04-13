import React from 'react';

import { adminAPI } from 'apis';
import { Photo } from 'types';
import Style from './infiniteReel.module.scss';

const InfiniteReel = () => {
	let [photoSize, photoXMargin] = [100, 6];

	const [reelPhotos, setReelPhotos] = React.useState<null | Photo[]>(null);

	const fetchReelPhotos = React.useCallback(() => {
		return adminAPI.getReelPhotos(fetchPhotoSuccess, fetchPhotosError);
	}, []);

	function fetchPhotoSuccess({ data }: { data: any }) {
		console.log({ data });
		setReelPhotos(data.reelPhotos);
	}

	function fetchPhotosError({ errors }: { errors: any }) {
		console.log({ errors });
	}

	React.useEffect(() => {
		if (!reelPhotos) fetchReelPhotos();
	}, [fetchReelPhotos, reelPhotos]);

	return (
		reelPhotos &&
		Array.isArray(reelPhotos) &&
		reelPhotos.length > 10 && (
			<div
				className={Style.InfiniteReelOuter}
				style={
					{
						'--total-photo-width': `-${reelPhotos.length * (photoSize + photoXMargin * 2)}px`,
						'--double-photo-width': `${reelPhotos.length * (photoSize + photoXMargin * 2) * 2}px`,
						'--animation-duration': `${reelPhotos.length * 2}s`,
						'--photo-size': `${photoSize}px`,
						'--photo-x-margin': `${photoXMargin}px`,
					} as React.CSSProperties
				}>
				<div className={Style.InfiniteReelInner}>
					{[...reelPhotos, ...reelPhotos, ...reelPhotos].map((photo) => (
						<img src={photo.secure_url} key={`${Math.random()}`} alt={`${photo._id}_song-cover`} />
					))}
				</div>
			</div>
		)
	);
};

export default InfiniteReel;
