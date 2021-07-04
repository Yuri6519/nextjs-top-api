import { ButtonProps } from './Button.props';
import cn from 'classnames';
import styles from './Button.module.css';
import ArrowIcon from './arrow.svg';

const {
	button,
	primary,
	ghost,
	arrow: arrowStyle,
	arrowDown,
	arrowRight,
} = styles;

export const Button = ({
	appearance,
	children,
	className,
	arrow = 'none',
	...props
}: ButtonProps): JSX.Element => {
	return (
		<button
			className={cn(button, className, {
				[primary]: appearance === 'primary',
				[ghost]: appearance === 'ghost',
			})}
			{...props}
		>
			{children}
			{arrow != 'none' && (
				<span
					className={cn(arrowStyle, {
						[arrowDown]: arrow === 'down',
						[arrowRight]: arrow === 'right',
					})}
				>
					<ArrowIcon />
				</span>
			)}
		</button>
	);
};
