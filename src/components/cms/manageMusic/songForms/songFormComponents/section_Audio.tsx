import { Form, Empty } from 'antd';

import { formatFileSize } from 'util/index';

import { Input, Button } from 'components';

// Component
import type { SongFormInterface } from '../NewSongUploadForm';
import Style from '../songForm.module.scss';

const UploadAudioSection = ({ onChange, values }: SongFormInterface) => {
	return (
		<div className={Style.FormSection}>
			<Form.Item name='audio' style={{ display: 'none' }}>
				<Input
					type='file'
					onChange={onChange}
					placeholder='Audio'
					name='audio'
					accept='.mp3, .wav'
					value={values.audio}
					id={'fileInput_audio'}
				/>
			</Form.Item>

			<Empty
				image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
				imageStyle={{
					height: 60,
				}}
				description={
					!values.audio ? (
						<p>No Audio Selected</p>
					) : (
						<p>
							{values.audio.name} • {formatFileSize(values.audio.size)}
						</p>
					)
				}>
				<Button onClick={() => document.getElementById('fileInput_audio')?.click()}>
					{!values.audio ? 'Add Audio' : 'Change Audio'}
				</Button>
			</Empty>
		</div>
	);
};

export default UploadAudioSection;
