import type { Player } from '@/models/player'
import type { Game } from '@/models/game'

export interface IPlayerService {
	getPlayers(): Promise<Player[]>
	addPlayer(player: Player): Promise<string>
	removePlayer(player: Player): Promise<void>
	getLivePlayers(callback: (players: Player[]) => void): () => void
}

export interface IGameService {
	getGames(): Promise<Game[]>
	addGame(game: Game): Promise<string>
	getLiveGames(callback: (games: Game[]) => void): () => void
}
