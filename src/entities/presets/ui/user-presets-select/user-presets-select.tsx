import { MenuItem } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';
import { userPresetsModel } from '../../model';

export interface UserPresetsSelectProps extends CommonProps, FieldProps {}

export const UserPresetsSelect: React.FC<UserPresetsSelectProps> = (props) => {
	const presets = useUnit(userPresetsModel.query);

	return (
		<Field {...props}>
			{presets.data.map((preset) => (
				<MenuItem key={preset.id}>{preset.name}</MenuItem>
			))}
		</Field>
	);
};
