import Style from './overlay.module.scss';
/**
 * A filter component that will fill the inside of a div with a filter overlay
 */

interface OverlayProps {
	type?: 'normal' | 'light' | 'from-bottom' | 'from-top';
	color?: string;
}

const Overlay = ({ type = 'normal', color }: OverlayProps) => {
	return (
		<div
			data-type={color ? '' : type}
			style={{ backgroundColor: color ? color : '' }}
			className={Style.Wrapper}></div>
	);
};

export default Overlay;
