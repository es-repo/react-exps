import getGameReportById, { GetGameReportById } from '../../dataAccess/gameReports/getGameReportById';
import { updateGameReport, UpdateGameReport } from '../../dataAccess/gameReports/updateGameReport';
import { GameReport } from './gameReport';
import { GameResult, Move } from './gameState';

export type SendMove = (gameReport: GameReport, move: Move) => Promise<GameReport>;

export default async function sendMove(
  getGameReportById: GetGameReportById,
  updateGameReport: UpdateGameReport,
  gameReport: GameReport,
  move: Move
): Promise<GameReport> {
  const gameReportFromServer = await getGameReportById(gameReport.id);

  gameReportFromServer.moves.push(move);

  return await updateGameReport(gameReportFromServer);
}

export const sendMoveImpl: SendMove = (gameReport: GameReport, move: Move) =>
  sendMove(getGameReportById, updateGameReport, gameReport, move);
