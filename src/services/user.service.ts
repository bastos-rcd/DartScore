import type { User } from '@/models/user'

export async function getUsers(): Promise<User[]> {
	const users = [
		{
			id: '1',
			name: 'Bastien',
		},
		{
			id: '2',
			name: 'Marie-Amélie',
		},
		{
			id: '3',
			name: 'Florian',
		},
		{
			id: '4',
			name: 'Léa',
		},
		{
			id: '5',
			name: 'Pierre-Henri',
		},
	]

	return users
}
