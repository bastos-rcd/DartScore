export interface CheckoutDart {
	label: string
	score: number
	cost: number
}

const MAX_SUGGESTIONS = 3

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

const routeCost = (route: CheckoutDart[]) =>
	route.reduce((acc, dart) => acc + dart.cost, 0)

const bestFinish = (
	remaining: number,
	dartsLeft: number,
): CheckoutDart[] | null => {
	let best: CheckoutDart[] | null = null

	const walk = (start: number, rest: number, route: CheckoutDart[]) => {
		if (rest === 0) {
			if (
				!best ||
				route.length < best.length ||
				(route.length === best.length && routeCost(route) < routeCost(best))
			)
				best = route
			return
		}

		if (route.length === dartsLeft) return

		for (let i = start; i < DARTS.length; i++) {
			const dart = DARTS[i]

			if (dart.score > rest) continue

			if (dart.score * (dartsLeft - route.length) < rest) break

			walk(i, rest - dart.score, [...route, dart])
		}
	}

	walk(0, remaining, [])

	return best
}

export function suggestDarts(
	remaining: number,
	dartsLeft: number,
): CheckoutDart[] {
	if (remaining <= 0 || dartsLeft <= 0) return []

	const candidates = DARTS.filter((dart) => dart.score <= remaining)
		.map((dart) => {
			const rest = remaining - dart.score
			const next = rest === 0 ? [] : bestFinish(rest, dartsLeft - 1)

			return { dart, rest, next }
		})
		.filter((c) => c.next !== null)
		.sort((a, b) => {
			const darts = a.next!.length - b.next!.length
			if (darts !== 0) return darts

			const cost =
				a.dart.cost + routeCost(a.next!) - (b.dart.cost + routeCost(b.next!))
			if (cost !== 0) return cost

			return b.dart.score - a.dart.score
		})

	if (candidates.length === 0) {
		const dart = DARTS.find((d) => d.score <= remaining)!

		return [dart]
	}

	const direct = candidates.filter((c) => c.rest === 0)
	const pool = direct.some((c) => c.dart.cost < 3) ? direct : candidates

	return pool.slice(0, MAX_SUGGESTIONS).map((c) => c.dart)
}
