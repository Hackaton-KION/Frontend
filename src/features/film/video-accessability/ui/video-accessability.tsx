import {
	Switch,
	IconButton,
	Popover,
	MenuItem,
	Button,
	Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { SketchPicker } from 'react-color';

import { useSubmit, useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Checkbox, EyeIcon, Field, Slider } from '@/shared/ui';
import { form } from '../model';
import styles from './video-accessability.module.css';

const pickerStyles = {
	default: {
		picker: {
			backgroundColor: 'rgba(0, 0, 0, 0.904)',
		},
	},
};

const Android12Switch = styled(Switch)(({ theme, }) => ({
	padding: 8,
	'& .MuiSwitch-track': {
		borderRadius: 22 / 2,
		'&:before, &:after': {
			content: '""',
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
			width: 16,
			height: 16,
		},
		'&:before': {
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				theme.palette.getContrastText(theme.palette.primary.main)
			)}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
			left: 12,
		},
		'&:after': {
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				theme.palette.getContrastText(theme.palette.primary.main)
			)}" d="M19,13H5V11H19V13Z" /></svg>')`,
			right: 12,
		},
	},
	'& .MuiSwitch-thumb': {
		boxShadow: 'none',
		width: 16,
		height: 16,
		margin: 2,
	},
}));

export interface VideoAccessabilityProps extends CommonProps {}

export const VideoAccessability: React.FC<VideoAccessabilityProps> = (
	props
) => {
	const { className, } = props;
	const { fields, submit, } = useForm(form);
	const {
		blockingColorSpecter,
		brightness,
		contrast,
		sharpness,
		offBrightFlash,
		saturation,
	} = fields;
	const onSubmit = useSubmit(submit);

	const [redColor, setRedColor] = React.useState('rgb(255, 0, 0)');
	const [blueColor, setBlueColor] = React.useState('rgb(0, 255, 0)');
	const [greenColor, setGreenColor] = React.useState('rgb(0, 0, 255)');

	const [open, openControls] = useToggle();
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const [openRedPalette, paletteRedControls] = useToggle();
	const [openBluePalette, paletteBlueControls] = useToggle();
	const [openGreenPalette, paletteGreenControls] = useToggle();

	const [redPalette, setRedPalette] = React.useState<HTMLElement | null>(null);
	const [bluePalette, setBluePalette] = React.useState<HTMLElement | null>(
		null
	);
	const [greenPalette, setGreenPalette] = React.useState<HTMLElement | null>(
		null
	);

	return (
		<>
			<IconButton
				className={cn(styles.button, className)}
				onClick={openControls.toggle}
				ref={setAnchorEl}>
				<EyeIcon />
			</IconButton>
			<Popover open={open} anchorEl={anchorEl} onClose={openControls.toggleOff}>
				<div className={styles.wrapper}>
					<Typography variant='h5' component='p'>
						Настройки для пользователей с особыми поребностями
					</Typography>
					<form className={styles.form} onSubmit={onSubmit}>
						<div className={styles.header}>
							<Field
								className={styles.field}
								label='Пресеты'
								InputLabelProps={{ style: { color: 'white', }, }}
								size='small'
								select
								fullWidth>
								<MenuItem
									value={10}
									style={{ color: 'black', fontSize: '18px', }}>
									Тот
								</MenuItem>
								<MenuItem
									value={20}
									style={{ color: 'black', fontSize: '18px', }}>
									Этот
								</MenuItem>
								<MenuItem
									value={30}
									style={{ color: 'black', fontSize: '18px', }}>
									А вот так вот
								</MenuItem>
							</Field>
						</div>
						<div className={styles.middle}>
							<div className={styles.sliders}>
								<Slider
									label='Яркость'
									name={brightness.name}
									value={brightness.value}
									onChange={brightness.onChange}
									min={0}
									max={200}
									step={1}
									color='secondary'
									style={{ width: '8rem', }}
								/>
								<Slider
									label='Контрастность'
									name={contrast.name}
									value={contrast.value}
									onChange={contrast.onChange}
									min={50}
									max={300}
									step={1}
									color='secondary'
									style={{ width: '8rem', }}
								/>
								<Slider
									label='Насыщенность'
									name={saturation.name}
									value={saturation.value}
									onChange={saturation.onChange}
									min={0}
									max={50}
									step={1}
									color='secondary'
									style={{ width: '8rem', }}
								/>
								<Slider
									label='Резкость'
									name={sharpness.name}
									value={sharpness.value}
									onChange={sharpness.onChange}
									min={0}
									max={10}
									step={1}
									color='secondary'
									style={{ width: '8rem', }}
								/>
							</div>
							<div className={styles.switchers}>
								<Checkbox
									name={offBrightFlash.name}
									checked={offBrightFlash.value}
									onChange={offBrightFlash.onChange}
									label='Отключить яркие вспышки в сценах'
									color='secondary'
									control={Android12Switch}
								/>
								<Checkbox
									name={blockingColorSpecter.name}
									checked={blockingColorSpecter.value}
									onChange={blockingColorSpecter.onChange}
									label='Блокировка спектра цветов'
									color='secondary'
									control={Android12Switch}
								/>
							</div>
						</div>
						<div className={styles.palette}>
							<Button
								variant='contained'
								color='secondary'
								ref={setRedPalette}
								onClick={paletteRedControls.toggle}
								disabled={!blockingColorSpecter.value}>
								Красный
							</Button>
							<Button
								variant='contained'
								color='secondary'
								ref={setBluePalette}
								onClick={paletteBlueControls.toggle}
								disabled={!blockingColorSpecter.value}>
								Зеленый
							</Button>
							<Button
								variant='contained'
								color='secondary'
								ref={setGreenPalette}
								onClick={paletteGreenControls.toggle}
								disabled={!blockingColorSpecter.value}>
								Синий
							</Button>
							<Popover
								open={openRedPalette}
								anchorEl={redPalette}
								onClose={paletteRedControls.toggleOff}>
								<SketchPicker
									color={redColor}
									styles={pickerStyles}
									onChange={(color) => {
										setRedColor(color.hex);
									}}
								/>
							</Popover>
							<Popover
								open={openBluePalette}
								anchorEl={bluePalette}
								onClose={paletteBlueControls.toggleOff}>
								<SketchPicker
									styles={pickerStyles}
									color={blueColor}
									onChange={(color) => {
										setBlueColor(color.hex);
									}}
								/>
							</Popover>
							<Popover
								open={openGreenPalette}
								anchorEl={greenPalette}
								onClose={paletteGreenControls.toggleOff}>
								<SketchPicker
									styles={pickerStyles}
									color={greenColor}
									onChange={(color) => {
										setGreenColor(color.hex);
									}}
								/>
							</Popover>
						</div>
					</form>
				</div>
			</Popover>
		</>
	);
};
