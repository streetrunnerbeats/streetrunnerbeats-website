import { updateObj } from 'util/index';

export default function parseApiError(error) {
	let parsedError = { type: 'error' };

	// GRAPHQL error return format
	if (error.graphQLErrors) {
		if (error.graphQLErrors.length > 0) {
			const { code, exception } = error.graphQLErrors[0].extensions;
			parsedError = updateObj(parsedError, {
				message: error.message,
				code: code,
				path: error.graphQLErrors[0].path[0],
				...exception,
			});
		}
	} else {
		if (error.status) {
			parsedError = updateObj(parsedError, {
				message: error.message,
				status: error.status,
			});
		} else {
			if (error)
				parsedError = updateObj(parsedError, {
					message: error.message || 'There was an internal error',
				});
		}
	}

	// REST error return format

	return parsedError;
}
