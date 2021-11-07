import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { HTag, Input, Raiting, Tag, Textarea } from '../components';
import { Button } from '../components';
import { PTag } from '../components';
import { WithLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/page.interface';

function Home({ firstCategory, menu }: HomeProps): JSX.Element {
	const [raiting, setRaiting] = useState<number>(0);

	return (
		<>
			<HTag tag='h1'>ЭТО МЫ::H1</HTag>
			<HTag tag='h2'>ЭТО МЫ::H2</HTag>
			<HTag tag='h3'>ЭТО МЫ::H3</HTag>
			<Button
				appearance='primary'
				onClick={() => {
					console.log('HERE');
				}}
				arrow='down'
			>
				Узнать подробнее
			</Button>
			<div>.</div>
			<Button appearance='ghost' className='dddsss' arrow='right'>
				Читать отзывы
			</Button>

			<PTag>
				Студенты освоят не только hard skills, необходимые для работы
				веб-дизайнером, но и soft skills — навыки, которые позволят
				эффективно взаимодействовать в команде с менеджерами,
				разработчиками и маркетологами. Выпускники факультета могут
				успешно конкурировать с веб-дизайнерами уровня middle.
			</PTag>

			<PTag size='small'>
				Напишу сразу в двух курсах, так как проходил оба. Java будет
				многим непросвещённым сложновата в изучении, но здесь перевес
				из-за лидирующего положения языка как самого популярного в
				программировании. Выбор мой пал на эту профессию еще и потому,
				что Java-разработчики получают самую большую зарплату. Хотя
				Python начинает догонять Java по многим моментам, но вот в
				крупном екоме разработке Джава все-таки остается главенствующей
				сейчас. Скажу так – полнота программы и интенсивность присуща
				обоим курсам GeekBrains. Хочу отметить, что с первого дня
				занятий вы приступаете к практике и получаете опыт коммерческой
				разработки уже в свое резюме. Скажу вам как прошедший это –
				реально помогло в трудоустройстве!
			</PTag>

			<PTag size='large'>
				Выше указаны программы Adobe InDesign, Adobe Illustrator, Corel
				Draw и ими можно успешно пользоваться дома или в дороге.
				Современные ноутбуки хорошо справляются с нагрузкой, так зачем
				загонять специалиста в душный офис. В этой профессии важным
				считается вдохновение, поэтому дизайнеры ищут его в разных
				местах.
			</PTag>
			<p />

			<Tag>Photoshop</Tag>
			<Tag>Дизайн</Tag>
			<Tag size='middle' color='gray'>
				10
			</Tag>
			<Tag color='green'>-10 000 ₽</Tag>
			<Tag size='middle' color='red' href='https://hh.ru/'>
				hh.ru
			</Tag>
			<Tag color='primary'>Работа в Photoshop</Tag>
			<Tag color='primary'>Подготовка макетов</Tag>
			<Tag color='primary'>Графический дизайн</Tag>
			<Tag color='primary'>Web дизайн</Tag>
			<Tag color='primary'>Дизайн сайтов</Tag>

			<Raiting raiting={raiting} isEditable setRaiting={setRaiting} />

			<Input placeholder='Имя' />

			<Textarea placeholder='Текст отзыва' />

			<ul>
				<b>Категория:</b> {firstCategory}
				{menu.map((item) => (
					<li key={item._id.secondCategory}>
						{item._id.secondCategory}
					</li>
				))}
			</ul>
		</>
	);
}

export default WithLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory: number = TopLevelCategory.Courses;
	const { data: menu } = await axios.post<MenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
		{ firstCategory }
	);

	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
}
