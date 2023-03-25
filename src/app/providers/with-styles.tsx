import {
	Experimental_CssVarsProvider as CssVarsProvider,
	StyledEngineProvider,
	experimental_extendTheme as extendTheme
} from '@mui/material';
import * as React from 'react';

const theme = extendTheme({
	shape: {
		borderRadius: 10,
	},
	typography: {
		allVariants: {
			color: '#ffffff',
		},
	},
});

export const withStyles =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<StyledEngineProvider injectFirst>
					<CssVarsProvider theme={theme}>
						<Component />
					</CssVarsProvider>
				</StyledEngineProvider>
			);
		};
