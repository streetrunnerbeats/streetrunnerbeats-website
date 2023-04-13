// React
import * as React from 'react';

// Packages
import { Form } from 'antd';

// Project Imports
import { Loader, Input, Button } from 'components';
import { useForm } from 'hooks';
import { Spacer } from 'layout';
import { adminAPI } from 'apis';

// import Style from './shared.module.scss';

const UpdatePasswordSection = ({ messageApi }: { messageApi: any }) => {
	//----------------------
	//--> Password Update
	//----------------------
	const pwInitialState = { password: '', newPassword: '', confirmPassword: '' };
	const { values: pwVals, onChange: pwOnChange, setValue: pwResetVal } = useForm({ initialState: pwInitialState });
	const [isLoadingUpdatePassword, toggleIsLoadingUpdatePassword] = React.useState<boolean>(false);
	const [pwForm] = Form.useForm();

	const [showForm, toggleShowForm] = React.useState<boolean>(false);

	async function handleUpdatePassword() {
		toggleIsLoadingUpdatePassword(true);
		return adminAPI.updatePassword({ data: pwVals, successCallback, errorHandler });
	}

	function successCallback() {
		pwForm.setFieldsValue(pwInitialState);
		pwResetVal(pwInitialState);
		toggleIsLoadingUpdatePassword(false);

		messageApi.success({
			placement: 'topLeft',
			message: 'Password Updated Successfully!',
		});
	}

	function errorHandler(errors: any) {
		console.log({ errors });
		messageApi.error({
			placement: 'topLeft',
			message: 'There was an error while updating password. Try refreshing the page then try again.',
		});
	}

	return (
		<>
			<h1>Change Password</h1>
			<p style={{ padding: '10px' }}>
				You can update the password for your login. If you need another login to be able to access your admin
				page, contact support.{' '}
			</p>
			{isLoadingUpdatePassword ? (
				<Loader />
			) : !showForm ? (
				<Button onClick={() => toggleShowForm(true)}>Change My Password</Button>
			) : (
				<Form form={pwForm}>
					<Form.Item>
						<Input
							type='password'
							name='password'
							onChange={pwOnChange}
							value={pwVals.password}
							placeholder='Current Password'
						/>
					</Form.Item>
					<Form.Item>
						<Input
							type='password'
							name='newPassword'
							onChange={pwOnChange}
							value={pwVals.newPassword}
							placeholder='New Password'
						/>
					</Form.Item>
					<Form.Item>
						<Input
							type='password'
							name='confirmPassword'
							onChange={pwOnChange}
							value={pwVals.confirmPassword}
							placeholder='Confirm New Password'
						/>
					</Form.Item>

					<Form.Item>
						<Button onClick={handleUpdatePassword}>Update Password</Button>
					</Form.Item>
					<Button type='secondary' onClick={() => toggleShowForm(false)}>
						cancel
					</Button>
				</Form>
			)}
			<Spacer height='45px' />
		</>
	);
};

export default UpdatePasswordSection;
