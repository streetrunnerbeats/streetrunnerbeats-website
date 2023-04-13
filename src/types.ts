export type Photo = {
	_id: string;
	public_id: string;
	tags: string[];
	width: Number;
	height: Number;
	format: string;
	bytes: Number;
	url: string;
	secure_url: string;
	fileName: string;
	folder: string;
	lastUpdated: string;
	createdAt: string;
};

export type Album = {
	year: number;
	photo?: Photo;
	// required
	_id: string;
	title: string;
	artist: string;
	songs?: Song[];
	lastUpdated: string;
	createdAt: string;
};

export type AudioUpload = {
	_id: string;
	songId: string;
	size: number;
	duration: number;
	secure_url: string;
	lastUpdated: string;
	createdAt: string;
};

export type Song = {
	album: Album;
	photo?: Photo;
	_id: string;
	audio: AudioUpload;
	title: string;
	artist: string;
	year: number;
	//
	useAlbumPhoto: boolean;

	nominatedStatus: 'winner' | 'nominated' | 'none'; // default 'none'
	nominatedForLabel?: string;
	nominated: boolean;
	nominatedAward: string;
	nominatedFor?: 'Song' | 'Album' | string;

	certified: boolean; // default false
	certifiedFor?: 'Song' | 'album';
	//
	lastUpdated: string;
	createdAt: string;
};

export interface AudioPanelCollection {
	[x: string]: Song[];
}

export enum PlayerStatuses {
	STOPPED = 'stopped',
	PLAYING = 'playing',
	PAUSED = 'paused',
	LOADING = 'loading',
	ERROR = 'error',
}
