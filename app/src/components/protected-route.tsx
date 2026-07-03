import { Navigate, Outlet, useLocation } from 'react-router-dom'

import type { Role } from '@/models/user'

import { authStore } from '@/store/auth.store'

export default function ProtectedRoute({
	allowedRoles,
}: {
	allowedRoles?: Role[]
}) {
	const { isAuthenticated, user } = authStore()

	const location = useLocation()

	if (!isAuthenticated)
		return <Navigate to="/login" state={{ from: location }} replace />

	if (allowedRoles && (!user || !allowedRoles.includes(user.role)))
		return <Navigate to="/" replace />

	return <Outlet />
}
