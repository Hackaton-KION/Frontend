/* eslint-disable max-classes-per-file */
import { FC } from 'react';

export interface CommonProps {
	className?: string;
}

export type ShakaFC<P = object> = FC<P> & {
	ShakaFactory: any;
	ShakaUIElement: any;
	ShakaUIElementName: string;
};
