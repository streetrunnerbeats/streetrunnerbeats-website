import Styles from '../layoutStyles.module.scss';

interface SpacerProps {
	height?: string;
	maxHeight?: string;
	minHeight?: string;
	divider?: boolean;
}

const Spacer = ({ height = '20px', maxHeight, minHeight, divider = false }: SpacerProps) => (
	<div style={{ width: '100%', height, maxHeight, minHeight, display: 'flex', alignItems: 'center' }}>
		{divider && <div style={{ width: '100%', height: '1px', backgroundColor: Styles.color_themePrimary }} />}
	</div>
);

export default Spacer;
