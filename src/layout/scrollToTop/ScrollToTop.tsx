import React from 'react';

import layoutOptions from '../layoutConfig';

interface ScrollTopProps {
	container?: string;
}

export default function ScrollTop({ container = layoutOptions.APP_CONTAINER_ID }: ScrollTopProps) {
	const toTop = () => {
		let view = document.getElementById(container);

		if (view) {
			view.scrollTo(0, 0);
		}
	};

	React.useEffect(() => {
		toTop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
}
