import { debug } from 'patronum';
import { redirect } from 'atomic-router';
import { loginModel } from '@/features/auth';
import { routes } from '@/shared/config';

redirect({
	clock: loginModel.mutation.finished.success,
	route: routes.home,
});

debug(loginModel.mutation.finished.success);
