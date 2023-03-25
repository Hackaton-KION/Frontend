import { createDomain } from 'effector';

const authUser = createDomain();

export const $user = authUser.store<any>(null);
export const $isAuth = $user.map((user) => !!user);
