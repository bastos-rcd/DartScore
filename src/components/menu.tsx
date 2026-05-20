import { Link } from 'react-router-dom'

const Item = (props: { href: string; icon: string }) => {
	return (
		<Link to={props.href} className="rounded-2xl bg-(--border) px-2 py-4">
			<i className={props.icon} style={{ color: 'var(--black)' }}></i>
		</Link>
	)
}

export default function Menu() {
	return (
		<nav className="flex flex-row justify-evenly">
			<Item href="/" icon="fa-solid fa-bullseye fa-2xl" />
			<Item href="/players" icon="fa-solid fa-people-group fa-2xl" />
			<Item href="/statistics" icon="fa-solid fa-chart-simple fa-2xl" />
			<Item href="/history" icon="fa-solid fa-clock-rotate-left fa-2xl" />
		</nav>
	)
}
