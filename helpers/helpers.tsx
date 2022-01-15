import { FirstLevelMenuItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/page.interface';
import BooksIcon from './Icons/books.svg';
import CoursesIcon from './Icons/courses.svg';
import ProductsIcon from './Icons/products.svg';
import ServicesIcon from './Icons/services.svg';

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{
		route: 'courses',
		name: 'Курсы',
		icon: <CoursesIcon />,
		id: TopLevelCategory.Courses,
	},
	{
		route: 'services',
		name: 'Сервисы',
		icon: <ServicesIcon />,
		id: TopLevelCategory.Services,
	},
	{
		route: 'books',
		name: 'Книги',
		icon: <BooksIcon />,
		id: TopLevelCategory.Books,
	},
	{
		route: 'products',
		name: 'Продукты',
		icon: <ProductsIcon />,
		id: TopLevelCategory.Products,
	},
];

export const priceSepr = (price = 0): string =>
	price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const priceRu = (price = 0): string => priceSepr(price).concat(' ₽');

//my one
export const getDeclination = (num: number, templates: string[]): string => {
	/**
		1 - отзыв
		2-4 - отзыва
		5-9 - отзывов
		0, 10-20 - отзывов
	*/

	if ((num >= 11 && num <= 19) || (num % 100 >= 11 && num % 100 <= 19)) {
		return templates[2];
	}

	if (num % 10 === 1) {
		return templates[0];
	}

	if (num % 10 >= 2 && num % 10 <= 4) {
		return templates[1];
	}

	// if (num % 10 === 0 || (num % 10 >= 5 && num % 10 <= 9)) {
	// 	return templates[2];
	// }

	return templates[2];
};

export const declOfNum = (
	number: number,
	titles: [string, string, string]
): string => {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[
		number % 100 > 4 && number % 100 < 20
			? 2
			: cases[number % 10 < 5 ? number % 10 : 5]
	];
};
