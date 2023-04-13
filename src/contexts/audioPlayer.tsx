import * as React from 'react';
import ReactDOM from 'react-dom/client';

// Project
import { Song, PlayerStatuses } from 'types';
import { AudioPlayer } from 'components';
import { updateObj, formatSeconds } from 'util/index';

// Component
import actions from './actionTypes';

interface ContextInterface {
	// Vars
	song: null | Song;
	playerStatus: PlayerStatuses;
	playerError: null | { [x: string]: string };

	// Toggles
	playerVisible: boolean;
	playerLoading: boolean;
	playerIsMuted: boolean;

	// Refs
	playerRef?: any;
	currentTimeRef?: any;
	durationRef?: any;
	progressBarRef?: any;
	progressBarOverlayRef?: any;
	playbackRef?: any;

	// Methods
	handlePlaySong: Function;
	handleClickProgressBar: Function;

	setError: Function;
	setSong: Function;
	setPlayerStatus: Function;

	toggleMutePlayer: Function;
	togglePausePlayer: Function;
	togglePlayerLoading: Function;
	togglePlayerVisible: Function;
}

interface ActionsInterface {
	type: string;
	song?: Song | null;
	playerError?: any;
	playerStatus?: PlayerStatuses;

	playerVisible?: boolean;
	playerLoading?: boolean;
	playerIsMuted?: boolean;
}

const initialState: ContextInterface = {
	// Vars
	song: null,
	playerError: null,
	playerStatus: PlayerStatuses.STOPPED,

	// Toggles
	playerVisible: false,
	playerLoading: false,
	playerIsMuted: false,

	// Context Methods
	setSong: () => null,
	setError: () => null,
	setPlayerStatus: () => null,
	handlePlaySong: () => null,
	handleClickProgressBar: () => null,
	togglePlayerVisible: () => null,
	togglePlayerLoading: () => null,
	toggleMutePlayer: () => null,
	togglePausePlayer: () => null,
};

const AudioPlayerContext = React.createContext(initialState);

const AudioPlayerReducer = (
	state: any,
	{ type, song, playerStatus, playerVisible, playerLoading, playerIsMuted }: ActionsInterface
) => {
	switch (type) {
		// Toggles
		case actions.TOGGLE_PLAYER_VISIBLE:
			actionsLogger(playerVisible, type);
			return updateObj(state, { playerVisible });
		case actions.TOGGLE_PLAYER_LOADING:
			actionsLogger(playerLoading, type);
			return updateObj(state, { playerLoading });
		case actions.TOGGLE_PLAYER_IS_MUTED:
			actionsLogger(playerIsMuted, type);
			return updateObj(state, { playerIsMuted });

		// Setters
		case actions.SET_SONG:
			if (song) actionsLogger(song, type);
			return updateObj(state, { song });
		case actions.SET_PLAYER_STATUS:
			actionsLogger(playerStatus, type);
			return updateObj(state, {
				playerStatus,
				song: playerStatus === PlayerStatuses.STOPPED ? null : state.song,
			});
		default:
			return state;
	}
};

