import * as React from 'react';

// Project
import { Song, Album } from 'types';
import { audioAPI } from 'apis';
import { MockAlbums } from 'mockdata';
import { updateObj } from 'util/index';

// Contexts
import actions from './actionTypes';

export interface ManageDiscographyInterface {
	// Context Data
	songs: Song[];
	albums: Album[];

	// Context State
	isLoading: boolean;

	showNewSongForm: boolean;
	showDeleteSongModal: boolean;
	showSongPhotoModal: boolean;
	showReplaceAudioModal: boolean;
	showUpdateAlbumModal: boolean;
	showUpdateSongDetailsModal: boolean;

	// Focus Values
	songUpdateFocus: null | Song;
	albumUpdateFocus: null | Album;

	errors: any;

	// Context Methods
	toggleAdminValue: (toggles: ToggleValuesInterface) => void;
	setData: (data: SetterDataInterface) => void;

	handleUploadNewSong: Function;
	handleUpdateSongDetails: Function;
	handleDeleteSong: Function;
	handleReplaceAudio: Function;
	handleAddSongPhoto: Function;
	handleDeleteSongPhoto: Function;
	handleUpdateAlbum: Function;

	toggleIsLoading: Function;
	toggleIsRemovingSongPhoto: Function;
}

const initialState: ManageDiscographyInterface = {
	// State Data
	albums: [...MockAlbums] as Album[],
	songs: [] as Song[],

	// Loading Flags
	isLoading: false,

	// Form Flags
	showNewSongForm: false,
	showDeleteSongModal: false,
	showSongPhotoModal: false,
	showReplaceAudioModal: false,
	showUpdateSongDetailsModal: false,
	showUpdateAlbumModal: false,

	// Focus Variables
	songUpdateFocus: null,
	albumUpdateFocus: null,

	errors: null,

	toggleAdminValue() {},
	setData() {},

	// Context Methods
	handleAddSongPhoto: () => null,
	handleDeleteSong: () => null,
	handleReplaceAudio: () => null,
	handleDeleteSongPhoto: () => null,
	handleUpdateAlbum: () => null,
	handleUpdateSongDetails: () => null,
	handleUploadNewSong: () => null,

	toggleIsLoading: () => null,
	toggleIsRemovingSongPhoto: () => null,
};

const ManageDiscographyContext = React.createContext<ManageDiscographyInterface>(initialState);

interface SetterDataInterface {
	song?: Song;
	songs?: Song[];
	album?: Album;
	albums?: Album[];

	errors?: any;

	albumUpdateFocus?: null | Album;
	songUpdateFocus?: null | Song;
}

interface ToggleValuesInterface {
	// Loading Toggles
	isLoading?: boolean;
	// Form Toggles
	showNewSongForm?: boolean;
	showDeleteSongModal?: boolean;
	showUpdateAlbumModal?: boolean;
	showSongPhotoModal?: boolean;
	showReplaceAudioModal?: boolean;
	showUpdateSongDetailsModal?: boolean;
}

interface ReducerInterface {
	type: string;
	toggles?: ToggleValuesInterface;
	data?: SetterDataInterface;
	errors?: any;
}

const DiscographyReducer = (state: any, { type, data, toggles, errors }: ReducerInterface) => {
	switch (type) {
		case actions.SET_ERROR:
			return updateObj(state, { errors });
		case actions.TOGGLE_VALUE:
			return updateObj(state, toggles);
		case actions.SET_DATA:
			return updateObj(state, data);
		default:
			return state;
	}
};

interface GeneralErrorHandlerInterface {
	errors: any;
	callback?: Function;
	toggles?: ToggleValuesInterface;
	data?: SetterDataInterface;
}

