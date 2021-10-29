import { AdvantageDataProps } from './AdvantageData.props';
import styles from './AdvantageData.module.css';
import { AdvantageCard } from '../AdvantageCard/AdvantageCard';
import { PTag } from '..';

export const AdvantageData = ({
	advantages,
	children,
}: AdvantageDataProps): JSX.Element => {
	return advantages ? (
		<div className={styles.adv}>
			{advantages.map((adv) => (
				<AdvantageCard
					key={adv._id}
					title={adv.title}
					text={adv.description}
				/>
			))}

			<PTag className={styles.text} size='large'>
				{children}
			</PTag>
		</div>
	) : (
		<></>
	);
};
