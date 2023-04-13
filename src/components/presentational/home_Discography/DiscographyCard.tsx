// React
import * as React from 'react';

// Packages
import { Collapse } from 'antd';

// Project Imports
import { Card, SongListItem } from 'components';
import { audioAPI } from 'apis';
import { Song, AudioPanelCollection } from 'types';

const { Panel } = Collapse;

const RIAACertification = () => {
	const [panels, setPanels] = React.useState<AudioPanelCollection | null>(null);

	async function fetchSongs() {
		let data = await audioAPI.fetchSongs('&afterYear=2018');
		let { songs } = data;

		if (songs) {
			let parsedPanels = await Card.parsePanelsByYear(songs);
			if (parsedPanels) setPanels(parsedPanels);
		}
	}

	React.useEffect(() => {
		if (!panels) fetchSongs();
	}, [panels]);

	return (
		<Card title='DISCOGRAPHY'>
			{panels && Object.keys(panels).length > 0 && (
				<Collapse accordion>
					{Object.entries(panels)
						.sort((a, b) => (a > b ? -1 : 1))
						.map((panel: any) => {
							return (
								<Panel header={panel[0]} key={`${Math.random()}`}>
									{panel[1]
										.sort((a: Song, b: Song) => (a.album.title < b.album.title ? -1 : 1))
										.map((song: Song, i: number) => {
											return (
												<SongListItem
													key={song._id}
													song={song}
													lastItem={i === panel[1].length - 1}
													size='small'
													title={`${song.title}`}
													subtitle={`By ${song.artist}`}
												/>
											);
										})}
								</Panel>
							);
						})}
				</Collapse>
			)}
		</Card>
	);
};

export default RIAACertification;
