import React from 'react';
import { TagProps } from './Tag.props';
import cn from 'classnames';
import styles from './Tag.module.css';

export const Tag = ({
	size = 'small',
	color = 'ghost',
	href,
	children,
	className,
	...props
}: TagProps): JSX.Element => {
	return (
		<div
			className={cn(styles.tag, className, {
				[styles.small]: size === 'small',
				[styles.middle]: size === 'middle',
				[styles.ghost]: color === 'ghost',
				[styles.gray]: color === 'gray',
				[styles.green]: color === 'green',
				[styles.red]: color === 'red',
				[styles.primary]: color === 'primary',
			})}
			{...props}
		>
			{href ? <a href={href}>{children}</a> : <>{children}</>}
		</div>
	);
};
