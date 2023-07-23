import Style from './tableItem.module.scss';

interface ItemProps {
	item: string;
	img: string;
}

export default function Item(props: ItemProps) {
	const { item, img } = props;
	return (
		<div className={Style.Wrapper}>
			<img src={img} alt='' />
			<p>{item}</p>
		</div>
	);
}
