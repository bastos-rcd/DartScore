import { authStore } from '@/store/auth'
import axios, { type InternalAxiosRequestConfig } from 'axios'

const API_URL = import.meta.env.VITE_API_URL!

const api = axios.create({
	baseURL: API_URL,
	headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = authStore.getState().token

	if (token) config.headers.Authorization = `Bearer ${token}`

	return config
})

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status === 401) {
			authStore.getState().logout()
		}
		return Promise.reject(error.response.data)
	},
)

export default api
