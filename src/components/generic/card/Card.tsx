// Project Imports
import { Song } from 'types';
import { Logo512 } from 'assets';
/**
 * A component that presents data with a title and logo or graphic behind title
 */

import Style from './card.module.scss';

interface CardProps {
	title: string;
	children?: JSX.Element | JSX.Element[];
}

const Card = ({ title, children }: CardProps) => {
	return (
		<div className={Style.SegmentWrapper}>
			<div className={Style.TitleWrapper}>
				<img src={Logo512} alt='streetrunner logo' />
				<h1>{title}</h1>
			</div>
			{children}
		</div>
	);
};

Card.parsePanelsByYear = async (songs: Song[]) => {
	if (songs) {
		let parsedPanels: any = {};
		await songs.map((song: Song) => {
			if (!Object.keys(parsedPanels).includes(`${song.year}`)) {
				parsedPanels[`${song.year}`] = [song];
			} else {
				parsedPanels[`${song.year}`].push(song);
			}
			return null;
		});

		return parsedPanels;
	} else return null;
};

export default Card;
