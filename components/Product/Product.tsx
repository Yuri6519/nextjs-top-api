import React, {
	ForwardedRef,
	forwardRef,
	KeyboardEvent,
	useRef,
	useState,
} from 'react';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import styles from './Product.module.css';
import { Button, Card, Divider, Raiting, Review, ReviewForm, Tag } from '..';
import { declOfNum, /*getDeclination,*/ priceRu } from '../../helpers/helpers';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const Product = motion(
	forwardRef(
		(
			{ product, className, ...props }: ProductProps,
			ref: ForwardedRef<HTMLDivElement>
		): JSX.Element => {
			//** MOCK */
			// product.disadvantages =
			// 	product.price <= 50000
			// 		? ''
			// 		: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error enim, labore recusandae magni corporis est laborum quidem earum incidunt similique voluptatum nesciunt quam eligendi. Architecto magnam aliquam facilis hic ratione!';

			const [IsReviewOpened, setIsReviewOpened] =
				useState<boolean>(false);

			const reviewRef = useRef<HTMLDivElement>(null);

			const scrolloReviewForm = () => {
				setIsReviewOpened(true);
				reviewRef.current?.focus();
				reviewRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			};

			const scrolloReviewFormByKey = (key: KeyboardEvent) => {
				if (key.code === 'Space' || key.code === 'Enter') {
					key.preventDefault();
					scrolloReviewForm();
				}
			};

			return (
				<div className={className} {...props} ref={ref} tabIndex={0}>
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
								raiting={
									product.reviewAvg ?? product.initialRating
								}
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
							<span
								className={cn({
									[styles.rateTitleLink]:
										product.reviewCount > 0,
								})}
								tabIndex={product.reviewCount > 0 ? 0 : -1}
								onClick={
									product.reviewCount > 0
										? scrolloReviewForm
										: undefined
								}
								onKeyDown={
									product.reviewCount > 0
										? scrolloReviewFormByKey
										: undefined
								}
							>
								{product.reviewCount}
								&nbsp;
								{declOfNum(product.reviewCount, [
									'отзыв',
									'отзыва',
									'отзывов',
								])}
							</span>
						</div>

						<Divider className={styles.hr} />

						<div className={styles.description}>
							{product.description}
						</div>
						<div className={styles.feature}>
							{product.characteristics.map((ch) => (
								<div
									key={ch.name}
									className={styles.characteristics}
								>
									<span
										className={styles.characteristicsName}
									>
										{ch.name}
									</span>
									<span
										className={styles.characteristicsDots}
									/>
									<span
										className={styles.characteristicsValue}
									>
										{ch.value}
									</span>
								</div>
							))}
						</div>
						<div className={styles.advBlock}>
							{product.advantages && (
								<div className={styles.advantages}>
									<div className={styles.advTitle}>
										Преимущества
									</div>
									<div>{product.advantages}</div>
								</div>
							)}
							{product.disadvantages && (
								<div className={styles.disadvantages}>
									<div className={styles.advTitle}>
										Недостатки
									</div>
									<div>{product.disadvantages}</div>
								</div>
							)}
						</div>
						<Divider className={cn(styles.hr, styles.hr2)} />
						<div className={styles.actions}>
							<Button appearance='primary'>
								Узнать подробнее
							</Button>
							<Button
								appearance='ghost'
								arrow={!IsReviewOpened ? 'right' : 'down'}
								className={styles.reviewButton}
								onClick={() => {
									setIsReviewOpened(!IsReviewOpened);
								}}
							>
								{product.reviewCount > 0
									? 'Читать отзывы'
									: 'Добавить отзыв'}
							</Button>
						</div>
					</Card>
					<Card
						layout
						color='blue'
						ref={reviewRef}
						tabIndex={0}
						className={cn(styles.reviews, {
							[styles.opened]: IsReviewOpened,
							[styles.closed]: !IsReviewOpened,
						})}
					>
						{product.reviews.map((r) => {
							return (
								<div key={r._id}>
									<Review review={r} />
									<Divider />
								</div>
							);
						})}
						<ReviewForm productId={product._id} />
					</Card>
				</div>
			);
		}
	)
);
