export interface NewSongInputInterface {
	artist: string;
	audio?: any;
	certified: boolean;
	certifiedFor?: 'none' | 'album' | 'song';
	existingAlbum?: string | null;
	newAlbumTitle?: string | null;
	newAlbumPhoto?: string | null;
	newAlbumArtist?: string | null;
	newAlbumYear?: string | number | null;
	nominated: boolean;
	nominatedFor?: 'none' | 'album' | 'song';
	nominatedAward?: string | null;
	nominatedStatus?: 'none' | 'nominated' | 'winner';
	photo?: string | null | File;
	title: string;
	useAlbumYear?: boolean;
	useAlbumPhoto?: boolean;
	useAlbumArtist?: boolean;
	year: number | null;
}

export interface GeneralInputInterface {
	name: string;
	placeholder?: string;
	label?: string;
	displayDependancy?: string;
	checked?: Boolean;
	onChange?: Function;
	type?: string;
}
