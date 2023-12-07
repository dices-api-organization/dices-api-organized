import { MongoGameRepository } from './mongoDB/mongoRepository/MongoRepository';
import { UseCases } from '../application/UseCases';

const gameRepository = new MongoGameRepository();
export const useCases = new UseCases(gameRepository);
