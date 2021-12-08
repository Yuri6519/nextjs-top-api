import axios from 'axios';
import { GetStaticProps } from 'next';
import { API } from '../helpers/api';
import { MenuItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/page.interface';
import { WithLayout } from '../layout/Layout';

function Search(): JSX.Element {
	return <>СТРАНИЦА ПОИСКА</>;
}

export default WithLayout(Search);

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
	const firstCategory: TopLevelCategory = TopLevelCategory.Courses;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory,
	});

	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

interface SearchProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
}