const ManageDiscographyProvider = (props: any) => {
	const [state, dispatch] = React.useReducer(DiscographyReducer, initialState);

	//=====================
	//===> NEW HANDLERS
	//=====================
	// -> New Action Functions
	const toggleAdminValue = (toggles: ToggleValuesInterface) => dispatch({ type: actions.TOGGLE_VALUE, toggles });
	const setData = (data: SetterDataInterface) => dispatch({ type: actions.SET_DATA, data });

	// -> New Helper Functions
	function replaceSongInStateHelper(song: Song) {
		let songs = !song ? state.songs : state.songs.map((s: Song) => (s._id === song._id ? song : s));
		return setData({ songs });
	}

	function removeSongFromStateHelper(song: Song) {
		let songs = !song ? state.songs : state.songs.filter((s: Song) => s._id.toString() !== song._id.toString());
		return setData({ songs });
	}

	// Generic Handlers
	function generalErrorHandler({ errors, callback, toggles, data }: GeneralErrorHandlerInterface) {
		console.log({ errors });
		if (callback) callback(errors);
		if (toggles) toggleAdminValue(toggles);
		if (data) setData(data);
	}

	//----------------------------
	//==> API Functions
	//----------------------------
	async function handleUploadNewSong(data: any, success: Function, handleError: Function) {
		function successCallback(data: any) {
			const { album, song } = data;

			if (album && song) {
				let [songs, albums] = [
					[...state.songs, song],
					[...state.albums, album],
				];
				setData({ albums, songs });
				success();
			}

			toggleAdminValue({ showNewSongForm: false, isLoading: false });
		}

		const errorCallback = (errors: any) =>
			generalErrorHandler({ errors, callback: handleError, toggles: { isLoading: false } });

		if (data.audio) {
			toggleAdminValue({ isLoading: true });
			const multipart_form_data = new FormData();
			Object.entries(data).map((entry: any) => multipart_form_data.append(entry[0], entry[1]));
			return audioAPI.addNewSong({ data: multipart_form_data, successCallback, errorCallback });
		}
	}

	//=========================
	//== Update Song Details
	//=========================
	async function handleUpdateSongDetails(data: any) {
		function successCallback(data: any) {
			if (data.song) {
				replaceSongInStateHelper(data.song);
				setData({ songUpdateFocus: null });
				toggleAdminValue({ showUpdateSongDetailsModal: false });
			}
			toggleAdminValue({ isLoading: false });
		}

		const errorCallback = (errors: any) => generalErrorHandler({ errors, toggles: { isLoading: false } });

		if (data && state.songUpdateFocus) {
			toggleAdminValue({ isLoading: true });
			const multipart_form_data = new FormData();
			Object.entries(data).map((entry: any) => multipart_form_data.append(entry[0], entry[1]));
			return audioAPI.updateSong({
				data: multipart_form_data,
				successCallback,
				errorCallback,
				updateId: state.songUpdateFocus._id,
			});
		}
	}

	//=======================
	//== Replace Song Audio
	//=======================
	async function handleReplaceAudio(data: any, success: Function, handleError: Function) {
		const successCallback = (data: any) => {
			if (data.song) {
				replaceSongInStateHelper(data.song);
				success(data);
				setData({ songUpdateFocus: null });
				toggleAdminValue({ showReplaceAudioModal: false });
			}
			toggleAdminValue({ isLoading: false });
		};

		const errorCallback = (errors: any) =>
			generalErrorHandler({ errors, callback: handleError, toggles: { isLoading: false } });

		if (data && state.songUpdateFocus) {
			toggleAdminValue({ isLoading: true });
			const multipart_form_data = new FormData();
			Object.entries(data).map((entry: any) => multipart_form_data.append(entry[0], entry[1]));

			return audioAPI.replaceAudio({
				data: multipart_form_data,
				successCallback,
				errorCallback,
				updateId: state.songUpdateFocus._id,
			});
		}
	}

	//================
	//== Delete Song
	//================
	async function handleDeleteSong(song: Song) {
		const successCallback = (data: any) => {
			if (data.deletedSong) removeSongFromStateHelper(data.deletedSong);
			toggleAdminValue({ showDeleteSongModal: false, isLoading: false });
		};

		const errorCallback = (errors: any) => {
			toggleAdminValue({ isLoading: false });
			console.log({ errors });
		};
		return audioAPI.deleteSong({ data: song, successCallback, errorCallback });
	}

	//=========================
	//== Update Album Details
	//=========================
	async function handleUpdateAlbum(data: any) {
		const successCallback = (data: any) => {
			const { album } = data;
			if (album) {
				let albums = !album ? state.albums : state.albums.map((a: Album) => (a._id !== album._id ? a : album));
				let songs = !album
					? state.songs
					: state.songs.map((s: Song) => {
							if (s.album._id === album._id) return { ...s, album };
							return s;
					  });
				setData({ albumUpdateFocus: null, albums, songs });
				toggleAdminValue({ showUpdateAlbumModal: false });
			}
			// maybe hereeee???   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
			toggleAdminValue({ isLoading: false });
		};

		const errorCallback = (errors: any) => generalErrorHandler({ errors, toggles: { isLoading: false } });

		if (data && state.albumUpdateFocus) {
			toggleAdminValue({ isLoading: true });
			const multipart_form_data = new FormData();

			Object.entries(data).map((entry: any) => multipart_form_data.append(entry[0], entry[1]));
			return audioAPI.updateAlbum({
				data: multipart_form_data,
				successCallback,
				errorCallback,
				updateId: state.albumUpdateFocus._id,
			});
		}
	}

	//=======================
	//== Add Song Photo
	//=======================
	async function handleAddSongPhoto(data: any) {
		toggleAdminValue({ isLoading: true });

		const multipart_form_data = new FormData();
		Object.entries(data).map((entry: any) => multipart_form_data.append(entry[0], entry[1]));

		const successCallback = (data: any) => {
			if (data.song) {
				replaceSongInStateHelper(data.song);
				setData({ songUpdateFocus: null });
				toggleAdminValue({ showSongPhotoModal: false });
			}
			toggleAdminValue({ isLoading: false });
		};

		function errorCallback(errors: any) {
			toggleAdminValue({ isLoading: false });
		}

		return audioAPI.uploadSongPhoto({ data: multipart_form_data, successCallback, errorCallback });
	}

	//=======================
	//== Remove Song Photo
	//=======================
	async function handleDeleteSongPhoto(songId: string) {
		toggleAdminValue({ isLoading: true });

		function successCallback(data: any) {
			let { song } = data;
			if (song) {
				replaceSongInStateHelper(song);
				setData({ songUpdateFocus: null });
				toggleAdminValue({ showSongPhotoModal: false });
			}

			toggleAdminValue({ isLoading: false });
		}

		function errorCallback(errors: any) {
			console.log({ errors });
		}

		return audioAPI.deleteSongPhoto({ data: { songId }, successCallback, errorCallback });
	}

	/**
	 *---------------------
	 * FETCHING AUDIO INIT
	 *---------------------
	 * This context only mounts if the user is authenticated. Fetch all audio in DB and load into state
	 */
	const fetchAdminAudio = React.useCallback(async () => {
		toggleAdminValue({ isLoading: true });
		let { songs } = await audioAPI.fetchSongs();

		let albums = [] as Album[];
		let albumIds = [] as string[];

		await songs.map((song: Song) => {
			if (!albumIds.includes(song.album._id)) {
				albumIds.push(song.album._id);
				albums.push(song.album);
			}
			return null;
		});

		setData({ songs, albums });
		toggleAdminValue({ isLoading: false });
		return songs;
	}, []);

	React.useEffect(() => {
		fetchAdminAudio();
	}, [fetchAdminAudio]);

	return (
		<ManageDiscographyContext.Provider
			value={{
				// Data
				...state,
				songs: state.songs ? state.songs : [],

				// NEW
				toggleAdminValue,
				setData,

				// Create/Delete
				handleUploadNewSong,
				handleDeleteSong,

				// Updaters
				handleUpdateSongDetails,
				handleUpdateAlbum,
				handleReplaceAudio,

				// Song Photos
				handleAddSongPhoto,
				handleDeleteSongPhoto,
			}}
			{...props}
		/>
	);
};

export { ManageDiscographyContext, ManageDiscographyProvider };
