// React
import * as React from 'react';

import { Image } from 'antd';

// ==> Project Improts
import { AudioPlayerContext } from 'contexts';
import { selectSongPhoto } from 'util/index';
import { PlayerStatuses } from 'types';
import { Overlay } from 'components';
import {
	IconifyIcon,
	ICON_MUSIC_NOTES,
	ICON_PAUSE_BUTTON_NO_ROUND,
	ICON_PLAY_BUTTON_NO_ROUND,
	ICON_POINT_DOWN,
	ICON_VOLUME,
	ICON_VOLUME_MUTED,
} from 'components';

// ==> Component
import Style from './audioPlayer.module.scss';

const AudioPlayer = () => {
	const {
		// State Vars
		playerVisible,
		playerLoading,
		playerIsMuted,
		playerStatus,
		song,

		// Methods
		handleClickProgressBar,
		togglePlayerVisible,
		toggleMutePlayer,
		togglePausePlayer,

		// REFs
		playerRef,
		currentTimeRef,
		durationRef,
		progressBarOverlayRef,
	} = React.useContext(AudioPlayerContext);

	return (
		<div className={Style.MainPlayerContainer}>
			<div className={Style.PlayerOuter} data-player-open={playerVisible ? 1 : 0}>
				<div className={Style.PlayerInner}>
					{song && (
						<>
							<div className={Style.Left}>
								<Image className={Style.Photo} src={selectSongPhoto(song)} alt='album art' />
							</div>
							<div className={Style.Playback} id='sr-beats-playback-wrapper'>
								<Overlay color={Style.color_themePrimaryOpaq} />
								<div
									className={Style.ProgressOverlay}
									ref={progressBarOverlayRef}
									onClick={(e) => handleClickProgressBar(e)}
								/>

								<div
									id='sr-beats-progress-bar-wrapper'
									style={AudioPlayer.ProgressWrapperStyle as React.CSSProperties}>
									<AudioPlayer.ProgressBar />
								</div>

								<div className={Style.ProgressInfo}>
									<p>
										"{song.title}" by {song.artist}
									</p>
									<div>
										<span id='sr-beats-player-current-time' ref={currentTimeRef}>
											-:--
										</span>{' '}
										<span>/</span>{' '}
										<span id='sr-beats-player-duration' ref={durationRef}>
											-:--
										</span>
									</div>
								</div>
							</div>
						</>
					)}

					<audio style={{ display: playerLoading ? 'none' : '' }} id='sr-beats-player' ref={playerRef} />
				</div>
			</div>

			{song && (
				<>
					<div className={Style.ControlsWrapper} data-player-open={playerVisible ? 1 : 0}>
						<div className={Style.PlayerButton} onClick={() => togglePausePlayer()}>
							<IconifyIcon
								icon={
									playerStatus === PlayerStatuses.PLAYING
										? ICON_PAUSE_BUTTON_NO_ROUND
										: ICON_PLAY_BUTTON_NO_ROUND
								}
								size='sm'
							/>
						</div>

						<div className={Style.PlayerButton} onClick={() => toggleMutePlayer()}>
							<IconifyIcon icon={playerIsMuted === true ? ICON_VOLUME_MUTED : ICON_VOLUME} size='sm' />
						</div>
					</div>
					<div
						className={Style.ToggleVisibility}
						data-player-open={playerVisible ? 1 : 0}
						onClick={() => togglePlayerVisible(!playerVisible)}>
						<IconifyIcon icon={playerVisible ? ICON_POINT_DOWN : ICON_MUSIC_NOTES} size='sm' />
					</div>
				</>
			)}
		</div>
	);
};

AudioPlayer.ProgressWrapperStyle = {
	height: '100%',
	width: '100%',
	position: 'absolute',
	top: '0',
	left: '0',
};

AudioPlayer.ProgressBar = () =>
	(() => {
		return (
			<div
				style={{
					backgroundColor: Style.color_themePrimaryOpaq,
					transition: '1s linear',
					height: '100%',
					position: 'absolute',
					left: '0',
					top: '0',
				}}
				id='sr-beats-progress-bar'
			/>
		);
	})();

AudioPlayer.PlayerSpacer = () =>
	(() => {
		const { playerVisible } = React.useContext(AudioPlayerContext);
		return (
			<div
				className={Style.PlayerSpacer}
				style={{
					position: 'relative',
					width: '100%',
					height: playerVisible ? Style.height_audioPlayer : '0px',
					transition: '.3s',
				}}
			/>
		);
	})();

export default AudioPlayer;
