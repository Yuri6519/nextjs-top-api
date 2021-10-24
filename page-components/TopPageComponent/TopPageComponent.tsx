//import cn from 'classnames';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import React from 'react';
import { HhData, HTag, Tag } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';

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
		</div>
	);
};
