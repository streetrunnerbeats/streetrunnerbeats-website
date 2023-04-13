import { IconifyIcon, ICON_FACEBOOK, ICON_INSTAGRAM, ICON_SPOTIFY, ICON_TWITTER } from 'components';

import Style from './socialButtons.module.scss';
const SocialButtons = () => {
	return (
		<div className={Style.Wrapper}>
			<IconifyIcon icon={ICON_INSTAGRAM} />
			<IconifyIcon icon={ICON_SPOTIFY} />
			<IconifyIcon icon={ICON_TWITTER} />
			<IconifyIcon icon={ICON_FACEBOOK} />
		</div>
	);
};

export default SocialButtons;
