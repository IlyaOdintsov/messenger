import { Navigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useAppSelector';

interface RequireAuth {
	children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuth) => {
	const isAuth = useTypedSelector((state) => state.auth.isAuth);
	const location = useLocation();

	if (!isAuth) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	return children;
};
