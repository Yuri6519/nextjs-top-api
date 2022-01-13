import React, { KeyboardEvent } from 'react';
import { SortEnum, SortProps } from './Sort.props';
import cn from 'classnames';
import styles from './Sort.module.css';
import SortIcon from './sort.svg';

export const Sort = ({
	sort,
	setSort,
	className,
	...props
}: SortProps): JSX.Element => {
	const handleKeyDown = (
		e: KeyboardEvent<HTMLSpanElement>,
		sort: SortEnum
	) => {
		if (e.code === 'Enter' || e.code === 'Space') {
			e.preventDefault();
			setSort(sort);
		}
	};

	return (
		<div className={cn(styles.sort, className)} {...props}>
			<span
				onClick={() => setSort(SortEnum.Raiting)}
				className={cn({
					[styles.active]: sort === SortEnum.Raiting,
				})}
			>
				<SortIcon className={styles.sortIcon} />
				<span
					tabIndex={0}
					onKeyDown={(e) => handleKeyDown(e, SortEnum.Raiting)}
				>
					По рейтингу
				</span>
			</span>
			<span
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort === SortEnum.Price,
				})}
			>
				<SortIcon className={styles.sortIcon} />
				<span
					tabIndex={0}
					onKeyDown={(e) => handleKeyDown(e, SortEnum.Price)}
				>
					По цене
				</span>
			</span>
		</div>
	);
};
