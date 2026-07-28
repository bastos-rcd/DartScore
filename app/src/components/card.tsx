export default function Card(props: { title?: string; content?: string }) {
	return (
		<div className="flex flex-col gap-2 rounded-xl border border-(--border) bg-(--white) p-4 text-center">
			{props.title && <p className="font-bold">{props.title}</p>}
			{props.content && <p className="italic opacity-75">{props.content}</p>}
		</div>
	)
}
