// React
import * as React from 'react';

import { notification, Modal } from 'antd';

// Project Imports
import { Button, SongListItem } from 'components';
import { ManageDiscographyContext } from 'contexts';

// Component Imports
import UpdateAlbumForm from './songForms/UpdateAlbumForm';
import NewSongUploadForm from './songForms/NewSongUploadForm';

const ManageMusic = () => {
	const { showNewSongForm, songs, albumUpdateFocus, setData, toggleAdminValue } =
		React.useContext(ManageDiscographyContext);
	const [api, contextHolder] = notification.useNotification();

	//-------------------------
	// ==> Update Album Modal
	//-------------------------
	const updateAlbumModal = (
		<Modal
			destroyOnClose={true}
			open={albumUpdateFocus ? true : false}
			onCancel={() => setData({ albumUpdateFocus: null })}
			title={`Update "${albumUpdateFocus ? albumUpdateFocus.title : ''}" Details`}
			footer={React.createElement(() => null)}>
			<p>Updating Album will update for all songs attached to it</p>
			<UpdateAlbumForm />
		</Modal>
	);

	return (
		<>
			{contextHolder}
			{showNewSongForm ? (
				<NewSongUploadForm notificationAPI={api} />
			) : (
				<>
					{updateAlbumModal}
					<div style={{ display: 'flex', marginBottom: '10px' }}>
						<Button
							style={{ marginLeft: 'auto' }}
							onClick={() => toggleAdminValue({ showNewSongForm: true })}>
							Add Song
						</Button>
					</div>
					{songs &&
						songs
							.sort((a, b) => (a.album.title < b.album.title ? -1 : 1))
							.map((song, i) => (
								<SongListItem
									size='small'
									key={song._id}
									showFileInfo
									showMenu
									song={song}
									lastItem={i === songs.length - 1}
									title={song.title}
									subtitle={song.album && `"${song.album.title}" by ${song.album.artist}`}
								/>
							))}
				</>
			)}
		</>
	);
};

export default ManageMusic;
