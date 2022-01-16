import { HTag } from '../components';
import { WithLayout } from '../layout/Layout';

export function Error404(): JSX.Element {
	return (
		<>
			<HTag tag={'h1'}>Error 404</HTag>
		</>
	);
}

export default WithLayout(Error404);
