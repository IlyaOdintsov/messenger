import './styles.scss';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useAppSelector.ts';
import { ProfileItem } from '@/FSD_widgets/ContactBox/Profile/ProfileItem.tsx';

export const ProfilePage = () => {
	const user = useTypedSelector((state) => state.auth.data?.user);

	if (!user) return;

	return (
		<div className="container" style={{ justifyContent: 'center' }}>
			<ProfileItem user={user} />
		</div>
	);
};
