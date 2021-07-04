import React from 'react';
import { PTagProps } from './PTag.props';
import cn from 'classnames';
import styles from './PTag.module.css';

export const PTag = ({
	size = 'middle',
	children,
	className,
	...props
}: PTagProps): JSX.Element => {
	return (
		<p
			className={cn(styles.p, className, {
				[styles.small]: size === 'small',
				[styles.middle]: size === 'middle',
				[styles.large]: size === 'large',
			})}
			{...props}
		>
			{children}
		</p>
	);
};
