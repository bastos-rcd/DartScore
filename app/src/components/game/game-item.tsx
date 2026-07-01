export default function GameItem(props: { label?: string }) {
	return (
		<span
			className={`rounded-xl bg-(--border) px-3 py-2 font-bold ${props.label ?? 'text-(--border)'}`}
		>
			{props.label ?? '00'}
		</span>
	)
}
