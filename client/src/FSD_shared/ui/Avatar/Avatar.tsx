import './styles.scss';

interface AvatarProps {
	firstName: string;
	avatarUrl?: string;
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
	borderColor?: 'accent' | 'secondary';
}

export const Avatar = ({ avatarUrl, firstName, size = 'md', borderColor = 'accent' }: AvatarProps) => {
	const iconSize = {
		sm: 'avatar-sm border-sm',
		md: 'avatar-md border-sm',
		lg: 'avatar-lg border-lg',
		xl: 'avatar-xl border-lg',
		xxl: 'avatar-xxl border-lg',
	};

	const borderVariant = borderColor === 'accent' ? 'avatarBorder-accent' : 'avatarBorder-secondary';

	return (
		<div className={`flex flex-center text-primary AvatarElement ${iconSize[size]} ${borderVariant}`}>
			{avatarUrl ? <img src={avatarUrl} alt="user-avatar" /> : `${firstName[0].toUpperCase()}`}
		</div>
	);
};
