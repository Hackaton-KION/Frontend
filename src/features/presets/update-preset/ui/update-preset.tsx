import { Popover } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { CommonProps, VoidFunction } from '@/shared/types';
import { form } from '../model';
import styles from './update-preset.module.css';
import { PresetForm } from '../../shared/ui';

export interface UpdatePresetProps extends CommonProps {
	readonly open: boolean;
	readonly onClose: VoidFunction;
	readonly anchorEl: HTMLElement | null;
}

export const UpdatePreset: React.FC<UpdatePresetProps> = (props) => {
	const { className, open, onClose, anchorEl } = props;

	return (
		<Popover open={open} anchorEl={anchorEl} onClose={onClose}>
			<div className={cn(styles.wrapper, className)}>
				<PresetForm $form={form} />
			</div>
		</Popover>
	);
};
