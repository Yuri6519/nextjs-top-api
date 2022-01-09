import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import { Button, Input, Raiting, Textarea } from '..';
import CloseItem from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({
	productId,
	className,
	isOpened,
	...props
}: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IReviewForm>();

	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(
				API.review.createDemo,
				{
					...formData,
					productId: productId,
				}
			);

			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setIsSuccess(false);
				setError('Что-то пошло не так');
			}
		} catch (e: any) {
			setError(e.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					{...register('name', {
						required: { value: true, message: 'Заполните имя' },
					})}
					placeholder='Имя'
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
				/>
				<Input
					className={styles.title}
					placeholder='Заголовок отзыва'
					error={errors.title}
					{...register('title', {
						required: {
							value: true,
							message: 'Заполните заголовок',
						},
					})}
					tabIndex={isOpened ? 0 : -1}
				/>
				<div className={styles.raiting}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={{
							required: {
								value: true,
								message: 'Поставьте рейтинг',
							},
						}}
						render={({ field }) => (
							<Raiting
								error={errors.rating}
								isEditable
								raiting={field.value}
								setRaiting={field.onChange}
								ref={field.ref}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>
				<Textarea
					className={styles.description}
					placeholder='Текст отзыва'
					error={errors.description}
					{...register('description', {
						required: {
							value: true,
							message: 'Заполните описание',
						},
					})}
					tabIndex={isOpened ? 0 : -1}
				/>
				<div className={styles.submit}>
					<Button appearance={'primary'} tabIndex={isOpened ? 0 : -1}>
						Отправить
					</Button>
					<span>
						* Перед публикацией отзыв пройдет предварительную
						модерацию и проверку
					</span>
				</div>
			</div>
			{isSuccess && (
				<div className={cn(styles.panel, styles.success)}>
					<div className={styles.successTitle}>
						Ваш отзыв отправлен
					</div>
					<div className={styles.successText}>
						Отзыв будет опубликован после проверки
					</div>
					<CloseItem
						className={styles.close}
						onClick={() => setIsSuccess(false)}
					/>
				</div>
			)}
			{error && (
				<div className={cn(styles.panel, styles.error)}>
					<div className={styles.successTitle}>
						Произошла ошибка, попробуйте обновить страницу.
					</div>
					<div className={styles.successText}>
						Ошибка:&nbsp;{error}
					</div>
					<CloseItem
						className={cn(styles.close, styles.errorClose)}
						onClick={() => setError(undefined)}
					/>
				</div>
			)}
		</form>
	);
};
