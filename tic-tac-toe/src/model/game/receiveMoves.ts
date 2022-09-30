import getGameReportById, { GetGameReportById } from '../../dataAccess/gameReports/getGameReportById';
import { delay } from '../../utils/promise-utils';
import { GameReport } from './gameReport';
import { Move } from './gameState';

export type ReceiveMoves = (gameReport: GameReport, onMovesReceived: (moves: Move[]) => void) => Promise<void>;

export async function receiveMoves(
  getGameReportById: GetGameReportById,
  gameReport: GameReport,
  onMovesReceived: (moves: Move[]) => void
): Promise<void> {
  let prevMoves: Move[] = [];

  const isGameOver = false;
  while (!isGameOver) {
    const gameReportFromServer = await getGameReportById(gameReport.id);

    if (gameReportFromServer.moves.length > prevMoves.length) {
      const newMoves = gameReportFromServer.moves.slice(prevMoves.length);
      if (newMoves.length > 0) {
        onMovesReceived(newMoves);
        prevMoves = gameReportFromServer.moves;
      }
    }

    if (gameReportFromServer.result != null) {
      break;
    }

    await delay(300);
  }
}

export const receiveMovesImpl = (gameReport: GameReport, onMovesReceived: (moves: Move[]) => void) =>
  receiveMoves(getGameReportById, gameReport, onMovesReceived);
