import { UserPresets } from '@/entities/presets';
import { CreatePreset, RemovePreset, UpdatePreset } from '@/features/presets';
import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { EyeIcon } from '@/shared/ui';
import { IconButton } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { selectedPresetModel } from '../../model';
import styles from './film-extra-controls.module.css';

export interface FilmExtraControlsProps extends CommonProps {}

export const FilmExtraControls: React.FC<FilmExtraControlsProps> = (props) => {
	const { className } = props;
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const [presetsOpen, presetsControls] = useToggle();
	const [createOpen, createControls] = useToggle();
	const [updateOpen, updateControls] = useToggle();
	const [removeOpen, removeControls] = useToggle();
	const [selectedId, onSelect] = useUnit([
		selectedPresetModel.$id,
		selectedPresetModel.selected,
	]);

	const onUpdate = (id: number) => {
		updateControls.toggleOn();
		selectedPresetModel.selected(id);
	};

	const closeUpdate = () => {
		updateControls.toggleOff();
		onSelect(null);
	};

	const onRemove = (id: number) => {
		removeControls.toggleOn();
		onSelect(id);
	};

	const closeRemove = () => {
		updateControls.toggleOff();
		onSelect(null);
	};

	return (
		<>
			<IconButton
				className={cn(styles.button, className)}
				onClick={presetsControls.toggle}
				ref={setAnchorEl}>
				<EyeIcon />
			</IconButton>
			<UserPresets
				open={presetsOpen}
				anchorEl={anchorEl}
				onClose={presetsControls.toggleOff}
				onCreate={createControls.toggleOn}
				onUpdate={onUpdate}
				onDelete={onRemove}
			/>
			<CreatePreset
				open={createOpen}
				onClose={createControls.toggleOff}
				anchorEl={anchorEl}
			/>
			<UpdatePreset
				open={updateOpen}
				onClose={closeUpdate}
				anchorEl={anchorEl}
			/>
			<RemovePreset id={selectedId!} open={removeOpen} onClose={closeRemove} />
		</>
	);
};
