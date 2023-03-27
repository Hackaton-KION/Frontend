import {
	FormControlLabel,
	Switch,
	IconButton,
	Popover,
	Slider,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import cn from 'classnames';
import * as React from 'react';
import { SketchPicker } from 'react-color';

import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { EyeIcon } from '@/shared/ui';
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

export interface VideoAccessabilityProps extends CommonProps {
	readonly setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const VideoAccessability: React.FC<VideoAccessabilityProps> = (
	props
) => {
	const { setFilter, } = props;

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

	const [brightness, setBrightness] = React.useState<number>(100);
	const [contrast, setContrast] = React.useState<number>(100);
	const [saturate, setSaturate] = React.useState<number>(5);

	const changeBrightness = (event: any) => {
		setBrightness(event.target.value);
		sendFilter();
	};

	const changeContrast = (event: any) => {
		setContrast(event.target.value);
		sendFilter();
	};

	const changeSaturate = (event: any) => {
		setSaturate(event.target.value);
		sendFilter();
	};

	const sendFilter = () => {
		const filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate})`;
		setFilter(filter);
	};

	return (
		<>
			<IconButton
				className={styles.button}
				onClick={openControls.toggle}
				ref={setAnchorEl}>
				<EyeIcon />
			</IconButton>
			<Popover open={open} anchorEl={anchorEl} onClose={openControls.toggleOff}>
				<div className={styles['modal-content']}>
					<div className={styles['modal-header']}>
						<FormControl fullWidth>
							<InputLabel
								id='demo-simple-select-label'
								style={{ color: 'white', fontSize: '18px', }}>
								Пресеты
							</InputLabel>
							<Select
								className={cn(styles.field, styles.fieldset)}
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								// value={age}
								label='Пресеты'
								// onChange={handleChange}
								color='secondary'
								style={{ color: 'white', fontSize: '18px', }}>
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
							</Select>
						</FormControl>
						<h2 style={{ color: 'white', }}>
							Настройки для пользователей с особыми поребностями
						</h2>
					</div>
					<div className={styles['modal-conteiner']}>
						<div className={styles['options-color']}>
							<div className={styles.sliders}>
								<div className={styles.slider}>
									<h3 style={{ color: 'white', }}>Яркость</h3>
									<Slider
										color='secondary'
										min={0}
										max={200}
										defaultValue={brightness}
										step={1}
										onChange={changeBrightness}
										style={{ width: '8rem', }}
									/>
								</div>
								<div className={styles.slider}>
									<h3 style={{ color: 'white', }}>Контрастность</h3>
									<Slider
										color='secondary'
										min={50}
										max={300}
										defaultValue={contrast}
										step={1}
										onChange={changeContrast}
										style={{ width: '8rem', }}
									/>
								</div>
								<div className={styles.slider}>
									<h3 style={{ color: 'white', }}>Насыщенность</h3>
									<Slider
										color='secondary'
										style={{ width: '8rem', }}
										min={0}
										max={10}
										defaultValue={saturate}
										step={1}
										onChange={changeSaturate}
									/>
								</div>
								<div className={styles.slider}>
									<h3 style={{ color: 'white', }}>Резкость</h3>
									<Slider color='secondary' style={{ width: '8rem', }} />
								</div>
							</div>
							<div className={styles['color-switches']}>
								<div className={styles.switch}>
									<h3 className='switch-text' style={{ color: 'white', }}>
										Отключить яркие вспышки света в сценах
									</h3>
									<FormControlLabel
										label=''
										control={
											<Android12Switch defaultChecked color='secondary' />
										}
									/>
								</div>
								<div className={styles.switch}>
									<h3 className='switch-text' style={{ color: 'white', }}>
										Блокировка спектра цветов
									</h3>
									<FormControlLabel
										label=''
										control={
											<Android12Switch defaultChecked color='secondary' />
										}
									/>
								</div>
							</div>
						</div>
						<div className={styles.palette}>
							<Button
								variant='contained'
								color='secondary'
								ref={setRedPalette}
								onClick={paletteRedControls.toggle}>
								Красный
							</Button>
							<Button
								variant='contained'
								color='secondary'
								ref={setBluePalette}
								onClick={paletteBlueControls.toggle}>
								Зеленый
							</Button>
							<Button
								variant='contained'
								color='secondary'
								ref={setGreenPalette}
								onClick={paletteGreenControls.toggle}>
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
					</div>
				</div>
			</Popover>
		</>
	);
};
