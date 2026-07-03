export default function Card(props: { title: string; content: string }) {
	return (
		<div className="flex flex-col gap-2 rounded-xl border border-(--border) bg-(--white) p-4 text-center">
			<p className="font-bold">{props.title}</p>
			<p className="italic opacity-75">{props.content}</p>
		</div>
	)
}
