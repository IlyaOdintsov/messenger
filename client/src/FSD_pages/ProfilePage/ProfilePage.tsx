import './styles.scss';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useTypedSelector.ts';
import { ProfileItem } from '@/FSD_widgets/ContactBox/ui/Profile/ProfileItem.tsx';

export const ProfilePage = () => {
	const user = useTypedSelector((state) => state.auth.data?.user);

	if (!user) return;

	return <ProfileItem user={user} />;
};
