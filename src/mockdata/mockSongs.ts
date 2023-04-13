import { Song } from 'types';

import mockUploads from './mockAudioUploads';
import mockAlbums from './mockAlbums';

// TODO :: add boolean flag to the data that if nominated for something it
// 		   asks if the song or the album it belongs to was nominated

const songs: Song[] = [
	{
		_id: 'h9v835th925tn2365vb7b23584',
		artist: 'DJ Khaled',
		year: 2021,
		title: 'Higher',
		nominatedStatus: 'winner',
		nominatedFor: 'Rap Album of The Year',
		certified: true,
		audio: mockUploads[0],
		album: mockAlbums[0],
		useAlbumPhoto: true,
	},
	{
		_id: 'h9v835th925tn2365vb7b23584',
		artist: 'DJ Khaled',
		year: 2018,
		title: 'Higher',
		nominatedStatus: 'winner',
		nominatedFor: 'Rap Album of The Year',
		certified: true,
		audio: mockUploads[1],
		album: mockAlbums[1],
		useAlbumPhoto: true,
	},
	{
		_id: 'h9v835th925tn2365vb7b23584',
		artist: 'Meek Mill',
		year: 2020,
		title: 'Higher',
		nominatedStatus: 'NOMINATED',
		nominatedFor: 'Rap Album of The Year',
		certified: true,
		audio: mockUploads[2],
		album: mockAlbums[2],
		useAlbumPhoto: true,
	},
	{
		_id: 'h9v835th925tn2365vb7b23584',
		artist: 'H.E.R.',
		year: 2022,
		title: 'Higher',
		nominatedStatus: 'winner',
		nominatedFor: 'Rap Album of The Year',
		certified: true,
		audio: mockUploads[1],
		album: mockAlbums[3],
		useAlbumPhoto: true,
	},
] as Song[];

export { songs };