const AudioPlayerProvider = (props: any) => {
	const [state, dispatch] = React.useReducer(AudioPlayerReducer, initialState);

	// A flag to indicate if playback listeners have already been set on audio tag
	const [metaListenerSet, toggleMetaListenerSet] = React.useState<boolean>(false);

	//--------------------------------------------
	// Create player Refs for easy DOM updates
	//--------------------------------------------
	const playerRef = React.useRef<null | HTMLAudioElement>(null);
	const durationRef = React.useRef<null | HTMLElement>(null);
	const currentTimeRef = React.useRef<null | HTMLElement>(null);
	const progressBarRef = React.useRef<null | HTMLElement>(null);
	const progressBarOverlayRef = React.useRef<null | HTMLElement>(null);
	const playbackRef = React.useRef<null | HTMLElement>(null);

	//------------------------------
	// Add Player Event Listeners
	//------------------------------
	React.useEffect(() => {
		if (playerRef && playerRef.current && !metaListenerSet) {
			// ==> Listen for src data being loaded into player
			playerRef.current.addEventListener('loadedmetadata', function () {
				if (playerRef.current) {
					playerRef.current.play();
					dispatch({ type: actions.SET_PLAYER_STATUS, playerStatus: PlayerStatuses.PLAYING });
					dispatch({ type: actions.TOGGLE_PLAYER_VISIBLE, playerVisible: true });
				}
			});

			// ==> Listen for time updates and format progress times and width
			playerRef.current.addEventListener('timeupdate', function (e: any) {
				if (e.target) {
					let total = Math.floor(e.target.duration);
					let currentTime = Math.floor(e.target.currentTime);
					let percentage = Math.floor((currentTime / total) * 100);
					let progBar = document.getElementById('sr-beats-progress-bar');

					if (currentTimeRef.current) currentTimeRef.current.innerText = `${formatSeconds(currentTime)}`;
					if (durationRef.current) durationRef.current.innerText = `${formatSeconds(total)}`;
					if (progBar) progBar.style.width = `${percentage}%`;
				}
			});

			// ==> Listen for a track finishing and end playback
			playerRef.current.addEventListener('ended', function () {
				setTimeout(() => {
					dispatch({ type: actions.SET_PLAYER_STATUS, playerStatus: PlayerStatuses.STOPPED });
					dispatch({ type: actions.TOGGLE_PLAYER_VISIBLE, playerVisible: false });
				}, 1000);
			});

			// ==> Toggle flag to not set same listeners over again
			toggleMetaListenerSet(true);
		}
	}, [metaListenerSet]);

	//-------------------
	// Handlers
	//-------------------
	function handlePlaySong(song: Song) {
		dispatch({ type: actions.SET_PLAYER_STATUS, playerStatus: PlayerStatuses.LOADING });
		dispatch({ type: actions.SET_SONG, song });
		toggleMutePlayer(false);

		if (playerRef && playerRef.current && song.audio.secure_url) {
			playerRef.current.src = song.audio.secure_url;
			handleClickProgressBar();
		}
	}

	const handleClickProgressBar = React.useCallback((e?: any) => {
		// Find existing wrapper containing progress bar
		let originalProgBarWrapperEl = document.getElementById('sr-beats-progress-bar-wrapper') as HTMLElement;

		if (progressBarOverlayRef.current && playerRef.current && originalProgBarWrapperEl) {
			let progBarRects = progressBarOverlayRef.current.getBoundingClientRect();
			let progressBarWidth = progBarRects.width; // Grab width of progress bar
			let clickX = !e ? 0 : e.clientX - progBarRects.left; // Find out where in the bar the click is
			let clickProgress = !e ? 0 : clickX / progressBarWidth; // Calculate the percentage into the song that matches click
			let songDuration = Math.floor(playerRef.current.duration); // Get the duration of the song

			let newPosition = !e ? 0 : songDuration * clickProgress; // Calculate a new playback time

			let playbackWrapperEl = document.getElementById('sr-beats-playback-wrapper') as HTMLElement;

			if (originalProgBarWrapperEl && playbackWrapperEl) {
				// Remove the existing wrapper containing the plaback progress bar
				originalProgBarWrapperEl.remove();

				// Create a new wrapper for a new progress bar
				let newProgBarWrapperEl = document.createElement('div') as HTMLElement;
				Object.entries(AudioPlayer.ProgressWrapperStyle).map((style) => {
					let key = style[0] as string;
					let value = style[1] as string;
					return newProgBarWrapperEl.setAttribute(key, value);
				});

				newProgBarWrapperEl.id = 'sr-beats-progress-bar-wrapper';

				// Add the new wrapper to the DOM
				playbackWrapperEl.insertAdjacentElement('afterbegin', newProgBarWrapperEl);

				// Make new ReactDom root out of the new wrapper
				let root = ReactDOM.createRoot(newProgBarWrapperEl);

				// Render new progress bar component into new wrapper
				root.render(<AudioPlayer.ProgressBar />);
			}

			// Set new playback time in the audio player
			playerRef.current.currentTime = newPosition;
		}
	}, []);

	//-----------------
	// Togglers
	//-----------------
	function togglePlayerVisible(playerVisible: boolean) {
		return dispatch({ type: actions.TOGGLE_PLAYER_VISIBLE, playerVisible });
	}

	function toggleMutePlayer(forceState?: boolean | undefined) {
		if (playerRef.current) {
			let playerIsMuted;

			if (forceState === undefined) {
				if (state.playerIsMuted === false) {
					playerIsMuted = true;
				} else {
					playerIsMuted = false;
				}
			} else {
				playerIsMuted = forceState;
			}

			playerRef.current.muted = playerIsMuted;

			dispatch({
				type: actions.TOGGLE_PLAYER_IS_MUTED,
				playerIsMuted,
			});
		}
	}

	function togglePausePlayer() {
		if (playerRef.current) {
			let playerStatus = state.playerStatus;
			if (state.playerStatus === PlayerStatuses.PLAYING) {
				playerRef.current.pause();
				playerStatus = PlayerStatuses.PAUSED;
			}

			if (state.playerStatus === PlayerStatuses.PAUSED) {
				playerRef.current.play();
				playerStatus = PlayerStatuses.PLAYING;
			}

			dispatch({ type: actions.SET_PLAYER_STATUS, playerStatus });
		}
	}

	return (
		<AudioPlayerContext.Provider
			value={{
				// Vars & Toggles
				...state,

				// Refs
				currentTimeRef,
				durationRef,
				progressBarRef,
				playerRef,
				progressBarOverlayRef,
				playbackRef,

				// Handlers & Togglers
				handlePlaySong,
				handleClickProgressBar,
				togglePlayerVisible,
				toggleMutePlayer,
				togglePausePlayer,
			}}
			{...props}
		/>
	);
};

function actionsLogger(val: any, type: string) {
	if (typeof val === 'object') {
		console.log({ [`dispatch=>${type}`]: val });
	} else {
		console.log(`dispatch => ${type} => ${val}`);
	}
}

export { AudioPlayerContext, AudioPlayerProvider };
