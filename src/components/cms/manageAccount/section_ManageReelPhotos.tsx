// ==> React
import * as React from 'react';

// ==> Packages
import { Modal, Image } from 'antd';

// ==> Project Imports
import { Button, Loader, PhotoInput, IconifyIcon, ICON_CLOSE } from 'components';
import { Spacer } from 'layout';
import { adminAPI } from 'apis';
import { useForm } from 'hooks';
import { Photo } from 'types';

import Style from './shared.module.scss';

const ManageReelPhotos = ({ messageApi }: { messageApi: any }) => {
	//--------------------
	//>> Photo Reel
	//--------------------
	const [isAddingReelPhoto, toggleIsAddingReelPhoto] = React.useState<boolean>(false);
	const [newReelPhotoPreview, setNewReelPhotoPreview] = React.useState<string>('');

	const [currentReelPhotos, setCurrentReelPhotos] = React.useState([] as Photo[]);
	const [fetchedInitialReelphotos, toggleFetchedInitialReelphotos] = React.useState<boolean>(false);

	const { values: rpValues, onChange: rpOnChange, setValue } = useForm({ initialState: { newReelPhoto: null } });

	const [isUploading, setIsUploading] = React.useState<boolean>(false);

	function handleCloseNewReelPhoto() {
		toggleIsAddingReelPhoto(false);
		setNewReelPhotoPreview('');
		setValue({ newReelPhoto: null });
	}

	function handleConfirmUploadPhoto() {
		setIsUploading(true);
		const multipart_form_data = new FormData();

		Object.entries(rpValues).map((entry: any) => {
			// console.log({ [entry[0]]: entry[1] });
			return multipart_form_data.append(entry[0], entry[1]);
		});
		// console.log({ multipart_form_data });
		return adminAPI.uploadReelPhoto(multipart_form_data, newReelphotoSuccess, newReelPhotoError);
	}

	function newReelphotoSuccess(data: any) {
		setCurrentReelPhotos([...currentReelPhotos, data.newReelPhoto]);
		handleCloseNewReelPhoto();
		setIsUploading(false);

		messageApi.success({
			placement: 'topLeft',
			message: 'Photo successfully added to reel',
		});
	}

	function newReelPhotoError(errors: any) {
		console.log({ errors });
		setIsUploading(false);
	}

	const fetchReelPhotos = React.useCallback(() => {
		return adminAPI.getReelPhotos(fetchPhotosSuccess, fetchPhotosError);
	}, []);

	function fetchPhotosSuccess({ data }: { data: any }) {
		console.log(data);
		setCurrentReelPhotos(data.reelPhotos);
	}

	function fetchPhotosError({ errors }: { errors: any }) {
		console.log({ errors });
	}

	React.useEffect(() => {
		if (!fetchedInitialReelphotos) {
			fetchReelPhotos();
			toggleFetchedInitialReelphotos(true);
		}
	}, [fetchReelPhotos, fetchedInitialReelphotos]);

	// DELETING A PHOTO
	const [focusDeletePhoto, setFocusDeletePhoto] = React.useState<null | Photo>(null);
	const [isDeletingPhoto, toggleIsDeletingPhoto] = React.useState<boolean>(false);

	function confirmDeleteReelPhoto() {
		toggleIsDeletingPhoto(true);
		if (focusDeletePhoto)
			return adminAPI.deleteReelPhoto(focusDeletePhoto, deleteReelPhotoSuccess, deletePhotoError);
	}

	function deleteReelPhotoSuccess({ data }: { data: any }) {
		let updatedReelPhotos: Photo[] = currentReelPhotos.filter((photo) => photo._id !== data.removedPhoto);
		setCurrentReelPhotos(updatedReelPhotos);
		setFocusDeletePhoto(null);
		toggleIsDeletingPhoto(false);

		messageApi.success({
			placement: 'topLeft',
			message: 'Photo successfully deleted from reel',
		});
	}

	function deletePhotoError(errors: any) {
		console.log({ errors });
	}

	return (
		<>
			<Spacer height='45px' />
			<h1>Reel Photos</h1>
			<div className={Style.ThumbnailCollectionWrapper}>
				{currentReelPhotos.map((photo: Photo) => (
					<div key={photo._id} className={Style.ThumbnailWrapper}>
						<div className={Style.DeleteIcon} onClick={() => setFocusDeletePhoto(photo)}>
							<IconifyIcon size='sm' icon={ICON_CLOSE} />
						</div>
						<Image src={photo.secure_url} alt='reelphoto' />
					</div>
				))}
			</div>
			<Button onClick={() => toggleIsAddingReelPhoto(true)}>Add Photo To Reel</Button>
			<Spacer height='100px' divider />
			<Modal
				open={focusDeletePhoto ? true : false}
				footer={React.createElement(() => null)}
				onCancel={() => setFocusDeletePhoto(null)}>
				<div className={Style.DeletePrompt}>
					{isDeletingPhoto ? (
						<Loader includeText loadingText='Removing Photo' />
					) : (
						<>
							<p>Delete this picture from Photo Reel?</p>
							<img src={focusDeletePhoto?.secure_url} alt='deletephoto' className={Style.DeletePreview} />
							<div className={Style.ButtonWrapper}>
								<Button type='secondary' onClick={() => setFocusDeletePhoto(null)}>
									Cancel
								</Button>
								<Button type='primary' onClick={confirmDeleteReelPhoto}>
									Yes, Delete
								</Button>
							</div>
						</>
					)}
				</div>
			</Modal>
			<Modal open={isAddingReelPhoto} footer={React.createElement(() => null)} onCancel={handleCloseNewReelPhoto}>
				{isUploading ? (
					<Loader includeText loadingText='Uploading Photo. This may take a moment.' />
				) : (
					<>
						<PhotoInput.PhotoPreview preview={newReelPhotoPreview} name='newReelPhoto' />
						<PhotoInput.ResetWrapper name='newReelPhoto'>
							<PhotoInput
								name='newReelPhoto'
								setterCallback={setNewReelPhotoPreview}
								onChange={rpOnChange}
							/>
						</PhotoInput.ResetWrapper>
						{rpValues['newReelPhoto'] && <Button onClick={handleConfirmUploadPhoto}>Upload Photo</Button>}
					</>
				)}
			</Modal>
		</>
	);
};

export default ManageReelPhotos;
