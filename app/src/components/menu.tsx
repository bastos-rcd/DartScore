import { Link } from 'react-router-dom'

import { ROLES } from '@/models/user'

import { authStore } from '@/store/auth.store'

const Item = (props: { href: string; icon: string }) => {
	return (
		<Link to={props.href} className="rounded-2xl bg-(--border) px-2 py-2.5">
			<i className={props.icon} style={{ color: 'var(--black)' }}></i>
		</Link>
	)
}

export default function Menu() {
	const { isAuthenticated, logout, hasRole } = authStore()

	return (
		<nav className="flex flex-row justify-evenly">
			{isAuthenticated && hasRole(ROLES.USER) && (
				<>
					<Item href="/" icon="fa-solid fa-bullseye fa-xl" />
					<Item href="/players" icon="fa-solid fa-people-group fa-xl" />
				</>
			)}

			{isAuthenticated && hasRole(ROLES.ADMIN) && (
				<Item href="/users" icon="fa-solid fa-users-gear fa-xl" />
			)}

			{isAuthenticated && (
				<>
					<Item href="/profile" icon="fa-solid fa-circle-user fa-xl" />

					<button
						onClick={() => logout()}
						className="rounded-2xl bg-(--border) px-2 py-2.5"
					>
						<i
							className="fa-solid fa-arrow-right-from-bracket fa-xl"
							style={{ color: 'var(--black)' }}
						></i>
					</button>
				</>
			)}
		</nav>
	)
}
