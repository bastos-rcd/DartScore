import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Menu from '@/components/menu'
import Home from './pages/home'

export default function App() {
	return (
		<Router>
			<div className="flex h-dvh max-h-dvh flex-col-reverse gap-4 overflow-hidden p-4">
				<Menu />

				<hr className="h-0.5 border-0 bg-(--border)" />

				<main className="flex-1">
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</main>
			</div>
		</Router>
	)
}
