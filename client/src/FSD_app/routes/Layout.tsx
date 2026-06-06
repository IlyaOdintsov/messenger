import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../FSD_widgets/Sidebar/Sidebar.tsx';

export const Layout = () => {
	return (
		<div className="container">
			<Sidebar />
			<Outlet />
		</div>
	);
};
