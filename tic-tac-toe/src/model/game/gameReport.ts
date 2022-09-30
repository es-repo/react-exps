import { Identible } from '../identible';
import { GameResult, Move } from './gameState';
import { Player } from './player';

export interface GameReport extends Identible {
  player1: Player;
  player2: Player | null;
  gameSize: number;
  moves: Move[];
  result: GameResult | null;
}
