// React
import * as React from 'react';

// Packages
import { Form } from 'antd';

// Project Imports
import { PhotoInput, Button, Loader } from 'components';
import { ManageDiscographyContext } from 'contexts';
import { ManageDiscographyInterface } from 'contexts/manageDiscography';

import { useForm } from 'hooks';

const ManageSongPhotoForm = () => {
	//==> Context
	const { isLoading, toggleAdminValue, setData, songUpdateFocus, handleAddSongPhoto, handleDeleteSongPhoto } =
		React.useContext<ManageDiscographyInterface>(ManageDiscographyContext);

	//==> Form Data
	const [form] = Form.useForm();
	const [photoUpdatePreview, setPhotoUpdatePreview] = React.useState(
		songUpdateFocus && songUpdateFocus.photo ? songUpdateFocus.photo.secure_url : ''
	);
	const { values, onChange } = useForm({
		initialState: {
			photo: null,
		},
	});

	//==> Local Handlers
	const cancel = () => {
		setData({ songUpdateFocus: null });
		toggleAdminValue({ isLoading: false });
	};
	const confirmRemoval = () => songUpdateFocus && handleDeleteSongPhoto(songUpdateFocus._id);
	const confirmUpload = () => songUpdateFocus && handleAddSongPhoto({ ...values, songId: songUpdateFocus._id });

	return (
		<Form form={form}>
			{isLoading ? (
				<Loader />
			) : (
				songUpdateFocus && (
					<>
						<PhotoInput.PhotoPreview preview={photoUpdatePreview} name='photo' />
						<PhotoInput.ResetWrapper name='photo'>
							<PhotoInput name='photo' setterCallback={setPhotoUpdatePreview} onChange={onChange} />
						</PhotoInput.ResetWrapper>

						<div style={{ padding: '10px' }}>
							<Button onClick={cancel} type='secondary'>
								Cancel
							</Button>
							<Button onClick={confirmUpload} type='primary'>
								Update
							</Button>
							{songUpdateFocus.photo && (
								<Button onClick={confirmRemoval}>Remove & Use Album Photo</Button>
							)}
						</div>
					</>
				)
			)}
		</Form>
	);
};

export default ManageSongPhotoForm;
