import * as React from 'react';

import { Form, Spin } from 'antd';

import { ManageDiscographyContext } from 'contexts';
import { Input, Button, PhotoInput } from 'components';
import { useForm } from 'hooks';

const UpdateAlbumForm = () => {
	const { isLoading, setData, albumUpdateFocus, handleUpdateAlbum } = React.useContext(ManageDiscographyContext);
	const [form] = Form.useForm();
	const { values, onChange, setValue } = useForm({
		initialState: {
			title: albumUpdateFocus ? albumUpdateFocus.title : '',
			year: albumUpdateFocus ? albumUpdateFocus.year : null,
			artist: albumUpdateFocus ? albumUpdateFocus.artist : '',
			newAlbumPhoto: null,
		},
	});

	function handleConfirmUpdateAlbum() {
		return handleUpdateAlbum(values);
	}

	const [photoUpdatePreview, setPhotoUpdatePreview] = React.useState(
		albumUpdateFocus && albumUpdateFocus.photo ? albumUpdateFocus.photo.secure_url : ''
	);

	const cancelAlbumUpdate = React.useCallback(() => {
		setData({ albumUpdateFocus: null });
	}, [setData]);

	React.useEffect(() => {
		if (!albumUpdateFocus && values.newAlbumPhoto !== null) {
			setPhotoUpdatePreview('');
			form.setFieldsValue({
				title: '',
				year: null,
				artist: '',
				newAlbumPhoto: null,
			});
			setValue({ newAlbumPhoto: null });
		}
	}, [form, setValue, albumUpdateFocus, values.newAlbumPhoto]);

	return (
		<Form form={form}>
			{isLoading ? (
				<Spin />
			) : (
				<>
					<Form.Item>
						<Input name='title' value={values.title} onChange={onChange} placeholder='Album Title' />
					</Form.Item>
					<Form.Item>
						<Input name='artist' value={values.artist} onChange={onChange} placeholder='Artist' />
					</Form.Item>
					<Form.Item>
						<Input name='year' value={values.year} onChange={onChange} placeholder='Year' />
					</Form.Item>
					{albumUpdateFocus && (
						<PhotoInput.PhotoPreview
							preview={
								photoUpdatePreview === '' && albumUpdateFocus.photo
									? albumUpdateFocus.photo.secure_url
									: photoUpdatePreview
							}
							name='newAlbumPhoto'
						/>
					)}
					<PhotoInput.ResetWrapper name='newAlbumPhoto'>
						<PhotoInput name='newAlbumPhoto' setterCallback={setPhotoUpdatePreview} onChange={onChange} />
					</PhotoInput.ResetWrapper>

					<div
						style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'space-between',
							paddingTop: '15px',
						}}>
						<Button onClick={cancelAlbumUpdate} type='secondary'>
							Cancel
						</Button>
						<Button onClick={handleConfirmUpdateAlbum} type='primary'>
							Update Album
						</Button>
					</div>
				</>
			)}
		</Form>
	);
};

export default UpdateAlbumForm;
