import { TextareaProps } from './Textarea.props';
import cn from 'classnames';
import styles from './Textarea.module.css';
import { ForwardedRef, forwardRef } from 'react';

export const Textarea = forwardRef(
	(
		{ className, error, ...props }: TextareaProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		return (
			<div className={cn(styles.textareaWrapper, className)} ref={ref}>
				<textarea
					{...props}
					className={cn(styles.textarea, {
						[styles.error]: error,
					})}
				/>
				{error && (
					<span className={styles.errorMessage}>{error.message}</span>
				)}
			</div>
		);
	}
);
