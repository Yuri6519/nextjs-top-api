import React, { useState } from 'react';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import styles from './Product.module.css';
import { Button, Card, Divider, Raiting, Review, ReviewForm, Tag } from '..';
import { declOfNum, /*getDeclination,*/ priceRu } from '../../helpers/helpers';
import Image from 'next/image';

export const Product = ({ product }: ProductProps): JSX.Element => {
	//** MOCK */
	// product.disadvantages =
	// 	product.price <= 50000
	// 		? ''
	// 		: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error enim, labore recusandae magni corporis est laborum quidem earum incidunt similique voluptatum nesciunt quam eligendi. Architecto magnam aliquam facilis hic ratione!';

	const [IsReviewOpened, setIsReviewOpened] = useState<boolean>(false);

	return (
		<>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image
						src={`${process.env.NEXT_PUBLIC_DOMAIN}${product.image}`}
						alt={product.image}
						height={70}
						width={70}
					/>
				</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					<span>{priceRu(product.price)}</span>
					{product.oldPrice && (
						<Tag className={styles.oldPrice} color='green'>
							{priceRu(product.price - product.oldPrice)}
						</Tag>
					)}
				</div>
				<div className={styles.credit}>
					{priceRu(product.credit)}
					<span className={styles.month}>/мес</span>
				</div>
				<div className={styles.raiting}>
					<Raiting
						raiting={product.reviewAvg ?? product.initialRating}
					/>
				</div>
				<div className={styles.tags}>
					{product.categories.map((c) => (
						<Tag key={c} className={styles.category}>
							{c}
						</Tag>
					))}
				</div>
				<div className={styles.priceTitle}>цена</div>
				<div className={styles.creditTitle}>в кредит</div>
				<div className={styles.rateTitle}>
					{product.reviewCount}
					{/* &nbsp;
				{getDeclination(product.reviewCount, [
					'отзыв',
					'отзыва',
					'отзывов',
				])} */}
					&nbsp;
					{declOfNum(product.reviewCount, [
						'отзыв',
						'отзыва',
						'отзывов',
					])}
				</div>

				<Divider className={styles.hr} />

				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map((ch) => (
						<div key={ch.name} className={styles.characteristics}>
							<span className={styles.characteristicsName}>
								{ch.name}
							</span>
							<span className={styles.characteristicsDots} />
							<span className={styles.characteristicsValue}>
								{ch.value}
							</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && (
						<div className={styles.advantages}>
							<div className={styles.advTitle}>Преимущества</div>
							<div>{product.advantages}</div>
						</div>
					)}
					{product.disadvantages && (
						<div className={styles.disadvantages}>
							<div className={styles.advTitle}>Недостатки</div>
							<div>{product.disadvantages}</div>
						</div>
					)}
				</div>
				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						appearance='ghost'
						arrow={!IsReviewOpened ? 'right' : 'down'}
						className={styles.reviewButton}
						onClick={() => {
							setIsReviewOpened(!IsReviewOpened);
						}}
					>
						Читать отзывы
					</Button>
				</div>
			</Card>
			<Card
				color='blue'
				className={cn(styles.reviews, {
					[styles.opened]: IsReviewOpened,
					[styles.closed]: !IsReviewOpened,
				})}
			>
				<>
					{product.reviews.map((r) => {
						return <Review key={r._id} review={r} />;
					})}
					<Divider />
					<ReviewForm productId={product._id} />
				</>
			</Card>
		</>
	);
};
