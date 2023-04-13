// React
import * as React from 'react';

// Packages
import { Modal, Dropdown } from 'antd';
import type { MenuProps } from 'antd';

// Projects
import { IconifyIcon, ICON_DOTS_MENU_DOTS, Button, Loader } from 'components';
import { ManageDiscographyContext } from 'contexts';
import { Song } from 'types';

// Update Forms
import UpdateDetails from 'components/cms/manageMusic/songForms/UpdateDetailsForm';
import ReplaceSongForm from 'components/cms/manageMusic/songForms/ReplaceSongForm';
import ManageSongPhotoForm from 'components/cms/manageMusic/songForms/ManageSongPhotoForm';

import Style from './songListItem.module.scss';

const SongItemMenu = ({ song }: { song: Song }) => {
	const {
		// New / Keeping
		setData,
		toggleAdminValue,
		songUpdateFocus,
		showSongPhotoModal,
		showReplaceAudioModal,
		showUpdateSongDetailsModal,
		showDeleteSongModal,
		// Old / Audit
		handleDeleteSong,
	} = React.useContext(ManageDiscographyContext);

	//---------------------------------
	//==> Song List Item Menu Options
	//---------------------------------
	const menuItems: MenuProps['items'] = [
		{
			key: `edit_${song && song._id}`,
			label: (
				<p
					onClick={() => {
						setData({ songUpdateFocus: song });
						toggleAdminValue({ showUpdateSongDetailsModal: true });
					}}>
					Edit Song Details
				</p>
			),
		},
		{
			key: `edit_album_${song && `${song._id}_${song.album._id}`}`,
			label: (
				<p
					onClick={() => {
						setData({ albumUpdateFocus: song.album });
						toggleAdminValue({ showUpdateAlbumModal: true });
					}}>
					Edit Album '{song.album.title}'
				</p>
			),
		},
		{
			key: `SET_REPLACE_AUDIO_${song && song._id}`,
			label: (
				<p
					onClick={() => {
						setData({ songUpdateFocus: song });
						toggleAdminValue({ showReplaceAudioModal: true });
					}}>
					Repalce Audio
				</p>
			),
		},
		{
			key: `song_photo_${song && song._id}`,
			label: (
				<p
					onClick={() => {
						setData({ songUpdateFocus: song });
						toggleAdminValue({ showSongPhotoModal: true });
					}}>
					{!song.photo ? 'Add A Song Photo' : 'Remove/Replace Song Photo'}
				</p>
			),
		},
		{
			key: `delete_${song && song._id}`,
			label: (
				<p
					onClick={() => {
						setData({ songUpdateFocus: song });
						toggleAdminValue({ showDeleteSongModal: true });
					}}>
					Delete Song
				</p>
			),
		},
	];

	//---------------------------
	// ==> Delete Song Modal
	//---------------------------
	const [isDeleting, toggleIsDeleting] = React.useState<boolean>(false);

	const cancelDeleteSong = () => {
		toggleAdminValue({ showDeleteSongModal: false });
		return setData({ songUpdateFocus: null });
	};

	const confirmDeleteSong = () => {
		toggleIsDeleting(true);
		return handleDeleteSong(song);
	};

	const deleteModal = (
		<Modal
			open={showDeleteSongModal && songUpdateFocus && songUpdateFocus._id === song._id ? true : false}
			onCancel={cancelDeleteSong}
			title={`Delete "${song.title}"`}
			footer={React.createElement(() => null)}>
			<div>
				{isDeleting ? (
					<Loader includeText loadingText='Deleting Song' />
				) : (
					<>
						<p>Are you sure you want to delete "{song.title}"? This action can NOT be undone</p>

						<Button onClick={cancelDeleteSong} type='secondary'>
							Cancel
						</Button>
						<Button onClick={confirmDeleteSong} type='primary'>
							Yes, Delete
						</Button>
					</>
				)}
			</div>
		</Modal>
	);

	//---------------------------------
	// ==> Update Song Details Modal
	//---------------------------------
	const cancelDetailsUpdate = () => {
		setData({ songUpdateFocus: null });
		toggleAdminValue({ showUpdateSongDetailsModal: false });
	};
	const updateModal = (
		<Modal
			open={showUpdateSongDetailsModal && songUpdateFocus && songUpdateFocus._id === song._id ? true : false}
			onCancel={cancelDetailsUpdate}
			title={`Update "${song.title}" Details`}
			footer={React.createElement(() => {
				return null;
			})}>
			<p>If you would like to change the audio file itself, you must delete and recreate the song.</p>
			<UpdateDetails song={song} />
		</Modal>
	);

	//-------------------------
	// ==> Song Photo Modal
	//-------------------------
	const cancelPhotoModal = () => {
		setData({ songUpdateFocus: null });
		toggleAdminValue({ showSongPhotoModal: false });
	};

	const songPhotoModal = (
		<Modal
			open={showSongPhotoModal && songUpdateFocus && songUpdateFocus._id === song._id ? true : false}
			onCancel={cancelPhotoModal}
			destroyOnClose={true}
			title={`"${song.title}" Photo`}
			footer={React.createElement(() => {
				return null;
			})}>
			<div>
				{song.photo && <p>SONG LISTS will default to Album Photo if photo is removed.</p>}
				{!song.photo && (
					<p>
						SONG LISTS will use <strong>song photo over album photo if present.</strong> If you wish to go
						back to album photo in the future, remove the photo added to the song.
					</p>
				)}
				<ManageSongPhotoForm />
			</div>
		</Modal>
	);

	//-----------------------------
	// ==> Replace Song Audio Modal
	//-----------------------------
	const cancelReplaceAudio = () => {
		setData({ songUpdateFocus: null });
		toggleAdminValue({ showReplaceAudioModal: false });
	};
	const replaceAudioModal = (
		<Modal
			open={showReplaceAudioModal && songUpdateFocus && songUpdateFocus._id === song._id ? true : false}
			onCancel={cancelReplaceAudio}
			title={`Update "${song.title}" Details`}
			footer={React.createElement(() => {
				return null;
			})}>
			<p>
				You can update the audio file for this song. IMPORTANT: The original audio file will be deleted. You can
				not undo this replacement.
			</p>
			<ReplaceSongForm />
		</Modal>
	);

	//-----------------------------
	//----- RENDER MENU
	//-----------------------------
	return (
		<div className={Style.MenuWrapper}>
			<Dropdown menu={{ items: menuItems }} placement='bottomLeft'>
				<IconifyIcon size='sm' icon={ICON_DOTS_MENU_DOTS} />
			</Dropdown>
			{deleteModal}
			{songPhotoModal}
			{replaceAudioModal}
			{updateModal}
		</div>
	);
};

export default SongItemMenu;
