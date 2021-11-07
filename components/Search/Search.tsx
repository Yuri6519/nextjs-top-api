import React, { ChangeEvent, useState } from 'react';
import { SearchProps } from './Search.props';
import cn from 'classnames';
import styles from './Search.module.css';
import { Button, Input } from '..';
import SearchIcon from './search.svg';
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');

	const { push } = useRouter();

	const goToSearchPage = () => {
		push({
			pathname: '/search',
			query: { sr: search },
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			goToSearchPage();
		}
	};

	return (
		<div className={cn(styles.search, className, {})} {...props}>
			<Input
				className={styles.input}
				placeholder='Поиск...'
				value={search}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setSearch(e.target.value);
				}}
				onKeyDown={handleKeyDown}
			/>
			<Button
				className={styles.button}
				appearance='primary'
				onClick={goToSearchPage}
			>
				<SearchIcon />
			</Button>
		</div>
	);
};
