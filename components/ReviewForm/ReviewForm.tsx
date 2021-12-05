import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import { Button, Input, Raiting, Textarea } from '..';
import CloseItem from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm } from './ReviewForm.interface';

export const ReviewForm = ({
	productId,
	className,
	...props
}: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IReviewForm>();

	const onSubmit = (data: IReviewForm) => {
		console.log(data);
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
				/>
				<div className={styles.raiting}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						render={({ field }) => (
							<Raiting
								isEditable
								raiting={field.value}
								setRaiting={field.onChange}
								ref={field.ref}
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
				/>
				<div className={styles.submit}>
					<Button appearance={'primary'}>Отправить</Button>
					<span>
						* Перед публикацией отзыв пройдет предварительную
						модерацию и проверку
					</span>
				</div>
			</div>
			<div className={styles.success}>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<div className={styles.successText}>
					Отзыв будет опубликован после проверки
				</div>
				<CloseItem className={styles.close} />
			</div>
		</form>
	);
};