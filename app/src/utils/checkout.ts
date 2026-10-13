export interface CheckoutDart {
	label: string
	score: number
	cost: number
}

// Nombre maximum de chemins proposés
const MAX_ROUTES = 3

// Toutes les fléchettes possibles, de la plus forte à la plus faible.
// "cost" = difficulté : à score égal, on préfère un simple à un double, un double à un triple.
const DARTS: CheckoutDart[] = (() => {
	const list: CheckoutDart[] = []

	for (let n = 1; n <= 20; n++) {
		list.push({ label: `${n}`, score: n, cost: 1 })
		list.push({ label: `D${n}`, score: n * 2, cost: 2 })
		list.push({ label: `T${n}`, score: n * 3, cost: 3 })
	}

	list.push({ label: '25', score: 25, cost: 2 })
	list.push({ label: 'D25', score: 50, cost: 3 })

	return list.sort((a, b) => b.score - a.score || a.cost - b.cost)
})()

const MAX_SCORE = DARTS[0].score

const routeCost = (route: CheckoutDart[]) =>
	route.reduce((acc, dart) => acc + dart.cost, 0)

const distinctTargets = (route: CheckoutDart[]) =>
	new Set(route.map((dart) => dart.label)).size

/**
 * Renvoie les meilleures façons de finir, chacune sous forme de séquence complète
 * (ex : 40 → [D20], [20 20], ...).
 * Tri : moins de fléchettes, puis cibles répétées (20 20 plutôt que 19 1),
 * puis cibles les plus faciles, puis la plus forte fléchette en premier.
 * Renvoie [] si on ne peut pas finir avec les fléchettes restantes.
 */
export function suggestDarts(
	remaining: number,
	dartsLeft: number,
): CheckoutDart[][] {
	if (remaining <= 0 || dartsLeft <= 0) return []
	if (remaining > MAX_SCORE * dartsLeft) return []

	const routes: CheckoutDart[][] = []

	// Les fléchettes sont parcourues dans l'ordre décroissant (start),
	// ce qui évite les doublons du type "20 D10" / "D10 20".
	const walk = (start: number, rest: number, route: CheckoutDart[]) => {
		if (rest === 0) {
			routes.push(route)
			return
		}

		if (route.length === dartsLeft) return

		const dartsRemaining = dartsLeft - route.length

		for (let i = start; i < DARTS.length; i++) {
			const dart = DARTS[i]

			if (dart.score > rest) continue

			// Les fléchettes suivantes sont plus faibles : impossible d'atteindre "rest"
			if (dart.score * dartsRemaining < rest) break

			walk(i, rest - dart.score, [...route, dart])
		}
	}

	walk(0, remaining, [])

	return routes
		.sort(
			(a, b) =>
				a.length - b.length ||
				distinctTargets(a) - distinctTargets(b) ||
				routeCost(a) - routeCost(b) ||
				b[0].score - a[0].score,
		)
		.slice(0, MAX_ROUTES)
}
