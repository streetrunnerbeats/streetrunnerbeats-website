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

			<div style={{ display: !values.certified ? 'none' : '' }}>
				<p>Certified For:</p>
				<Form.Item name='certifiedFor'>
					<Radio.Group onChange={onChange} value={values.certifiedFor} name='certifiedFor'>
						<Radio value={'song'}>Song</Radio>
						<Radio value={'album'}>Album</Radio>
					</Radio.Group>
				</Form.Item>

				<p>Award:</p>
				<Form.Item name='certifiedAward'>
					<Radio.Group onChange={onChange} value={values.certifiedAward} name='certifiedAward'>
						<Radio value={'Gold'}>Gold</Radio>
						<Radio value={'Platinum'}>Platinum</Radio>
						<Radio value={'2x Platinum'}>2x Platinum</Radio>
						<Radio value={'3x Platinum'}>3x Platinum</Radio>
						<Radio value={'4x Platinum'}>4x Platinum</Radio>
						<Radio value={'5x Platinum'}>5x Platinum</Radio>
						<Radio value={'6x Platinum'}>6x Platinum</Radio>
						<Radio value={'Diamond'}>Diamond</Radio>
					</Radio.Group>
				</Form.Item>
			</div>
		</div>
	);
};

export default SelectCertificationSection;
