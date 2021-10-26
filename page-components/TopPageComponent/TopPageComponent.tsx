//import cn from 'classnames';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import React from 'react';
import { HhData, HTag, Tag } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { AdvantageData } from '../../components/AdvantageData/AdvantageData';

export const TopPageComponent = ({
	firstCategory,
	page,
	products,
}: TopPageComponentProps): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<HTag tag='h1'>{page.title}</HTag>
				{products && (
					<Tag size='middle' color='gray'>
						{products.length}
					</Tag>
				)}
				<span>Сортировка</span>
			</div>

			{products && products.map((p) => <div key={p._id}>{p.title}</div>)}

			<div className={styles.HhTitle}>
				<HTag tag='h2'>Вакансии - {page.category}</HTag>
				<Tag size='middle' color='red' href='https://hh.ru/'>
					hh.ru
				</Tag>
			</div>

			{firstCategory === TopLevelCategory.Courses && (
				<HhData {...page.hh} />
			)}

			<HTag tag='h2'>Преимущества</HTag>

			<AdvantageData advantages={page.advantages}>
				При завершении очередного проекта над графикой, специалист
				всегда задает себе вопрос о дальнейших перспективах. Отличие
				профессиональных дизайнеров заключается в том, что они гибкие.
				Сегодня разрабатывается логотип новой компании, а завтра вполне
				можно переключиться на иллюстрацию культовой книги.
			</AdvantageData>

			<HTag tag='h2'>Получаемые навыки</HTag>
		</div>
	);
};
