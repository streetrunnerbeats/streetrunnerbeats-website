import * as React from 'react';
import { Form, notification, Spin } from 'antd';
import { Button } from 'components';
import { ManageDiscographyContext } from 'contexts';
import { checkAudioFile } from './songValidators';
import { useForm } from 'hooks';

import UploadAudioSection from './songFormComponents/section_Audio';

const ReplaceSongForm = () => {
	const { values, onChange } = useForm({ initialState: { audio: null } });
	const [form] = Form.useForm();
	const { toggleAdminValue, setData, isLoading, handleReplaceAudio } = React.useContext(ManageDiscographyContext);
	const [errors, setErrors] = React.useState<any>(null);
	const [api, contextHolder] = notification.useNotification();

	async function handleConfirmReplaceAudio() {
		const { errors } = await checkAudioFile(values);

		if (errors) setErrors(errors);
		handleReplaceAudio(values, successCallback, errorCallback);
	}

	function successCallback(data: any) {
		console.log('All should be a success!!');
		console.log({ data });
	}

	function errorCallback(errors: any) {
		console.log({ errors });
		setErrors(errors.response.data.errors);
	}

	const cancel = () => {
		setData({ songUpdateFocus: null });
		toggleAdminValue({ showReplaceAudioModal: false });
	};

	React.useEffect(() => {
		return () => {
			form.setFieldsValue({ audio: null });
		};
	});

	React.useEffect(() => {
		if (errors) {
			Object.entries(errors).map((error) => {
				let description = error[1] as string;

				return api.error({
					duration: 2,
					message: 'error',
					description,
					placement: 'top',
				});
			});

			setErrors(null);
		}
	}, [api, errors]);

	return (
		<Form form={form}>
			{contextHolder}
			{isLoading ? (
				<Spin />
			) : (
				<>
					<UploadAudioSection onChange={onChange} values={values} />
					<div>
						<Button onClick={cancel} type='secondary'>
							Cancel
						</Button>
						<Button onClick={handleConfirmReplaceAudio} type='primary'>
							Replace Audio
						</Button>
					</div>
				</>
			)}
		</Form>
	);
};

export default ReplaceSongForm;
