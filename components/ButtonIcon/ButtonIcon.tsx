import { ButtonIconProps, Icons } from './ButtonIcon.props';
import cn from 'classnames';
import styles from './ButtonIcon.module.css';

const { button, primary, white } = styles;

export const ButtonIcon = ({
	appearance,
	icon,
	className,
	...props
}: ButtonIconProps): JSX.Element => {
	const Icon = Icons[icon];
	return (
		<button
			className={cn(button, className, {
				[primary]: appearance === 'primary',
				[white]: appearance === 'white',
			})}
			{...props}
		>
			<Icon />
		</button>
	);
};
