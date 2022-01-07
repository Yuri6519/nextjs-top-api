import React, { KeyboardEvent, useContext } from 'react';
import cn from 'classnames';
import styles from './Menu.module.css';
import { AppContext, IAppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion } from 'framer-motion';

export const Menu = (): JSX.Element => {
	const {
		menu: serverMenu,
		firstCategory,
		setMenu,
	} = useContext<IAppContext>(AppContext);

	const router = useRouter();

	const variants = {
		visible: {
			marginBottom: 20,
			marginTop: 10,
			paddingTop: 3,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1,
			},
		},
		hidden: {
			marginBottom: 0,
		},
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 'auto',
		},
		hidden: {
			opacity: 0,
			height: 0,
		},
	};

	const setMenueOpen = (secondCategory: string) => {
		const newMenu = serverMenu.map((m) => {
			if (m._id.secondCategory === secondCategory) m.isOpen = !m.isOpen;
			return m;
		});
		setMenu && setMenu(newMenu);
	};

	const setMenueOpenByKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code === 'Space' || key.code === 'Enter') {
			key.preventDefault();
			setMenueOpen(secondCategory);
		}
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
								tabIndex={0}
								className={cn(styles.secondLevel)}
								onClick={() =>
									setMenueOpen(m._id.secondCategory)
								}
								onKeyDown={(key: KeyboardEvent) =>
									setMenueOpenByKey(key, m._id.secondCategory)
								}
							>
								{m._id.secondCategory}
							</div>
							<motion.div
								layout
								className={cn(styles.secondLevelBlock)}
								variants={variants}
								initial={m.isOpen ? 'visible' : 'hidden'}
								animate={m.isOpen ? 'visible' : 'hidden'}
							>
								{buildThirdLevel(
									m.pages,
									firstLevelMenuItem.route,
									m.isOpen ?? false
								)}
							</motion.div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (
		pages: PageItem[],
		route: string,
		isOpened: boolean
	): React.ReactNode => {
		return pages.map((page) => {
			const routing = `/${route}/${page.alias}`;
			return (
				<motion.div key={page._id} variants={variantsChildren}>
					<Link href={routing}>
						<a
							className={cn(styles.thirdLevel, {
								[styles.thirdLevelActive]:
									router.asPath === routing,
							})}
							tabIndex={isOpened ? 0 : -1}
						>
							{page.category}
						</a>
					</Link>
				</motion.div>
			);
		});
	};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
