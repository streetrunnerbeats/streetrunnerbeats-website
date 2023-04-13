import * as React from 'react';

import { Form, Spin, notification } from 'antd';

import { Button } from 'components';
import { ManageDiscographyContext } from 'contexts';
import { useForm } from 'hooks';
import { Song } from 'types';

import SelectNominationSecion from './songFormComponents/section_Nominations';
import SelectCertificationSection from './songFormComponents/section_Certifications';
import SongDetailsSection from './songFormComponents/section_Details';

import { checkSongDetails } from './songValidators';

import Style from '../shared.module.scss';

const UpdateDetails = ({ song }: { song: Song }) => {
	const { values, onChange, setValue } = useForm({
		initialState: {
			artist: song.artist,
			title: song.title,
			year: song.year,

			certified: song.certified,
			certifiedFor: song.certifiedFor,

			nominated: song.nominated,
			nominatedAward: song.nominatedAward === ('null' || '') ? '' : song.nominatedAward,
			nominatedFor: song.nominatedFor,
			nominatedStatus: song.nominatedStatus,

			useAlbumPhoto: song.useAlbumPhoto ? song.useAlbumPhoto : false,
			useAlbumArtist: song.album.artist === song.artist,
			useAlbumYear: song.album.year === song.year,
			photo: song.photo ? song.photo.secure_url : null,
		},
	});
	const [form] = Form.useForm();

	const { handleUpdateSongDetails, isLoading, setData, toggleAdminValue } =
		React.useContext(ManageDiscographyContext);
	const [api, contextHolder] = notification.useNotification();
	const [errors, setErrors] = React.useState<any>(null);

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

	//-------------------
	//== Form Methods
	//-------------------
	const handleConfirmUpdate = async () => {
		let data = {
			...values,
			year: values.useAlbumYear === true ? song.album.year : values.year,
			artist: values.useAlbumArtist === true ? song.album.artist : values.artist,
			photo: values.useAlbumPhoto === true ? null : values.photo,
		};

		let { errors, valid } = await checkSongDetails(data);
		if (errors) {
			setErrors(errors);
		} else {
			if (valid) {
				handleUpdateSongDetails(data);
			}
		}
	};
	const handleCancelUpdate = () => {
		setData({ songUpdateFocus: null });
		toggleAdminValue({ showUpdateSongDetailsModal: false });
	};

	return (
		<Form className={Style.FormOuter} name='add_song_form' initialValues={values} form={form}>
			{contextHolder}
			{isLoading ? (
				<Spin />
			) : (
				<>
					<SongDetailsSection
						onChange={onChange}
						values={values}
						setValue={setValue}
						hidePhotoOption={true}
					/>
					<SelectNominationSecion onChange={onChange} values={values} />
					<SelectCertificationSection onChange={onChange} values={values} />
					<div
						style={{ width: '100%', display: 'flex', justifyContent: 'space-between', paddingTop: '15px' }}>
						<Button onClick={handleCancelUpdate} type='secondary'>
							Cancel
						</Button>
						<Button onClick={handleConfirmUpdate} type='primary'>
							Update
						</Button>
					</div>
				</>
			)}
		</Form>
	);
};

export default UpdateDetails;
