import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Menu from '@/components/menu'
import Divider from '@/components/divider'
import Home from '@/pages/home'
import Game from '@/pages/game'
import Players from '@/pages/players'
import Rank from '@/pages/rank'

export default function App() {
	return (
		<Router>
			<div className="flex h-dvh max-h-dvh flex-col-reverse gap-4 overflow-hidden p-4">
				<Menu />

				<Divider />

				<main className="flex min-h-0 flex-1 flex-col gap-4">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/game" element={<Game />} />
						<Route path="/players" element={<Players />} />
						<Route path="/rank" element={<Rank />} />
					</Routes>
				</main>
			</div>
		</Router>
	)
}
