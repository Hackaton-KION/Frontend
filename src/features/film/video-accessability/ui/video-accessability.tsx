import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	FormControlLabel,
	Switch,
	IconButton,
	Popover
} from '@mui/material';
import { styled } from '@mui/material/styles';
// import cn from 'classnames';
import * as React from 'react';
import { PhotoshopPicker } from 'react-color';

import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { EyeIcon } from '@/shared/ui';
import styles from './video-accessability.module.css';

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
	console.log(className);

	const [color, setColor] = React.useState('');
	const [open, openControls] = useToggle();
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

	return (
		<>
			<IconButton
				className={styles.button}
				onClick={openControls.toggle}
				ref={setAnchorEl}>
				<EyeIcon />
			</IconButton>
			<Popover open={open} anchorEl={anchorEl} onClose={openControls.toggleOff}>
				<div className='options-color'>
					<div className='color-switches'>
						<div className='switch'>
							<h3 className='switch-text'>
								Отключить яркие вспышки света в сценах
							</h3>
							<FormControlLabel
								label=''
								control={<Android12Switch defaultChecked />}
							/>
						</div>
						<div className='switch'>
							<h3 className='switch-text'>Блокировка спектра цветов</h3>
							<FormControlLabel
								label=''
								control={<Android12Switch defaultChecked />}
							/>
						</div>
					</div>
					<div className='color-options'>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls='panel1a-content'
								id='panel1a-header'>
								<Typography>Красный</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<PhotoshopPicker
									color={color}
									onChange={(e) => {
										setColor(e.hex);
									}}
								/>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls='panel1a-content'
								id='panel1a-header'>
								<Typography>Синий</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<PhotoshopPicker
									color={color}
									onChange={(e) => {
										setColor(e.hex);
									}}
								/>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls='panel1a-content'
								id='panel1a-header'>
								<Typography>Зеленый</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<PhotoshopPicker
									color={color}
									onChange={(e) => {
										setColor(e.hex);
									}}
								/>
							</AccordionDetails>
						</Accordion>
					</div>
				</div>
				<div className='sliders'>
					<div className='slider'>
						<h3>Яркость</h3>
						<input type='range' min={0} max={100} />
					</div>
					<div className='slider'>
						<h3>Контрастность</h3>
						<input type='range' min={0} max={100} />
					</div>
					<div className='slider'>
						<h3>Насыщенность</h3>
						<input type='range' min={0} max={100} />
					</div>
					<div className='slider'>
						ShakaUIElementName
						<h3>Резкость</h3>
						<input type='range' min={0} max={100} />
					</div>
				</div>
			</Popover>
		</>
	);

	// return (
	// 	<div className={cn('modal', className)}>
	// 		<div className='modal-content'>
	// 			<div className='modal-header'>
	// 				{/* <select name='' id=''>
	// 					<option value=''>Я в Дубае</option>
	// 					<option value=''>Я в Дубае</option>
	// 					<option value=''>Я в Дубае</option>
	// 				</select> */}
	// 				<div className='header-text'>
	// 					<h3>Настройки для пользователей с особыми поребностями</h3>
	// 				</div>
	// 			</div>
	// 			<div className='modal-conteiner'>
	// 				<div className='options-color'>
	// 					<div className='color-switches'>
	// 						<div className='switch'>
	// 							<h3 className='switch-text'>
	// 								Отключить яркие вспышки света в сценах
	// 							</h3>
	// 							<FormControlLabel
	// 								label=''
	// 								control={<Android12Switch defaultChecked />}
	// 							/>
	// 						</div>
	// 						<div className='switch'>
	// 							<h3 className='switch-text'>Блокировка спектра цветов</h3>
	// 							<FormControlLabel
	// 								label=''
	// 								control={<Android12Switch defaultChecked />}
	// 							/>
	// 						</div>
	// 					</div>
	// 					<div className='color-options'>
	// 						<Accordion>
	// 							<AccordionSummary
	// 								expandIcon={<ExpandMoreIcon />}
	// 								aria-controls='panel1a-content'
	// 								id='panel1a-header'>
	// 								<Typography>Красный</Typography>
	// 							</AccordionSummary>
	// 							<AccordionDetails>
	// 								<PhotoshopPicker
	// 									color={color}
	// 									onChange={(e) => {
	// 										setColor(e.hex);
	// 									}}
	// 								/>
	// 							</AccordionDetails>
	// 						</Accordion>
	// 						<Accordion>
	// 							<AccordionSummary
	// 								expandIcon={<ExpandMoreIcon />}
	// 								aria-controls='panel1a-content'
	// 								id='panel1a-header'>
	// 								<Typography>Синий</Typography>
	// 							</AccordionSummary>
	// 							<AccordionDetails>
	// 								<PhotoshopPicker
	// 									color={color}
	// 									onChange={(e) => {
	// 										setColor(e.hex);
	// 									}}
	// 								/>
	// 							</AccordionDetails>
	// 						</Accordion>
	// 						<Accordion>
	// 							<AccordionSummary
	// 								expandIcon={<ExpandMoreIcon />}
	// 								aria-controls='panel1a-content'
	// 								id='panel1a-header'>
	// 								<Typography>Зеленый</Typography>
	// 							</AccordionSummary>
	// 							<AccordionDetails>
	// 								<PhotoshopPicker
	// 									color={color}
	// 									onChange={(e) => {
	// 										setColor(e.hex);
	// 									}}
	// 								/>
	// 							</AccordionDetails>
	// 						</Accordion>
	// 					</div>
	// 				</div>
	// 				<div className='sliders'>
	// 					<div className='slider'>
	// 						<h3>Яркость</h3>
	// 						<input type='range' min={0} max={100} />
	// 					</div>
	// 					<div className='slider'>
	// 						<h3>Контрастность</h3>
	// 						<input type='range' min={0} max={100} />
	// 					</div>
	// 					<div className='slider'>
	// 						<h3>Насыщенность</h3>
	// 						<input type='range' min={0} max={100} />
	// 					</div>
	// 					<div className='slider'>
	// 						ShakaUIElementName
	// 						<h3>Резкость</h3>
	// 						<input type='range' min={0} max={100} />
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
};
