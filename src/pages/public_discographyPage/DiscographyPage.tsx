// ==> React
import * as React from 'react';

// ==> Project Imports
import { SongListItem, Overlay, Loader, FilterOptions } from 'components';
import { ContentCol, Footer, Spacer, ScrollToTop } from 'layout';
import { DiscographyHeader } from 'assets';
import { Song } from 'types';
import { audioAPI } from 'apis';

// Component
import Style from './discographyPage.module.scss';

const DiscographyPage = () => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [results, setResults] = React.useState<Song[]>([] as Song[]);
	const [filteredResults, setFilteredResults] = React.useState<Song[]>([] as Song[]);
	const componentMounted = React.useRef(false);

	async function fetchSongs() {
		setIsLoading(true);
		const { songs } = await audioAPI.fetchSongs();
		setResults(songs);
		return setIsLoading(false);
	}

	React.useEffect(() => {
		if (!componentMounted.current) {
			fetchSongs();
			componentMounted.current = true;
		}
	}, [componentMounted]);

	const Stat = ({ count, label }: { count: number; label: string }) => {
		return (
			<div className={Style.Stat}>
				<p>
					{count}
					<span>{label}</span>
				</p>
			</div>
		);
	};

	return (
		<div className={Style.Wrapper} style={{ position: 'relative' }}>
			<div className={Style.HeaderPic} style={{ backgroundImage: `url(${DiscographyHeader})` }}>
				<Overlay type='from-bottom' />
			</div>

			<Spacer height='50vh' maxHeight='450px' minHeight='300px' />

			<ContentCol padding='' customColumnClass={''}>
				<h2 className={Style.HeaderText}>THREE-TIME GRAMMY AWARD WINNER</h2>
			</ContentCol>

			<div className={Style.StatBarOuter}>
				<ContentCol padding='30px 0 ' customColumnClass={''}>
					<div className={Style.StatBarInner}>
						<Stat count={results.length} label={'TRACKS'} />
						<Stat count={results.filter((s: Song) => s.certified).length} label={'RIAA CERTS'} />
					</div>
				</ContentCol>
			</div>

			<ContentCol padding={''} customColumnClass={''}>
				<FilterOptions
					songs={results}
					updateResultsCallback={setFilteredResults}
					placeholder='Search songs, artist, album'
				/>
			</ContentCol>

			<ContentCol padding={''} customColumnClass={''}>
				{isLoading ? (
					<Loader includeText loadingText='Loading Discography' />
				) : filteredResults.length === 0 && !isLoading ? (
					<p style={{ width: '100%', textAlign: 'center', padding: '100px 10px' }}>No Results</p>
				) : (
					filteredResults.map((song, i) => (
						<SongListItem
							key={song._id}
							song={song}
							size='small'
							title={`${song.title}`}
							subtitle={`By ${song.artist}`}
							lastItem={i === filteredResults.length - 1}
						/>
					))
				)}
			</ContentCol>

			<Footer />

			<ScrollToTop />
		</div>
	);
};

export default DiscographyPage;
