import './styles.scss';
import { useTypedSelector } from '../../hooks/useAppSelector';
import {ProfileItem} from "../../components/Profile/ProfileItem.tsx";

export const ProfilePage = () => {
	const user = useTypedSelector((state) => state.auth.data?.user);

	if (!user) return;

	return (
		<div className="container" style={{justifyContent: 'center'}}>
			<ProfileItem user={user} />
        </div>
	);
};
