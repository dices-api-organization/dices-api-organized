import { Player } from "../../domain/entities/Player";
import { GameRepository } from "../../domain/repositories/GameRepository";

export class MongoGameRepository implements GameRepository {
    async getPlayers(): Promise<Player[]> {
        const players = await 
    }
}