import * as React from 'react';
import { audioAPI } from 'apis';
import { Song } from 'types';
import { Card, Table, TableItem } from 'components';

export default function RIAACertificationsTable() {
	const [certifiedSongs, setCertifiedSongs] = React.useState<Song[]>([]);

	React.useEffect(() => {
		async function fetchCertified() {
			const data = await audioAPI.fetchSongs('&certified=true');
			if (data?.songs) setCertifiedSongs(data.songs);
		}
		fetchCertified();
	}, []);

	const columns = [
		{
			title: 'Song / Album',
			dataIndex: 'tableItem',
			key: 'tableItem',
		},
		{
			title: 'Artist',
			dataIndex: 'artist',
			key: 'artist',
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: 'Award',
			dataIndex: 'award',
			key: 'award',
		},
		{
			title: 'Year',
			dataIndex: 'year',
			key: 'year',
		},
	];

	const tableData = React.useMemo(() => {
		const seen = new Set<string>();
		const rows: any[] = [];

		certifiedSongs.forEach((song: Song) => {
			const isAlbum = song.certifiedFor?.toLowerCase() === 'album';
			const itemName = isAlbum ? song.album.title : song.title;
			const dedupeKey = `${song.artist}_${itemName}_${isAlbum ? 'album' : 'song'}`;

			if (seen.has(dedupeKey)) return;
			seen.add(dedupeKey);

			const img = song.photo?.secure_url || song.album?.photo?.secure_url || '';
			rows.push({
				key: song._id,
				item: itemName,
				artist: song.artist,
				type: isAlbum ? 'Album' : 'Song',
				award: song.certifiedAward || '',
				year: song.year,
				img,
				tableItem: <TableItem img={img} item={itemName} />,
			});
		});

		return rows;
	}, [certifiedSongs]);

	if (tableData.length === 0) return null;

	return (
		<Card title='RIAA Certifications'>
			<Table columns={columns} rows={tableData} mobileKeys={['item', 'award']} />
		</Card>
	);
}
