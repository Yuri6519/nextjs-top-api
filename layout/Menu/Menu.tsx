import React, { useContext } from 'react';
import cn from 'classnames';
import styles from './Menu.module.css';
import { AppContext, IAppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';

export const Menu = (): JSX.Element => {
	const {
		menu: serverMenu,
		firstCategory,
		setMenu,
	} = useContext<IAppContext>(AppContext);

	const router = useRouter();

	const setMenueOpen = (secondCategory: string) => {
		const newMenu = serverMenu.map((m) => {
			if (m._id.secondCategory === secondCategory) m.isOpen = !m.isOpen;
			return m;
		});
		setMenu && setMenu(newMenu);
	};

	const buildFirstLevel = (): React.ReactNode => {
		return (
			<>
				{firstLevelMenu.map((menu) => {
					return (
						<div key={menu.route}>
							<Link href={`/${menu.route}`}>
								<a>
									<div
										className={cn(styles.firstLevel, {
											[styles.firstlevelActive]:
												menu.id === firstCategory,
										})}
									>
										{menu.icon}
										<span>{menu.name}</span>
									</div>
								</a>
							</Link>
							{menu.id === firstCategory &&
								buildSecondLevel(menu)}
						</div>
					);
				})}
			</>
		);
	};

	const buildSecondLevel = (
		firstLevelMenuItem: FirstLevelMenuItem
	): React.ReactNode => {
		if (!serverMenu || serverMenu.length === 0) return <></>;

		return (
			<div className={styles.secondBlock}>
				{serverMenu.map((m) => {
					if (
						m.pages
							.map((p) => p.alias)
							.includes(router.asPath.split('/')[2])
					)
						m.isOpen = true;

					return (
						<div key={m._id.secondCategory}>
							<div
								className={cn(styles.secondLevel)}
								onClick={() =>
									setMenueOpen(m._id.secondCategory)
								}
							>
								{m._id.secondCategory}
							</div>
							<div
								className={cn(styles.secondLevelBlock, {
									[styles.secondLevelBlockOpened]: m.isOpen,
								})}
							>
								{m.isOpen &&
									buildThirdLevel(
										m.pages,
										firstLevelMenuItem.route
									)}
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (
		pages: PageItem[],
		route: string
	): React.ReactNode => {
		return pages.map((page) => {
			const routing = `/${route}/${page.alias}`;
			return (
				<Link href={routing} key={page._id}>
					<a
						className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]:
								router.asPath === routing,
						})}
					>
						{page.category}
					</a>
				</Link>
			);
		});
	};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
