import { Album, Song } from 'types';
import mockPhotos from './mockPhotos';

const mockAlbums: Album[] = [
	{
		_id: 'cnq3865tnr786v59rg4',
		year: 2016,
		photo: mockPhotos[0],
		title: 'Khaled Khaled',
		artist: 'DJ Khaled',
		songs: [] as Song[],
		lastUpdated: '2022-11-26T01:23:17.681Z',
		createdAt: '2022-11-26T01:23:17.681Z',
	},
	{
		_id: 'wvneh5tvbw6tvb9wvweqn45',
		year: 2016,
		photo: mockPhotos[1],
		title: 'Father of Asahd',
		artist: 'DJ Khaled',
		songs: [] as Song[],
		lastUpdated: '2022-11-26T01:23:17.681Z',
		createdAt: '2022-11-26T01:23:17.681Z',
	},
	{
		_id: 'vh893ytwbvrtew893vbgt27',
		year: 2016,
		photo: mockPhotos[2],
		title: 'Championships',
		songs: [] as Song[],
		artist: 'Meek Mill',
		lastUpdated: '2022-11-26T01:23:17.681Z',
		createdAt: '2022-11-26T01:23:17.681Z',
	},
	{
		_id: 'bnv9qortnq846vm394623',
		year: 2016,
		photo: mockPhotos[3],
		artist: 'H.E.R',
		title: 'Back of My Mind',
		songs: [] as Song[],
		lastUpdated: '2022-11-26T01:23:17.681Z',
		createdAt: '2022-11-26T01:23:17.681Z',
	},
];

export default mockAlbums;
