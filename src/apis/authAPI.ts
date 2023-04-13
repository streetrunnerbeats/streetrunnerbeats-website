// ==> Packages
import axios from 'axios';

// ==> Project Imports
import routes from 'routes';
import { DEFAULT_HEADERS, TOKEN_LABEL } from 'config';

/**
 *
 * ========================
 * ==> USER ACCOUNT API
 * ========================
 * An API for interactions with the database that involve the user's account information and general
 * account functionality. For browsing and fetching users, use the 'userAPI.ts'
 *
 *
 * This API is intended to ONLY HANDLE SERVER CALLS. Interactions with the DB through the server should be written in here.
 * There should be NO METHODS in this API that handle client-side state management in redux or contexts.
 *
 * @method register - Accespts register args to register a new user to the server
 * @method login - Accepts a username and password to authenticate a user with the server
 * @method verifyToken - Will get token out of local storage and confirm with the server that it is valid. Will pass token if good, null if expired/invalid
 *
 */

//•••••••••••••••••••••••••
// ==> Interfaces
//•••••••••••••••••••••••••

// ==> LOCAL INTERFACES
interface Callbacks {
	successCallback?: Function;
	errorHandler?: Function;
}

interface SharedInput {
	email: string;
	password: string;
}

interface Register {
	data: SharedInput & { confirmPassword: string };
}

interface Login {
	data: SharedInput;
}

// ==> INPUT INTERFACES
export interface RegisterArgs extends Register, Callbacks {}
export interface LoginArgs extends Login, Callbacks {}

//•••••••••••••••••••••••••
// ==> User Account API
//•••••••••••••••••••••••••

// ==> AXIOS INSTANCE
let apiInstance = axios.create({ headers: DEFAULT_HEADERS });

const authAPI = {
	register({ data, successCallback, errorHandler }: RegisterArgs) {
		return apiInstance({
			data,
			method: 'POST',
			url: `${routes.SERVER_URL}${routes.SERVER_AUTH}${routes.SERVER_AUTH_REGISTER}`,
		})
			.then(({ data }) => {
				if (successCallback) successCallback(data);
			})
			.catch((e) => {
				let errors = e.response.data.errors;
				if (errorHandler) errorHandler({ errors });
			});
	},
	login({ data, successCallback, errorHandler }: LoginArgs) {
		return apiInstance({
			data,
			method: 'POST',
			url: `${routes.SERVER_URL}${routes.SERVER_AUTH}${routes.SERVER_AUTH_LOGIN}`,
		})
			.then(({ data }) => {
				const { success } = data;
				if (success) {
					if (successCallback) successCallback(data);
				}
			})
			.catch((e) => {
				let errors = e.response.data.errors;
				if (errorHandler) errorHandler({ errors });
			});
	},
	verifyToken(verifyCallback: (result: null | string) => void) {
		/** Check for token in local storage */
		let token = localStorage.getItem(TOKEN_LABEL);

		if (!token) return verifyCallback(null);

		/** Ensure existing token is in headers */
		apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		return apiInstance({
			method: 'GET',
			url: `${routes.SERVER_URL}${routes.SERVER_AUTH}${routes.SERVER_AUTH_VERIFY_TOKEN}`,
		})
			.then(({ data }) => {
				/** Pass token to set valid token in redux */
				if (data.token) verifyCallback(token);
			})
			.catch((_) => {
				/** The token was no good. Send back null through callback */
				verifyCallback(null);
			});
	},
};

export { authAPI };
export default authAPI;
