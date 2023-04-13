import { Song } from 'types';

export const selectSongPhoto = (song: Song) =>
	song.useAlbumPhoto && song.album.photo ? song.album.photo.secure_url : song.photo ? song.photo.secure_url : '';
