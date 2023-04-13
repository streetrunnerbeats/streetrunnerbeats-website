import axios from 'axios';
import routes from 'routes';
import { TOKEN_LABEL } from 'config';

interface APICallInterface {
	data: any;
	successCallback?: Function;
	errorCallback?: Function;
}

interface APIInterface extends APICallInterface {
	method: string;
	url: string;
}

let apiInstance = axios.create({
	headers: {
		'Content-Type': 'multipart/form-data',
	},
});

function apiWithToken({ data, successCallback, errorCallback, method, url }: APIInterface) {
	let token = localStorage.getItem(TOKEN_LABEL);
	apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

	return apiInstance({
		data,
		method,
		url,
	})
		.then(({ data }) => {
			if (successCallback) successCallback(data);
		})
		.catch((errors) => {
			console.log(errors);
			if (errorCallback) errorCallback(errors);
		});
}

const audioAPI = {
	addNewSong({ data, successCallback, errorCallback }: APICallInterface) {
		let url = `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}`;
		return apiWithToken({ data, successCallback, errorCallback, method: 'POST', url });
	},
	deleteSong({ data, successCallback, errorCallback }: APICallInterface) {
		let url = `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}?delete_song=${data._id}`;
		return apiWithToken({ data, successCallback, errorCallback, method: 'DELETE', url });
	},
	updateSong({ data, successCallback, errorCallback, updateId }: APICallInterface & { updateId: string }) {
		let url = `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}?update_id=${updateId}`;
		return apiWithToken({ data, successCallback, errorCallback, method: 'PUT', url });
	},
	replaceAudio({ data, successCallback, errorCallback, updateId }: APICallInterface & { updateId: string }) {
		let url = `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}${routes.MUSIC_REPLACE_AUDIO}?update_id=${updateId}`;
		return apiWithToken({ data, successCallback, errorCallback, url, method: 'PUT' });
	},
	updateAlbum({ data, successCallback, errorCallback, updateId }: APICallInterface & { updateId: string }) {
		let url = `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}${routes.MUSIC_UPDATE_ALBUM}?update_id=${updateId}`;
		return apiWithToken({ data, successCallback, errorCallback, url, method: 'PUT' });
	},
	uploadSongPhoto({ data, successCallback, errorCallback }: APICallInterface) {
		let url = `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}${routes.MUSIC_SONG_PHOTO}`;
		return apiWithToken({ data, successCallback, errorCallback, url, method: 'POST' });
	},
	deleteSongPhoto({ data, successCallback, errorCallback }: APICallInterface) {
		let url = `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}${routes.MUSIC_SONG_PHOTO}?song_id=${data.songId}`;
		return apiWithToken({ data, successCallback, errorCallback, url, method: 'DELETE' });
	},
	fetchSongs(query?: string) {
		return apiInstance({
			method: 'GET',
			url: `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}${
				query ? `?${query}` : ''
			}`,
		})
			.then(({ data }) => {
				return data;
			})
			.catch((errors) => {
				console.log(errors);
			});
	},
};

export { audioAPI };
export default audioAPI;
