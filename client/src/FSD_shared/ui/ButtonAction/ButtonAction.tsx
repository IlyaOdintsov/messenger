import { ReactNode } from 'react';
import { ModalTrigger } from '@/FSD_shared/ui';
import { IconButton } from '@/FSD_shared/ui/IconButton/IconButton.tsx';
import { Button } from '@/FSD_shared/ui/Button/Button.tsx';

interface ActionButtonProps {
	trigger?: ReactNode;
	modal: ReactNode;
	tooltip?: string;

	size?: 'sm' | 'md' | 'lg';

	icon?: string | ReactNode;
	iconVariant?: 'default' | 'accent' | 'danger';

	children?: ReactNode;
	buttonVariant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'danger';

	modalSize?: 'auto' | 'fixed';

	buttonProps?: Record<string, any>;
	modalProps?: Record<string, any>;
}

export const ActionButton = ({
	trigger,
	modal,
	tooltip,
	size = 'md',
	icon,
	iconVariant = 'default',
	children,
	buttonVariant = 'default',
	modalSize = 'auto',
	buttonProps = {},
	modalProps = {},
}: ActionButtonProps) => {
	const renderTrigger = () => {
		if (trigger) {
			if (typeof trigger === 'string') {
				return <span title={tooltip}>{trigger}</span>;
			}
			return trigger;
		}

		if (icon && !children) {
			return (
				<div title={tooltip}>
					<IconButton icon={icon} size={size} variant={iconVariant} {...buttonProps} />
				</div>
			);
		}

		const buttonContent = (
			<>
				{icon && (typeof icon === 'string' ? <img src={icon} alt="" /> : icon)}
				{children}
			</>
		);

		return (
			<div title={tooltip}>
				<Button variant={buttonVariant} size={size} {...buttonProps}>
					{buttonContent}
				</Button>
			</div>
		);
	};

	return <ModalTrigger trigger={renderTrigger()} size={modalSize} modal={modal} {...modalProps} />;
};
