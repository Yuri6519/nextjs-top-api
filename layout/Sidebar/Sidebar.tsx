import React from 'react';
import { Menu } from '../Menu/Menu';
import { SidebarProps } from './Sidebar.props';
import Logo from '../Logo.svg';
import cn from 'classnames';
import styles from './Sidebar.module.css';
import { Search } from '../../components';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>
			<Logo className={styles.logo} />
			<div className={styles.search}>
				<Search />
			</div>
			<Menu />
		</div>
	);
};
