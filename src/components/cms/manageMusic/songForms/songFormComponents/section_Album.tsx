import * as React from 'react';

import { Row, Col, Form, Tabs, Select } from 'antd';

import { PhotoInput, Input } from 'components';

// Component
import type { SongFormInterface } from '../NewSongUploadForm';
import Style from '../songForm.module.scss';

const SelectAlbumSection = ({ onChange, setValue, albums, values, form }: SongFormInterface) => {
	const [albumPhotoPreview, setAlbumPhotoPreview] = React.useState<any>('');

	const handleAlbumTabClick = () => {
		let albumResetInfo = { newAlbumTitle: '', newAlbumPhoto: '', newAlbumYear: null, existingAlbum: null };
		form.setFieldsValue(albumResetInfo);
		setAlbumPhotoPreview('');
		if (setValue) setValue(albumResetInfo);
	};

	return (
		<div className={Style.FormSection}>
			<h1>Release/Album Details</h1>
			<Tabs
				defaultActiveKey={albums && albums.length > 0 ? 'tab__existing_album' : 'tab__new_album'}
				className={Style.CardTabs}
				type='card'
				tabPosition='left'
				size={'small'}
				onTabClick={handleAlbumTabClick}
				items={[
					{
						label: `New Album`,
						key: `tab__new_album`,
						children: (
							<Row>
								<Col span={8}>
									<PhotoInput.PhotoPreview
										preview={albumPhotoPreview}
										name='newAlbumPhoto'
										onClick={() => PhotoInput.clickPhotoInput('newAlbumPhoto')}
									/>
									<PhotoInput.ResetWrapper name='newAlbumPhoto'>
										<PhotoInput
											name='newAlbumPhoto'
											setterCallback={setAlbumPhotoPreview}
											onChange={onChange}
										/>
									</PhotoInput.ResetWrapper>
								</Col>
								<Col span={16}>
									<Form.Item name={'newAlbumTitle'}>
										<Input
											onChange={onChange}
											value={values['newAlbumTitle']}
											placeholder={'Album Title'}
											name={'newAlbumTitle'}
										/>
									</Form.Item>
									<Form.Item name={'newAlbumArtist'}>
										<Input
											onChange={onChange}
											value={values['newAlbumArtist']}
											placeholder={'Album Artist'}
											name={'newAlbumArtist'}
										/>
									</Form.Item>
									<Form.Item name={'newAlbumYear'}>
										<Input
											type='number'
											onChange={onChange}
											value={values['newAlbumYear']}
											placeholder={'Album Year'}
											name={'newAlbumYear'}
										/>
									</Form.Item>
								</Col>
							</Row>
						),
					},
					{
						label: `Exisisting Albums`,
						key: `tab__existing_album`,
						children: (
							<Select
								style={{ width: '100%' }}
								placeholder={'Select Album'}
								optionFilterProp='children'
								dropdownStyle={{ backgroundColor: Style.color_themePrimary }}
								value={values.existingAlbum}
								onChange={(value) =>
									onChange({ target: { type: 'select', name: 'existingAlbum', value } })
								}
								filterOption={(input, option) =>
									(option?.key.toLocaleLowerCase() ?? '').includes(input)
								}
								filterSort={(optionA, optionB) =>
									(optionA?.key ?? '').toLowerCase().localeCompare((optionB?.key ?? '').toLowerCase())
								}
								options={
									!albums
										? []
										: albums.map((album) => ({
												key: album.title + album._id,
												value: album._id,
												label: (
													<div className={Style.AlbumSelectOption}>
														<img src={album.photo?.secure_url} alt='album art' />
														<p style={{ color: 'black !important' }}>{album.title}</p>
													</div>
												),
										  }))
								}
							/>
						),
					},
				]}
			/>
		</div>
	);
};

export default SelectAlbumSection;
