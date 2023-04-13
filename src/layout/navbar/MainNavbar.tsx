// --> React
import { useNavigate } from 'react-router-dom';

// --> Project Imports
import {
	IconifyIcon,
	ICON_MENU,
	ICON_MUSIC_NOTES,
	ICON_VIDEO,
	ICON_INFO,
	ICON_SETTINGS,
	ICON_LOGOUT,
} from 'components';
import { Logo192 } from 'assets';
import routes from 'routes';
import { TOKEN_LABEL } from 'config';

// --> Style
import Style from './mainNavbar.module.scss';

export default function MainNavbar() {
	const navigate = useNavigate();
	let token = localStorage.getItem(TOKEN_LABEL);

	const MenuButton = ({ icon, path }: { icon: string; path?: string }) => {
		return (
			<div className={Style.LinkWrapper} onClick={() => (path ? navigate(path) : null)}>
				<IconifyIcon icon={icon} size='sm' />
			</div>
		);
	};

	const logout = () => {
		localStorage.removeItem(TOKEN_LABEL);
		return navigate(routes.CMS_ADMIN);
	};

	return (
		<div className={Style.NavOuter}>
			<div className={Style.NavLeft}>
				<img
					src={Logo192}
					alt='street-runner-logo'
					className={Style.Logo}
					onClick={() => navigate(routes.HOME)}
				/>
			</div>
			<div className={Style.NavRight}>
				<div className={Style.TriggerWrapper}>
					<MenuButton icon={ICON_MENU} />
				</div>
				<div className={Style.Links}>
					<MenuButton icon={ICON_MUSIC_NOTES} path={routes.DISCOGRAPHY} />
					<MenuButton icon={ICON_VIDEO} path={routes.VIDEOS} />
					<MenuButton icon={ICON_INFO} path={routes.ABOUT} />
					{token && (
						<>
							<MenuButton icon={ICON_SETTINGS} path={routes.CMS_ADMIN + routes.CMS_ACCOUNT} />
							<div className={Style.LinkWrapper} onClick={logout}>
								<IconifyIcon icon={ICON_LOGOUT} size='sm' />
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
