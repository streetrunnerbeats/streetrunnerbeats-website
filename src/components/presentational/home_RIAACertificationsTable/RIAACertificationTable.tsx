import { riaaCerts } from 'data';
import { Card, Table, TableItem } from 'components';

export default function RIAACertificationsTable() {
	/** 
    Information about the columns. This data must match the keys of the data being 
    managed from the import file. This is not used in the dropdowns that appear on mobile
     */
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

	const tableData = riaaCerts.map((item) => {
		return {
			...item,
			tableItem: <TableItem img={item.img} item={item.item} />,
		};
	});

	return (
		<Card title='RIAA Certifications'>
			<Table columns={columns} rows={tableData} mobileKeys={['item', 'award']} />
		</Card>
	);
}
