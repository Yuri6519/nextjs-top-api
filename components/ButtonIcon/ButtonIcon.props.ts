import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import up from './up.svg';
import close from './close.svg';
import menu from './menu.svg';

export const Icons = {
	up,
	close,
	menu,
};

export type IconNames = keyof typeof Icons;

export interface ButtonIconProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	icon: IconNames;
	appearance: 'primary' | 'white';
}
