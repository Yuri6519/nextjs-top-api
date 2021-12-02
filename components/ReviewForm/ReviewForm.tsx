import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import { Button, Input, Raiting, Textarea } from '..';
import CloseItem from './close.svg';

export const ReviewForm = ({
	productId,
	className,
	...props
}: ReviewFormProps): JSX.Element => {
	return (
		<>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input placeholder='Имя' />
				<Input
					className={styles.title}
					placeholder='Заголовок отзыва'
				/>
				<div className={styles.raiting}>
					<span>Оценка:</span>
					<Raiting raiting={0} />
				</div>
				<Textarea
					className={styles.description}
					placeholder='Текст отзыва'
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
		</>
	);
};
