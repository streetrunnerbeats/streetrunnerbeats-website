import React from 'react';
import { Dropdown } from 'antd';

import { Input, Button } from 'components';
import { Song } from 'types';

import Style from './filterOptions.module.scss';

interface SearchInputProps {
	songs: Song[];
	placeholder?: string;
	updateResultsCallback: (songs: Song[]) => void;
}

enum SortOptions {
	ArtistAsc = 'Artist (↑)',
	ArtistDec = 'Artist (↓)',
	SongAsc = 'Song (↑)',
	SongDec = 'Song (↓)',
	YearAsc = 'Year (↑)',
	YearDec = 'Year (↓)',
	AlbumAsc = 'Album (↑)',
	AlbumDec = 'Album (↓)',
}

export function FilterOptions(props: SearchInputProps): JSX.Element {
	const { placeholder = 'Search', updateResultsCallback, songs } = props;
	const [filteredResults, setFilteredResults] = React.useState<Song[]>([] as Song[]);

	// ---------------------------------------------
	//   SORTING BY DATE, YEAR, ARTIST, SONG TITLE
	// ---------------------------------------------
	const [sortBy, setSortBy] = React.useState(SortOptions.YearDec);
	const Label = ({ label }: { label: SortOptions }) => {
		return (
			<div onClick={() => setSortBy(label)}>
				<p>{label}</p>
			</div>
		);
	};
	const sortOptions = [
		{ label: <Label label={SortOptions.ArtistAsc} />, key: '0' },
		{ label: <Label label={SortOptions.ArtistDec} />, key: '1' },
		{ label: <Label label={SortOptions.AlbumAsc} />, key: '2' },
		{ label: <Label label={SortOptions.AlbumDec} />, key: '3' },
		{ label: <Label label={SortOptions.YearAsc} />, key: '4' },
		{ label: <Label label={SortOptions.YearDec} />, key: '5' },
		{ label: <Label label={SortOptions.SongAsc} />, key: '6' },
		{ label: <Label label={SortOptions.SongDec} />, key: '7' },
	];

	const sortSongs = React.useCallback(
		(songs: Song[]) => {
			const sortedSongs = songs.sort((a, b) => {
				switch (sortBy) {
					case SortOptions.YearAsc:
						return a.album.year < b.album.year ? -1 : 1;
					case SortOptions.YearDec:
						return a.album.year < b.album.year ? 1 : -1;
					case SortOptions.ArtistAsc:
						return a.artist < b.artist ? -1 : 1;
					case SortOptions.ArtistDec:
						return a.artist < b.artist ? 1 : -1;
					case SortOptions.SongAsc:
						return a.title < b.title ? -1 : 1;
					case SortOptions.SongDec:
						return a.title < b.title ? 1 : -1;
					case SortOptions.AlbumAsc:
						return a.album.title < b.album.title ? -1 : 1;
					default:
						return a.album.title < b.album.title ? 1 : -1;
				}
			});

			console.log({ sortedSongs });
			return updateResultsCallback([...sortedSongs]);
		},
		[sortBy, updateResultsCallback]
	);

	// ---------------------
	// 	  SEARCH INPUT
	// ---------------------
	function handleOnSearch(event: React.ChangeEvent<HTMLInputElement>) {
		const val = event.target.value.toLowerCase();
		let newResults = songs.filter(
			(song) =>
				song.artist.toLowerCase().includes(val) ||
				song.album.title.toLowerCase().includes(val) ||
				song.title.toLowerCase().includes(val)
		);
		return setFilteredResults(newResults);
	}

	// -------------------
	// 	  SIDE EFFECTS
	// -------------------
	React.useEffect(() => {
		sortSongs(filteredResults);
	}, [filteredResults, sortBy, sortSongs]);

	React.useEffect(() => {
		setFilteredResults(songs);
	}, [songs]);

	React.useEffect(() => {
		updateResultsCallback(filteredResults);
	}, [filteredResults, updateResultsCallback]);

	return (
		<div className={Style.Wrapper}>
			<Dropdown
				className={Style.Input}
				menu={{
					items: sortOptions,
					selectable: true,
					defaultSelectedKeys: ['5'],
				}}>
				<Button
					type='primary'
					text={`Sorted by: ${sortBy}`}
					style={{ backgroundColor: Style.color_themePrimary, borderColor: Style.color_themePrimary }}
				/>
			</Dropdown>
			<Input placeholder={placeholder} onChange={handleOnSearch} />
		</div>
	);
}
