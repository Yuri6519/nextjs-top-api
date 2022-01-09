import React, {
	useEffect,
	useState,
	KeyboardEvent,
	forwardRef,
	ForwardedRef,
	useRef,
} from 'react';
import { RaitingProps } from './Raiting.props';
import cn from 'classnames';
import styles from './Raiting.module.css';
import StarIcon from './star.svg';

const MIN_RAITING_VALUE = 0;
const MAX_RAITING_VALUE = 5;
const MIN_RAITING_VALID_VALUE = 1;

export const Raiting = forwardRef(
	(
		{
			isEditable = false,
			raiting = 0,
			setRaiting,
			className,
			error,
			tabIndex,
			...props
		}: RaitingProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		const [currentRaiting, setCurrentRaiting] = useState<JSX.Element[]>(
			() => new Array<JSX.Element>(MAX_RAITING_VALUE).fill(<></>)
		);

		const raitingRefs = useRef<(HTMLSpanElement | null)[]>([]);

		useEffect(() => {
			constructRaiting(getRaitingValue());
		}, [raiting, tabIndex]);

		const getRaitingValue = (): number =>
			raiting <= MAX_RAITING_VALUE
				? raiting >= MIN_RAITING_VALUE
					? raiting
					: MIN_RAITING_VALUE
				: MAX_RAITING_VALUE;

		const setTabIndex = (i: number): number => {
			if (!isEditable) return -1;

			if (!raiting && i === 0) return tabIndex ?? 0;

			if (raiting === i + 1) return tabIndex ?? 0;

			return -1;
		};

		const constructRaiting = (raiting: number) => {
			const raitArr: JSX.Element[] = currentRaiting.map(
				(_: JSX.Element, i: number) => {
					return (
						<span
							className={cn(styles.star, {
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
							tabIndex={setTabIndex(i)}
							onKeyDown={handleKey}
							ref={(r) => raitingRefs.current?.push(r)}
						>
							<StarIcon />
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

		const handleKey = (e: KeyboardEvent<HTMLSpanElement>) => {
			if (!isEditable || !setRaiting) return;

			if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
				e.preventDefault();
				setRaiting(
					raiting >= MAX_RAITING_VALUE
						? MAX_RAITING_VALUE
						: raiting + 1
				);
				raitingRefs.current[raiting]?.focus();
			}
			if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
				e.preventDefault();
				setRaiting(
					raiting <= MIN_RAITING_VALID_VALUE
						? MIN_RAITING_VALID_VALUE
						: raiting - 1
				);
				raitingRefs.current[raiting - 2]?.focus();
			}
		};

		return (
			<div
				className={cn(styles.rating, className, {
					[styles.error]: error,
				})}
				ref={ref}
				{...props}
			>
				{currentRaiting.map((el: JSX.Element, i: number) => (
					<span key={i}>{el}</span>
				))}
				{error && (
					<span className={styles.errorMessage}>{error.message}</span>
				)}
			</div>
		);
	}
);
