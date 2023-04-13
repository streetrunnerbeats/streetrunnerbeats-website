import { AuthForm } from 'components';
import { ContentCol, SecurityWrapper } from 'layout';
import routes from 'routes';

const AuthPage = () => {
	return (
		<SecurityWrapper validForward={routes.AUTH_SUCCESS_REDIRECT}>
			<ContentCol>
				<AuthForm />
			</ContentCol>
		</SecurityWrapper>
	);
};

export default AuthPage;
