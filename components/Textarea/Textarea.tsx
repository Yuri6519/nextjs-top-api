import { TextareaProps } from './Textarea.props';
import cn from 'classnames';
import styles from './Textarea.module.css';

export const Textarea = ({
	className,
	...props
}: TextareaProps): JSX.Element => {
	return <textarea className={cn(styles.textarea, className)} {...props} />;
};
