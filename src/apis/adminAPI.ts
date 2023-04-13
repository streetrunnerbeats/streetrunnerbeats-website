// ==> Packages
import axios from 'axios';

// ==> Project Imports
import routes from 'routes';
import { DEFAULT_HEADERS, TOKEN_LABEL } from 'config';

import { Photo } from 'types';

import type { LoginArgs } from './authAPI';

let apiInstance = axios.create({ headers: DEFAULT_HEADERS });

const adminAPI = {
	//---------------
	// >> Account
	//---------------
	updatePassword({ data, successCallback }: LoginArgs) {
		/** Check for token in local storage */
		let token = localStorage.getItem(TOKEN_LABEL);

		/** Ensure existing token is in headers */
		apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		return apiInstance({
			data,
			method: 'POST',
			url: `${routes.SERVER_URL}${routes.SERVER_AUTH}${routes.SERVER_AUTH_UPDATE_PW}`,
		})
			.then(({ data }) => {
				if (data.success) {
					if (successCallback) successCallback(data);
				}
				console.log({ success: data });
			})
			.catch((errors) => {
				console.log({ errors });
			});
	},
	//---------------
	// >> YouTube
	//---------------
	updateYouTubePlaylist(data: any, success: Function, errorHandler: Function) {
		let token = localStorage.getItem(TOKEN_LABEL);
		/** Ensure existing token is in headers */
		apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		return apiInstance({
			data,
			url: `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_VIDEO}`,
			method: 'PUT',
		})
			.then(({ data }) => {
				if (success) success(data);
			})
			.catch((errors) => {
				if (errorHandler) errorHandler(errors);
			});
	},
	//---------------
	// >> Photo Reel
	//---------------
	uploadReelPhoto(data: any, success: Function, errorHandler: Function) {
		let token = localStorage.getItem(TOKEN_LABEL);
		/** Ensure existing token is in headers */
		let mulipartFormInstance = axios.create({
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		mulipartFormInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		return mulipartFormInstance({
			data,
			url: `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_PHOTO}${routes.PHOTO_REEL}`,
			method: 'POST',
		})
			.then(({ data }) => {
				if (success) success(data);
			})
			.catch((errors) => {
				console.log(errors.response.data.errors);
				if (errorHandler) errorHandler(errors);
			});
	},
	deleteReelPhoto(data: Photo, success: Function, errorHandler: Function) {
		let token = localStorage.getItem(TOKEN_LABEL);
		/** Ensure existing token is in headers */
		apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		if (!data._id) return { errors: { missingData: 'No photo ID was provided' } };
		return apiInstance({
			method: 'DELETE',
			url: `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_PHOTO}${routes.PHOTO_REEL}?photo_id=${data._id}`,
		})
			.then((data) => success(data))
			.catch((errors) => errorHandler(errors));
	},
	getReelPhotos(handleSuccess: Function, handleError: Function) {
		return apiInstance({
			method: 'GET',
			url: `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_PHOTO}${routes.PHOTO_REEL}`,
		})
			.then((data) => handleSuccess(data))
			.catch((errors) => handleError(errors));
	},
};

export default adminAPI;
