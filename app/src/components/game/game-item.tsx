export default function GameItem(props: { label?: string }) {
	return (
		<span className="h-10 w-10 content-center rounded-xl bg-(--border)/80 text-center font-bold">
			{props.label}
		</span>
	)
}
