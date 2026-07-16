import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ROLES } from '@/models/user'

import { authStore } from '@/store/auth.store'
import useAuthInit from '@/hooks/useAuthInit'

import Menu from '@/components/menu'
import Divider from '@/components/divider'
import ProtectedRoute from '@/components/protected-route'

import Login from '@/pages/login'
import Profile from '@/pages/profile'

import Home from '@/pages/home'
import Players from '@/pages/players'
import Game from '@/pages/game'

import Users from '@/pages/users'

export default function App() {
	const { isAuthenticated } = authStore()

	const initialized = useAuthInit()

	if (!initialized)
		return (
			<div className="flex h-dvh items-center justify-center">
				Chargement...
			</div>
		)

	return (
		<Router>
			<div className="flex h-dvh max-h-dvh flex-col-reverse gap-4 overflow-hidden p-4">
				{isAuthenticated && (
					<>
						<Menu />
						<Divider />
					</>
				)}

				<main className="flex min-h-0 flex-1 flex-col gap-4">
					<Routes>
						<Route path="/login" element={<Login />} />

						<Route element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}>
							<Route path="/" element={<Home />} />
							<Route path="/players" element={<Players />} />
							<Route path="/game" element={<Game />} />
						</Route>

						<Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
							<Route path="/users" element={<Users />} />
						</Route>

						<Route
							element={
								<ProtectedRoute allowedRoles={[ROLES.USER, ROLES.ADMIN]} />
							}
						>
							<Route path="/profile" element={<Profile />} />
						</Route>
					</Routes>
				</main>
			</div>
		</Router>
	)
}
