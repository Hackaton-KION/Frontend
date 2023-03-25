import { Button } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useForm } from 'effector-forms';
import { CommonProps } from '@/shared/types';

import styles from './login-form.module.css';
import { form } from '../model';
import { useSubmit } from '@/shared/lib';
import { Field } from '@/shared/ui';

export interface LoginFormProps extends CommonProps {}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
	const { className, } = props;
	const { fields, submit, } = useForm(form);

	const { login, password, } = fields;

	const onSubmit = useSubmit(submit);

	return (
		<form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<Field
				className={styles.field}
				value={login.value}
				onChange={login.onChange}
				onBlur={login.onBlur}
				helperText={login.errorText()}
				isValid={login.isValid}
				name={login.name}
				label='Телефон'
				type='tel'
			/>
			<Field
				className={styles.field}
				value={password.value}
				onChange={password.onChange}
				onBlur={password.onBlur}
				helperText={password.errorText()}
				isValid={password.isValid}
				name={password.name}
				label='Пароль'
				type='password'
			/>
			<Button className={styles.button} type='submit'>
				Войти
			</Button>
		</form>
	);
};
