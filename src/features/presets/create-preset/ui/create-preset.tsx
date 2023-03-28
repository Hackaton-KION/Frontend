import { Popover } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { CommonProps, VoidFunction } from '@/shared/types';
import { form } from '../model';
import styles from './create-preset.module.css';
import { PresetForm } from '../../shared/ui';

export interface CreatePresetProps extends CommonProps {
	readonly open: boolean;
	readonly onClose: VoidFunction;
	readonly anchorEl: HTMLElement | null;
}

export const CreatePreset: React.FC<CreatePresetProps> = (props) => {
	const { className, open, onClose, anchorEl } = props;

	return (
		<Popover open={open} anchorEl={anchorEl} onClose={onClose}>
			<PresetForm className={className} $form={form} />
		</Popover>
	);
};
