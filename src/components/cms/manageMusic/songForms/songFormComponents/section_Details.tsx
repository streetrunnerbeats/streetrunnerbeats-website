import * as React from 'react';

import { Row, Col, Form, Checkbox } from 'antd';
import { GeneralInputInterface } from 'components/cms/cms-types';

import { PhotoInput, Input } from 'components';

// Component
import type { SongFormInterface } from '../NewSongUploadForm';
import Style from '../songForm.module.scss';

const SongDetailsSection = ({
	onChange,
	setValue,
	values,
	hidePhotoOption = false,
}: SongFormInterface & { hidePhotoOption?: boolean }) => {
	const [songPhotoPreview, setSongPhotoPreview] = React.useState<any>('');
	const songDetailsCheckBoxed: GeneralInputInterface[] = [
		{
			name: 'useAlbumYear',
			label: 'Use Album Year',
		},
		{
			name: 'useAlbumArtist',
			label: 'Use Album Artist',
		},
	];

	if (!hidePhotoOption) {
		songDetailsCheckBoxed.push({
			name: 'useAlbumPhoto',
			label: 'Use Album Photo',
			onChange: (e: any) => {
				if (e.target && e.target.checked === true)
					PhotoInput.handleResetPhotoInput('photo', setSongPhotoPreview, setValue);
				onChange(e);
			},
		});
	}

	return (
		<div className={Style.FormSection}>
			<h1>Song Details</h1>
			<Row style={{ width: '100%' }}>
				{!hidePhotoOption && (
					<Col span={values.useAlbumPhoto ? 0 : 6}>
						{/* Adding photo for the new song AS SONG PHOTO - not album photo - user can leave this blank and use the photo from album */}
						<PhotoInput.PhotoPreview preview={songPhotoPreview} name='photo' />
						<PhotoInput.ResetWrapper name='photo'>
							<PhotoInput name='photo' setterCallback={setSongPhotoPreview} onChange={onChange} />
						</PhotoInput.ResetWrapper>
					</Col>
				)}

				<Col span={values.useAlbumPhoto ? 24 : 18}>
					<p>Shared Details</p>
					{songDetailsCheckBoxed.map((checkbox) => (
						<Checkbox
							key={`${Math.random()}`}
							name={checkbox.name}
							checked={values[checkbox.name]}
							onChange={checkbox.onChange ? checkbox.onChange : onChange}>
							{checkbox.label}
						</Checkbox>
					))}

					<Form.Item name='title' rules={[{ required: true, message: 'Song Title is required' }]}>
						<Input onChange={onChange} value={values.title} placeholder='Song Title' name='title' />
					</Form.Item>

					<Form.Item name='artist' style={{ display: values.useAlbumArtist ? 'none' : '' }}>
						<Input onChange={onChange} value={values.artist} placeholder='Artist' name='artist' />
					</Form.Item>

					<Form.Item name='year' style={{ display: values.useAlbumYear ? 'none' : '' }}>
						<Input onChange={onChange} value={values.year} placeholder='Year' name='year' type='number' />
					</Form.Item>
				</Col>
			</Row>
		</div>
	);
};

export default SongDetailsSection;
