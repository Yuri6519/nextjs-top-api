import { HTag } from '../components';
import { WithLayout } from '../layout/Layout';

export function Error500(): JSX.Element {
	return (
		<>
			<HTag tag={'h1'}>Error 500</HTag>
		</>
	);
}

export default WithLayout(Error500);
