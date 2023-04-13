import * as React from 'react';
import axios from 'axios';
import { Form } from 'antd';
import { adminAPI } from 'apis';
import { useForm } from 'hooks';
import { Loader, Input, Button } from 'components';
import { Spacer } from 'layout';
import routes from 'routes';

import Style from './shared.module.scss';

const UpdateYouTubePlaylist = ({ messageApi }: { messageApi: any }) => {
	const ytInitialState = { playlistId: '' };
	const { values: ytVals, onChange: ytOnChange, setValue: ytSetVals } = useForm({ initialState: ytInitialState });

	const [showUpdateForm, toggleShowUpdateForm] = React.useState<boolean>(false);
	const [isUpdatingYouTube, toggleIsUpdatingYouTube] = React.useState<boolean>(false);
	const [ytForm] = Form.useForm();

	async function handleYouTubeUpdate() {
		toggleIsUpdatingYouTube(true);
		return adminAPI.updateYouTubePlaylist(ytVals, handleSuccessYoutubeUpdate, handleErrorYoutubeUpdate);
	}

	function handleSuccessYoutubeUpdate(data: any) {
		ytForm.setFieldsValue(ytInitialState);

		ytSetVals(ytInitialState);
		getCurrentYoutubeInfo();
		toggleIsUpdatingYouTube(false);
		toggleShowUpdateForm(false);

		messageApi.success({
			placement: 'topLeft',
			message: 'YouTube playlist updated successfully!',
		});
	}

	function handleErrorYoutubeUpdate(errors: any) {
		toggleIsUpdatingYouTube(false);

		messageApi.error({
			placement: 'topLeft',
			message: 'There was an error while updating the YouTube playlist. Try refreshing the page then try again.',
		});
	}

	const [currentYoutubeData, setCurrentYoutubeData] = React.useState<any>(null);
	const getCurrentYoutubeInfo = React.useCallback(async () => {
		let { data } = await axios.get(
			`${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_VIDEO}${routes.VIDEO_YOUTUBE_INFO}`
		);

		if (data.playlist) {
			setCurrentYoutubeData(data.playlist);
		}
	}, []);

	React.useEffect(() => {
		if (!currentYoutubeData) getCurrentYoutubeInfo();
	}, [currentYoutubeData, getCurrentYoutubeInfo]);

	return (
		<>
			<h1>YouTube Playlist</h1>
			{!currentYoutubeData || isUpdatingYouTube ? (
				<Loader />
			) : (
				<>
					<div className={Style.PlaylistDetails}>
						<h5>Current Playlist Title : {currentYoutubeData.title}</h5>
						<h5>Current Playlist ID : {currentYoutubeData.playlistId}</h5>
					</div>
					{!showUpdateForm ? (
						<Button onClick={() => toggleShowUpdateForm(true)}>Update Playlist</Button>
					) : (
						<Form form={ytForm}>
							<Form.Item>
								<Input
									name='playlistId'
									value={ytVals.playlistId}
									onChange={ytOnChange}
									placeholder='New YouTube Playlist ID'
								/>
							</Form.Item>
							<Form.Item>
								<Button onClick={handleYouTubeUpdate}>Update Playlist ID</Button>
							</Form.Item>
							<Button type='secondary' onClick={() => toggleShowUpdateForm(false)}>
								Cancel
							</Button>
						</Form>
					)}
				</>
			)}
			<Spacer height='100px' divider />
		</>
	);
};

export default UpdateYouTubePlaylist;
