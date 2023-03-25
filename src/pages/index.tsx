import { CircularProgress } from '@mui/material';
import { createRoutesView } from 'atomic-router-react';
import * as React from 'react';
import { routes } from '@/shared/config';

const LoginPage = React.lazy(() => import('./login'));
const HomePage = React.lazy(() => import('./home'));

const View = createRoutesView({
	routes: [
		{
			route: routes.login,
			view: LoginPage,
		},
		{
			route: routes.home,
			view: HomePage,
		}
	],
});

export const Pages: React.FC = () => {
	return (
		<React.Suspense fallback={<CircularProgress />}>
			<View />
		</React.Suspense>
	);
};
