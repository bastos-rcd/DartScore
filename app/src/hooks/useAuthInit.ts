import { useEffect, useState } from 'react'

import { authStore } from '@/store/auth'

export default function useAuthInit(): boolean {
	const [initialized, setInitialized] = useState<boolean>(false)

	const token = authStore((s) => s.token)
	const me = authStore((s) => s.me)

	useEffect(() => {
		const init = async () => {
			if (token) await me()
			setInitialized(true)
		}
		init()
	}, [token])

	return initialized
}
