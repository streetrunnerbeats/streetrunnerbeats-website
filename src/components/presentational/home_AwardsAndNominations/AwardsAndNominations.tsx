// React
import * as React from 'react';

// Packages
import { Collapse } from 'antd';

// Project Imports
import { Card, SongListItem } from 'components';
import { audioAPI } from 'apis';
import { Song, AudioPanelCollection } from 'types';

const { Panel } = Collapse;

const AwardsAndNominationsSection = () => {
	const [panels, setPanels] = React.useState<AudioPanelCollection | null>(null);

	async function fetchSongs() {
		let data = await audioAPI.fetchSongs('&nominated=true');
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
		panels &&
		Object.keys(panels).length > 0 && (
			<Card title='AWARDS & NOMINATIONS'>
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
													title={`${
														song.nominatedStatus === 'winner' ? `Winner` : `Nominated`
													} for ${song.nominatedAward} • ${song.nominatedFor?.toUpperCase()}`}
													subtitle={`"${song.title}" by ${song.artist}`}
												/>
											);
										})}
								</Panel>
							);
						})}
				</Collapse>
			</Card>
		)
	);
};

export default AwardsAndNominationsSection;
