import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AdvantageCardProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string;
	text: string;
}
