import { useMemo } from 'react';
import { Table as AntDTable, Collapse } from 'antd';
import Style from './table.module.scss';
import './tableOverrides.scss';

interface TableProps {
	columns: any;
	rows: any;
	mobileKeys: [string, string | null];
}

export default function Table(props: TableProps) {
	const { columns, rows, mobileKeys } = props;

	// Convert row data into an array of object that can be used as Panels in Collapse
	const mobileCollapseData = useMemo(() => {
		// These let us know what two values from the object should be in the collapse header
		const [leftKey, rightKey] = [mobileKeys[0], mobileKeys[1]];

		// return the data that can be mapped as Panels in Collapse
		return rows.map((row: any, i: number) => {
			// Uses those left and right keys to setup the collapse header
			const [titleLeft, titleRight] = [
				leftKey in row ? row[leftKey] : '',
				rightKey && rightKey in row ? row[rightKey] : '',
			];

			// Puts those left and right values inside of a label styled to align both items left and right
			const label = (
				<div className={Style.Label}>
					<div className={Style.LabelLeft}>
						<div className={Style.LabelImg}>
							{row.img && row.img !== '' && <img src={row.img} alt={`${titleLeft}_${titleRight}`} />}
						</div>
						<p style={{ margin: '0 auto 0 0' }}>{titleLeft}</p>
					</div>
					<p style={{ margin: '0' }}>{titleRight}</p>
				</div>
			);

			// Converts our object into an array and alos filters out the keys that were used for the label
			const childrenData = Object.entries(row).filter(
				(row) => !mobileKeys.includes(row[0]) && row[0] !== 'tableItem' && row[0] !== 'img'
			);

			// Puts this remaining data into a list that can be inserted as children for the collapse item
			const children = (
				<ul className={Style.ItemList}>
					{childrenData.map((item) => (
						<li>
							<strong>{item[0].toUpperCase()}:</strong> {item[1] as string}
						</li>
					))}
				</ul>
			);

			// Put together the panel data
			const collapseItem = {
				key: `${i}_${titleLeft}`,
				label,
				children,
			};
			return collapseItem;
		});
	}, [mobileKeys, rows]);

	return (
		<>
			<AntDTable className={Style.Desktop} dataSource={rows} columns={columns} pagination={false} />
			{/* Table turns into collapsing accordion panels on Mobile */}
			<Collapse className={Style.Mobile}>
				{mobileCollapseData.map((item: any) => (
					<Collapse.Panel key={item.key} header={item.label}>
						{item.children}
					</Collapse.Panel>
				))}
			</Collapse>
		</>
	);
}
