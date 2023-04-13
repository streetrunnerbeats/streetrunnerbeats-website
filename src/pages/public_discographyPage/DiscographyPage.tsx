// ==> React
import * as React from 'react';

// ==> Project Imports
import { SongListItem, Overlay, Loader } from 'components';
import { ContentCol, Footer, Spacer, ScrollToTop } from 'layout';
import { DiscographyHeader } from 'assets';
import { Song } from 'types';
import { audioAPI } from 'apis';

// Component
import Style from './discographyPage.module.scss';

const DiscographyPage = () => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [initalLoaded, setInitialLoaded] = React.useState<boolean>(false);

	const [songs, setSongs] = React.useState<Song[]>([] as Song[]);

	async function fetchSongs() {
		setIsLoading(true);
		let { songs } = await audioAPI.fetchSongs();
		if (songs) await setSongs(songs);

		return setIsLoading(false);
	}

	React.useEffect(() => {
		if (!initalLoaded) {
			fetchSongs();
			setInitialLoaded(true);
		}
	}, [initalLoaded, songs]);

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

			<ContentCol padding=''>
				<h2 className={Style.HeaderText}>THREE-TIME GRAMMY AWARD WINNER</h2>
			</ContentCol>

			<div className={Style.StatBarOuter}>
				<ContentCol padding='30px 0 '>
					<div className={Style.StatBarInner}>
						<Stat count={songs.length} label={'TRACKS'} />
						<Stat count={songs.filter((s: Song) => s.certified).length} label={'RIAA CERTS'} />
					</div>
				</ContentCol>
			</div>

			<ContentCol>
				{isLoading ? (
					<Loader includeText loadingText='Loading Discography' />
				) : (
					songs
						.sort((a, b) => (a.album.title < b.album.title ? -1 : 1))
						.map((song, i) => (
							<SongListItem
								key={song._id}
								song={song}
								size='small'
								title={`${song.title}`}
								subtitle={`By ${song.artist}`}
								lastItem={i === songs.length - 1}
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
