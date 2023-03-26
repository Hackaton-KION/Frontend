import * as React from 'react';
import { MainLayout, VideoPlayer } from '@/shared/ui';

const Film: React.FC = () => {
	/*
  Докинуть нормальные данные, чтобы правильно рендерить группы
  */

	return (
		<MainLayout>
			<VideoPlayer />
		</MainLayout>
	);
};

export default Film;
