// Packages
import { notification } from 'antd';

// Component Imports
import UpdatePasswordSection from './section_UpdatePassword';
import UpdateYouTubePlaylist from './section_YouTubePlaylistUpdate';
import ManageReelPhotos from './section_ManageReelPhotos';

const ManageAccount = () => {
	const [messageApi, contextHolder] = notification.useNotification();

	return (
		<div>
			<ManageReelPhotos messageApi={messageApi} />
			<UpdateYouTubePlaylist messageApi={messageApi} />
			<UpdatePasswordSection messageApi={messageApi} />
			{contextHolder}
		</div>
	);
};

export default ManageAccount;
