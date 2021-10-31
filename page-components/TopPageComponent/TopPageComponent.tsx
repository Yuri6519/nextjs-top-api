//import cn from 'classnames';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import React, { useReducer } from 'react';
import { Advantages, HhData, HTag, Sort, Tag } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { sortReducer, SortReducer } from '../../components/Sort/sort.reducer';
//import { AdvantageData } from '../../components/AdvantageData/AdvantageData';

export const TopPageComponent = ({
	firstCategory,
	page,
	products,
}: TopPageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort: sorted }, dispatchSort] =
		useReducer<SortReducer>(sortReducer, {
			sort: SortEnum.Raiting,
			products,
		});

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort });
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<HTag tag='h1'>{page.title}</HTag>
				{products && (
					<Tag size='middle' color='gray'>
						{products.length}
					</Tag>
				)}
				<Sort sort={sorted} setSort={setSort} />
			</div>

			{sortedProducts &&
				sortedProducts.map((p) => <div key={p._id}>{p.title}</div>)}

			<div className={styles.HhTitle}>
				<HTag tag='h2'>Вакансии - {page.category}</HTag>
				<Tag size='middle' color='red' href='https://hh.ru/'>
					hh.ru
				</Tag>
			</div>

			{firstCategory === TopLevelCategory.Courses && page.hh && (
				<HhData {...page.hh} />
			)}

			{page.advantages && page.advantages.length > 0 && (
				<>
					<HTag tag='h2'>Преимущества</HTag>
					<Advantages advantages={page.advantages} />
				</>
			)}

			{page.seoText && (
				<div
					className={styles.seo}
					dangerouslySetInnerHTML={{ __html: page.seoText }}
				/>
			)}

			<HTag tag='h2'>Получаемые навыки</HTag>

			{page.tags.map((t, i) => (
				<Tag key={i} color='primary'>
					{t}
				</Tag>
			))}

			{/* My decission */}
			{/* <HTag tag='h2'>Преимущества</HTag>

			<AdvantageData advantages={page.advantages}>
				При завершении очередного проекта над графикой, специалист
				всегда задает себе вопрос о дальнейших перспективах. Отличие
				профессиональных дизайнеров заключается в том, что они гибкие.
				Сегодня разрабатывается логотип новой компании, а завтра вполне
				можно переключиться на иллюстрацию культовой книги.
			</AdvantageData> */}

			{/* My decission */}
			{/* 
			<HTag tag='h2'>Получаемые навыки</HTag>
			<Tag color='primary'>Работа в Photoshop</Tag>
			<Tag color='primary'>Подготовка макетов</Tag>
			<Tag color='primary'>Графический дизайн</Tag>
			<Tag color='primary'>Web дизайн</Tag>
			<Tag color='primary'>Дизайн сайтов</Tag> */}
		</div>
	);
};
