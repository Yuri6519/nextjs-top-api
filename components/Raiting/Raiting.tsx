import React, { useEffect, useState, KeyboardEvent } from 'react';
import { RaitingProps } from './Raiting.props';
import cn from 'classnames';
import styles from './Raiting.module.css';
import StarIcon from './star.svg';

const MIN_RAITING_VALUE = 0;
const MAX_RAITING_VALUE = 5;

export const Raiting = ({
	isEditable = false,
	raiting,
	setRaiting,
	className,
	...props
}: RaitingProps): JSX.Element => {
	const [currentRaiting, setCurrentRaiting] = useState<JSX.Element[]>(() =>
		new Array<JSX.Element>(MAX_RAITING_VALUE).fill(<></>)
	);

	useEffect(() => {
		constructRaiting(getRaitingValue());
	}, [raiting]);

	const getRaitingValue = (): number =>
		raiting <= MAX_RAITING_VALUE
			? raiting >= MIN_RAITING_VALUE
				? raiting
				: MIN_RAITING_VALUE
			: MAX_RAITING_VALUE;

	const constructRaiting = (raiting: number) => {
		const raitArr: JSX.Element[] = currentRaiting.map(
			(_: JSX.Element, i: number) => {
				return (
					<span
						className={cn(styles.star, className, {
							[styles.filled]: i < raiting,
							[styles.editable]: isEditable,
							[styles.highlight]: isEditable,
						})}
						onMouseEnter={() => {
							changeDisplay(i + 1);
						}}
						onMouseLeave={() => {
							changeDisplay(getRaitingValue());
						}}
						onClick={() => onClick(i + 1)}
					>
						<StarIcon
							tabIndex={isEditable ? 0 : undefined}
							onKeyDown={(e: KeyboardEvent<SVGAElement>) =>
								handleSpace(e, i + 1)
							}
						/>
					</span>
				);
			}
		);

		setCurrentRaiting(raitArr);
	};

	const changeDisplay = (i: number) => {
		if (!isEditable) return;

		constructRaiting(i);
	};

	const onClick = (i: number) => {
		if (!isEditable || !setRaiting) return;
		setRaiting(i);
	};

	const handleSpace = (e: KeyboardEvent<SVGAElement>, i: number) => {
		if (e.code !== 'Space') return;
		onClick(i);
	};

	return (
		<div {...props}>
			{currentRaiting.map((el: JSX.Element, i: number) => (
				<span key={i}>{el}</span>
			))}
		</div>
	);
};
