import Style from './modal.module.scss';

import layoutConfig from 'layout/layoutConfig';

interface ModalProps {
	isOpen: boolean;
	children?: JSX.Element | JSX.Element[];
}

const Modal = ({ isOpen, children }: ModalProps) => {
	const modal = `<div id='sr-modal' className={Style.Container}>
			<div className={${Style.WrapperOuter}}>
				<div className={{Style.WrapperInner}}>${children}</div>
			</div>
		</div>`;

	const openModal = () => {
		const app = document.getElementById(layoutConfig.APP_CONTAINER_ID);
		let modalEl = document.getElementById('sr-modal');
		if (app && !modalEl) {
			app.insertAdjacentHTML('afterbegin', modal);
		}
	};

	return null;
};

export default Modal;
