import React from 'react';
import { AdvantageCardProps } from './AdvantageCard.props';
import cn from 'classnames';
import styles from './AdvantageCard.module.css';
import { HTag, PTag } from '..';
import AdvIcon from './adv.svg';

export const AdvantageCard = ({
	title,
	text,
	className,
	...props
}: AdvantageCardProps): JSX.Element => {
	return (
		<div className={cn(styles.card, className)} {...props}>
			<div className={styles.title}>
				{title && <AdvIcon />}
				<HTag tag='h3'>{title}</HTag>
			</div>
			<PTag size='large' className={styles.text}>
				{text}
			</PTag>
		</div>
	);
};
