import React from 'react';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import styles from './Product.module.css';
import { Button, Card, Raiting, Tag } from '..';

export const Product = ({
	product,
	className,
	...props
}: ProductProps): JSX.Element => {
	return (
		<Card className={styles.product}>
			<div className={styles.logo}>
				<img
					src={`${process.env.NEXT_PUBLIC_DOMAIN}${product.image}`}
					alt={product.image}
				/>
			</div>
			<div className={styles.title}>{product.title}</div>
			<div className={styles.price}>{product.price}</div>
			<div className={styles.credit}>{product.credit}</div>
			<div className={styles.raiting}>
				<Raiting raiting={product.reviewAvg ?? product.initialRating} />
			</div>
			<div className={styles.tags}>
				{product.categories.map((c) => (
					<Tag>{c}</Tag>
				))}
			</div>
			<div className={styles.priceTitle}>цена</div>
			<div className={styles.creitTitle}>в кредит</div>
			<div className={styles.rateTitle}>
				{product.reviewCount}&nbsp;отзывов
			</div>
			<hr className={styles.hr} />
			<div className={styles.description}>{product.description}</div>
			<div className={styles.feature}>фитчи</div>
			<div className={styles.advBlock}>
				<div className={styles.advantages}>
					<div>Преимущества</div>
					<div>{product.advantages}</div>
				</div>
				<div className={styles.disadvantages}>
					<div>Недостатки</div>
					<div>{product.disadvantages}</div>
				</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.actions}>
				<Button appearance='primary'>Узнать подробнее</Button>
				<Button appearance='ghost' arrow='right'>
					Читать отзывы
				</Button>
			</div>
		</Card>
	);
};
