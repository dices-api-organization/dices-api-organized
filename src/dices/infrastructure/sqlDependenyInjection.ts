import { mySqlGameRepository } from './sql/sqlRepository/SqlRepository';
import { UseCases } from '../application/UseCases';

const gameRepository = new mySqlGameRepository();
export const useCasesMysql = new UseCases(gameRepository);
