// ==> React
import * as React from 'react';
import { Navigate } from 'react-router-dom';

// ==> Packages
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Alert } from 'antd';

// ==> Project Imports
import { LoginArgs, RegisterArgs, authAPI } from 'apis/authAPI';
import { useForm } from 'hooks';
import routes from 'routes';
import { Card, Input, Loader } from 'components';
import { TOKEN_LABEL } from 'config';

/**
 *
 * //=================
 * // ==> Login Form
 * //=================
 *
 * @returns a form that can be used to authenticate users with the server
 */

interface LoginInitialState {
	email: string;
	password: string;
	confirmPassword?: string;
}

const initialState: LoginInitialState = {
	email: '',
	password: '',
	confirmPassword: '',
};

export default function AuthForm() {
	// ==> FORM SETUP
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [errors, setErrors] = React.useState<{ [key: string]: string } | any>({});
	const [authSuccess, setAuthSuccess] = React.useState<boolean>(false);
	const [isRegistering] = React.useState<boolean>(false);

	const { values, onChange, onSubmit } = useForm({ callback: handleLogin, initialState });

	// ==> LOCAL HANDLERS
	function successCallback(data: { user: any; token: string }) {
		// Extract success data into User class Model
		const { token } = data;

		// Make sure we got a token back
		if (!token) {
			setIsLoading(false);
			return setErrors({ tokenError: 'User validated but got no token' });
		}

		let existingToken = localStorage.getItem(TOKEN_LABEL);
		if (existingToken) localStorage.removeItem(TOKEN_LABEL);
		localStorage.setItem(TOKEN_LABEL, token);

		/** We should have a good token and valid User; serialize data for redux */
		return setAuthSuccess(true);
	}

	function errorHandler(e: any) {
		const { errors } = e;
		localStorage.removeItem(TOKEN_LABEL);
		setErrors(errors);
		return setIsLoading(false);
	}

	function handleLogin() {
		/** A function that changes the UI, resets the errors, and posts to the user API */
		setIsLoading(true);
		setErrors({});

		if (isRegistering) {
			const authData: RegisterArgs = { data: values, successCallback, errorHandler };
			return authAPI.register(authData);
		}

		const authData: LoginArgs = { data: values, successCallback, errorHandler };
		return authAPI.login(authData);
	}

	return (
		<Card
			primaryHeader
			title={'Admin Login'}
			data-testid={'login-card'}
			bodyStyle={{
				display: isLoading ? 'flex' : 'block',
				justifyContent: 'center',
				padding: isLoading ? '100px 0 ' : '',
			}}>
			{authSuccess ? (
				<>
					<Navigate to={routes.AUTH_SUCCESS_REDIRECT} replace />
					{/* Required for testing redirect gets rendered */}
					<div data-testid='login-redirect' />
				</>
			) : isLoading ? (
				<Loader loadingText='Logging in' includeText />
			) : (
				<Form name='login_form' data-testid={'login-form'} initialValues={values}>
					<Form.Item name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
						<Input
							name='email'
							onChange={onChange}
							prefix={<UserOutlined className='site-form-item-icon' />}
							placeholder='Email'
						/>
					</Form.Item>
					<Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
						<Input
							name='password'
							onChange={onChange}
							prefix={<LockOutlined className='site-form-item-icon' />}
							type='password'
							placeholder='Password'
						/>
					</Form.Item>
					{isRegistering && (
						<Form.Item
							name='confirmPassword'
							rules={[{ required: true, message: 'Please input your Password!' }]}>
							<Input
								name='confirmPassword'
								onChange={onChange}
								prefix={<LockOutlined className='site-form-item-icon' />}
								type='password'
								placeholder='Confirm Password'
							/>
						</Form.Item>
					)}

					<Form.Item>
						<Button
							data-testid='login-button'
							onClick={onSubmit}
							type='primary'
							name='login'
							htmlType='submit'
							className='login-form-button'
							block>
							{isRegistering ? 'Register User' : 'Log in'}
						</Button>
					</Form.Item>
				</Form>
			)}

			{/* Render out any form errors from the login attempt */}
			{Object.entries(errors).length > 0 && (
				<Alert
					type='error'
					data-testid='errors-container'
					message={
						<ul style={{ margin: '0' }}>
							{Object.keys(errors).map((er, i) => {
								return <li key={i}>{errors[er]}</li>;
							})}
						</ul>
					}
				/>
			)}
		</Card>
	);
}
