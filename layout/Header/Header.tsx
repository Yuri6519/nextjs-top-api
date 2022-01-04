import React, { useEffect, useState } from 'react';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import styles from './Header.module.css';
import Logo from '../Logo.svg';
import { ButtonIcon } from '../../components';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useRouter } from 'next/router';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	const [menuOpened, setMenuOpened] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		setMenuOpened(false);
	}, [router]);

	const variants = {
		visible: {
			opacity: 1,
			x: 0,
			transition: { stiffness: 20 },
		},
		hidden: { opacity: 0, x: '100%' },
	};

	return (
		<header className={cn(styles.header, className)} {...props}>
			<Logo />
			<ButtonIcon
				appearance='white'
				icon='menu'
				onClick={() => setMenuOpened(true)}
			/>
			<motion.div
				className={styles.mobileMenu}
				variants={variants}
				initial={'hidden'}
				animate={menuOpened ? 'visible' : 'hidden'}
			>
				<Sidebar />
				<ButtonIcon
					className={styles.menuClose}
					appearance='white'
					icon='close'
					onClick={() => setMenuOpened(false)}
				/>
			</motion.div>
		</header>
	);
};
