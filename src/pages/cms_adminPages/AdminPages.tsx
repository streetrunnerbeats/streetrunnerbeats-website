import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';

import { ManageMusic, ManageAccount } from 'components';
import { ManageDiscographyProvider } from 'contexts';
import { SecurityWrapper, ContentCol } from 'layout';

import Style from './adminPages.module.scss';
import routes from 'routes';

const AdminPages = () => {
	const location = useLocation().pathname;

	const navigate = useNavigate();
	const isActive = (path: string) => (location.includes(path) ? 1 : 0);

	return (
		<SecurityWrapper>
			<ManageDiscographyProvider>
				<ContentCol>
					<Tabs
						onTabClick={(active) => navigate(routes.CMS_ADMIN + active)}
						defaultActiveKey={`/${location.split('/')[2]}`}
						items={[
							{
								label: (
									<span className={Style.Link} data-is-active={isActive(routes.CMS_ACCOUNT)}>
										General
									</span>
								),
								key: routes.CMS_ACCOUNT,
							},
							{
								label: (
									<span className={Style.Link} data-is-active={isActive(routes.CMS_MANAGE_MUSIC)}>
										Music
									</span>
								),
								key: routes.CMS_MANAGE_MUSIC,
							},
						]}
					/>
					<Routes>
						<Route path={routes.CMS_ACCOUNT} element={<ManageAccount />} />
						<Route path={routes.CMS_MANAGE_MUSIC} element={<ManageMusic />} />
					</Routes>
				</ContentCol>
			</ManageDiscographyProvider>
		</SecurityWrapper>
	);
};

export default AdminPages;
