import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ROLES } from '@/models/user'

import { authStore } from '@/store/auth.store'
import useAuthInit from '@/hooks/useAuthInit'

import Menu from '@/components/menu'
import Divider from '@/components/divider'
import ProtectedRoute from '@/components/protected-route'

import Home from '@/pages/home'
import Game from '@/pages/game'
import Players from '@/pages/players'
import Rank from '@/pages/rank'
import History from '@/pages/history'

import Users from '@/pages/users'

import Login from '@/pages/login'
import Profile from '@/pages/profile'

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
			<div className="flex h-dvh max-h-dvh w-full flex-col-reverse gap-4 self-center overflow-hidden p-4 sm:w-1/2 lg:w-1/3 xl:w-1/4">
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
							<Route path="/game" element={<Game />} />
							<Route path="/players" element={<Players />} />
							<Route path="/rank" element={<Rank />} />
							<Route path="/history" element={<History />} />
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
