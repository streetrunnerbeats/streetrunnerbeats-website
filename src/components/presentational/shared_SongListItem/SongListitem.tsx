// React
import * as React from 'react';

// Packages
import { Image, Typography } from 'antd';

// Project Imports
import { IconifyIcon, ICON_PLAY_BUTTON } from 'components';
import { AudioPlayerContext } from 'contexts';

import { formatSeconds, formatFileSize, selectSongPhoto } from 'util/index';
import { Song } from 'types';
import SongItemMenu from './SongItemMenu';

// Component Imports
import Style from './songListItem.module.scss';

const { Paragraph } = Typography;

interface SongListItemProps {
	title: string;
	subtitle: string;
	lastItem?: boolean;
	showFileInfo?: boolean;
	showMenu?: boolean;
	size?: 'default' | 'small';
	song?: Song;
}

/**
 *---------------------------
 *-->> SongListItem
 *---------------------------
 * A component that renders a list item with song meta data and includes a play button
 * that will load the song into the website's player.
 *
 * @param {Song} song - (required) - a song document from the database
 * @param {string} title (required) - Main text title for the song list item
 * @param {string} subtitle (required) - Secondary text for the song list item
 *
 * @param {'default' | 'small'} size (optional) - This should be removed, the default has been changed to be smaller there isn't much difference
 * @param {boolean} showMenu (optional) - default: false - If true, menu with admin options will show. Menu actions will not work if admin is not logged in.
 * @param {boolean} showFileInfo (optional) - default: false - If true, will show the file size and song length in list item
 * @param {boolean} lastItem (optional) - default: false - If true, will leave out bottom border to end list
 *
 * @returns A list item for the song document
 */
const SongListItem = ({
	lastItem = false,
	showMenu = false,
	showFileInfo = false,
	size = 'default',
	song,
	subtitle,
	title,
}: SongListItemProps) => {
	const [length, setLength] = React.useState<string | null>(null);
	const { handlePlaySong } = React.useContext(AudioPlayerContext);

	//==> Get Meta Data for files in admin views
	React.useEffect(() => {
		if (!length && song && showFileInfo) {
			let au = document.createElement('audio');

			au.src = song.audio.secure_url;
			au.addEventListener('loadedmetadata', function () {
				setLength(formatSeconds(au.duration));
			});
		}
	}, [length, song, showFileInfo]);

	/**
	 * TODO :: Need to show user that song is being deleted while waiting for server
	 * TODO :: Protect from user closing modal
	 */

	return (
		song && (
			<div className={Style.Wrapper} data-size={size} data-is-last-item={lastItem ? 1 : 0}>
				{showMenu && <SongItemMenu song={song} />}

				<Image className={Style.Photo} src={selectSongPhoto(song)} alt='album art' />

				<div className={Style.InfoWrapper} data-menu-showing={showMenu ? 1 : 0}>
					<div className={Style.TitleInfo}>
						<Paragraph ellipsis className={Style.Title}>
							{title}
						</Paragraph>
						<Paragraph ellipsis className={Style.SubTitle}>
							{subtitle}
						</Paragraph>
					</div>

					{song.audio.size && length && showFileInfo && (
						<div className={Style.FileInfo}>
							<p className={Style.Duration}>{length}</p>
							<p className={Style.Size}>{formatFileSize(song.audio.size)}</p>
						</div>
					)}
				</div>

				<div className={Style.PlayWrapper} onClick={() => handlePlaySong(song)}>
					<IconifyIcon icon={ICON_PLAY_BUTTON} size='sm' />
				</div>
			</div>
		)
	);
};

export default SongListItem;
