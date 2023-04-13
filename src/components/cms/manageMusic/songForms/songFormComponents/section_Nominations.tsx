import { Form, Checkbox, Radio } from 'antd';

// Component
import { Input } from 'components';
import type { SongFormInterface } from '../NewSongUploadForm';
import Style from '../songForm.module.scss';

const SelectNominationSecion = ({ onChange, values }: SongFormInterface) => {
	return (
		<div className={Style.FormSection}>
			<h1>Nominations</h1>
			<Form.Item name='nominated'>
				<Checkbox name='nominated' checked={values.nominated} onChange={onChange}>
					Nominated
				</Checkbox>
			</Form.Item>

			<div style={{ display: !values.nominated ? 'none' : '' }}>
				<p>Nominated For:</p>
				<Form.Item name='nominatedFor'>
					<Radio.Group name='nominatedFor' onChange={onChange} value={values.nominatedFor}>
						<Radio value={'album'}>Album</Radio>
						<Radio value={'song'}>Song</Radio>
					</Radio.Group>
				</Form.Item>

				<p>Status:</p>
				<Form.Item name='nominatedStatus'>
					<Radio.Group name='nominatedStatus' onChange={onChange} value={values.nominatedStatus}>
						<Radio value={'nominated'}>Nominated</Radio>
						<Radio value={'winner'}>Won</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					name='nominatedAward'
					rules={[{ required: values.nominated, message: 'Please include what the nomination was for' }]}>
					<Input
						onChange={onChange}
						value={values.nominatedAward}
						placeholder='What is the award?'
						name='nominatedAward'
					/>
				</Form.Item>
			</div>
		</div>
	);
};

export default SelectNominationSecion;
