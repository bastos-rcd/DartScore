import type { Player } from '@/models/player'

export async function getPlayers(): Promise<Player[]> {
	const players = [
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

	return players
}
