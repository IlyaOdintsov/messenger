import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/FSD_widgets/Sidebar/Sidebar.tsx';

export const Layout = () => {
	return (
		<div className="Layout flex">
			<Sidebar />

			<div className="w-full h-full">
				<Outlet />
			</div>
		</div>
	);
};
