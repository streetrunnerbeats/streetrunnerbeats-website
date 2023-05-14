import { IconifyIcon, ICON_INSTAGRAM, ICON_TWITTER } from 'components';

import Style from './socialButtons.module.scss';
const SocialButtons = () => {
	return (
		<div className={Style.Wrapper}>
			<a href='https://instagram.com/streetrunnermusic?igshid=MzRlODBiNWFlZA==' target='_blank' rel='noreferrer'>
				<IconifyIcon icon={ICON_INSTAGRAM} />
			</a>
			<a href='https://twitter.com/srbeats?s=11&t=u4JsksFp2aPEnydnC-2Isg' target='_blank' rel='noreferrer'>
				<IconifyIcon icon={ICON_TWITTER} />
			</a>
		</div>
	);
};

export default SocialButtons;
