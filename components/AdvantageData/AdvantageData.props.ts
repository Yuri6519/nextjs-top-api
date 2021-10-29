import { ReactNode } from 'react';
import { TopPageAdvantage } from '../../interfaces/page.interface';

export interface AdvantageDataProps {
	advantages?: TopPageAdvantage[];
	children: ReactNode;
}
