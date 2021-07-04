import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface TagProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	size?: 'small' | 'middle';
	color?: 'ghost' | 'gray' | 'green' | 'red' | 'primary';
	href?: string;
	children: ReactNode;
}
