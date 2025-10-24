import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';

export const Layout = () => {
	return (
		<div className="container">
			<Sidebar />
			<Outlet />
		</div>
	);
};
