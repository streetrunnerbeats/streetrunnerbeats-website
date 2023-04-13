import { Radio, Form, Checkbox } from 'antd';

// Component
import type { SongFormInterface } from '../NewSongUploadForm';
import Style from '../songForm.module.scss';

const SelectCertificationSection = ({ onChange, values }: SongFormInterface) => {
	return (
		<div className={Style.FormSection}>
			<h1>RIAA</h1>
			<Form.Item name='certified'>
				<Checkbox name='certified' checked={values.certified} onChange={onChange}>
					Certified
				</Checkbox>
			</Form.Item>

			<Form.Item name='certifiedFor' style={{ display: !values.certified ? 'none' : '' }}>
				<Radio.Group onChange={onChange} value={values.nominatedFor} name='certifiedFor'>
					<Radio value={'song'}>Song</Radio>
					<Radio value={'album'}>Album</Radio>
				</Radio.Group>
			</Form.Item>
		</div>
	);
};

export default SelectCertificationSection;
