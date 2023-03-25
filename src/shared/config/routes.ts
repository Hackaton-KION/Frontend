import { createRoute, createRouterControls } from 'atomic-router';

export const routes = {
	login: createRoute(),
	main: createRoute(),
	film: createRoute<{ id: number }>(),
};

export const controls = createRouterControls();
