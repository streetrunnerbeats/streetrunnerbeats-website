// ==> React
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// ==> Project Imports
import { authAPI } from 'apis';
import routes from 'routes';
import { TOKEN_LABEL } from 'config';

/**
 *--------------------------------
 * => ProtectedPageWrapper
 *--------------------------------
 *
 * @param {JSX.Element | JSX.Element[]} children - A page component that required authentication for the user to remain on
 *
 * @returns a wrapper that will protect pages that require authentication
 */

interface ProtectedPageWrapperProps {
	validForward?: string | null;
	children?: JSX.Element | JSX.Element[];
}

export default function ProtectedPageWrapper({ validForward = null, children }: ProtectedPageWrapperProps) {
	// ==> Redux Hooks
	const navigate = useNavigate();
	let token = localStorage.getItem(TOKEN_LABEL);

	const handleNoAuthRedirect = React.useCallback(() => {
		localStorage.removeItem(TOKEN_LABEL);
		navigate(routes.CMS_NO_AUTH_FWD);
	}, [navigate]);

	/** A callback for verifying the current token is valid */
	const verifyTokenCallback = React.useCallback(
		(responseToken: null | string) => {
			if (!responseToken || !token) {
				/** If we recieved null, the token is invalid and any account info should be cleared */
				handleNoAuthRedirect();
			} else {
				/** If the token is valid, the page might automatically move the user away. e.g. a login
				 * page should send an authorized user to their dash or something */
				if (validForward) navigate(validForward);
			}
		},
		[handleNoAuthRedirect, navigate, token, validForward]
	);

	React.useEffect(() => {
		/** Use api to verify token on component mount */
		authAPI.verifyToken(verifyTokenCallback);
	}, [verifyTokenCallback]);

	return <>{children}</>;
}
