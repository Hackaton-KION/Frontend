import * as React from 'react';
import { RouterProvider } from 'atomic-router-react';
import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';
import { controls, routes } from '@/shared/config';

const router = createHistoryRouter({
	routes: [
		{
			path: '/login',
			route: routes.login,
		},
		{
			path: '/',
			route: routes.main,
		},
		{
			path: '/film/:id',
			route: routes.film,
		}
	],
	controls,
});

router.setHistory(createBrowserHistory());

export const withRouter =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<RouterProvider router={router}>
					<Component />
				</RouterProvider>
			);
		};
