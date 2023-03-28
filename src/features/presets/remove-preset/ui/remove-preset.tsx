import DeleteIcon from '@mui/icons-material/Delete';
import { CommonProps } from '@/shared/types';
import {
	Alert,
	AlertTitle,
	Button,
	Dialog,
	DialogActions,
	DialogContentText,
	DialogTitle,
	IconButton,
} from '@mui/material';
import * as React from 'react';
import { useToggle } from '@/shared/lib';
import { useUnit } from 'effector-react';
import { removePresetModel } from '..';

export interface RemovePresetProps extends CommonProps {
	readonly id: number;
}

export const RemovePreset: React.FC<RemovePresetProps> = (props) => {
	const { id, className } = props;
	const [open, openControls] = useToggle();
	const remove = useUnit(removePresetModel.mutation);

	const onRemove = () => {
		remove.start({ id });
	};

	return (
		<>
			<IconButton className={className} onClick={openControls.toggle}>
				<DeleteIcon />
			</IconButton>
			<Dialog color='error' onClose={openControls.toggleOff} open={open}>
				<DialogTitle>Внимание</DialogTitle>
				<DialogContentText>
					В уверены, что хотите удалить профиль настроек?
				</DialogContentText>
				<DialogActions>
					<Button onClick={onRemove} variant='contained' color='error'>
						Удалить
					</Button>
					<Button onClick={openControls.toggleOff} variant='contained'>
						Отменить
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
