import getGameReportById, { GetGameReportById } from '../../dataAccess/gameReports/getGameReportById';
import { updateGameReport, UpdateGameReport } from '../../dataAccess/gameReports/updateGameReport';
import { delay } from '../../utils/promise-utils';
import { GameReport } from './gameReport';
import { GameResult } from './gameState';

export type SendResult = (gameReport: GameReport, gameResult: GameResult) => Promise<GameReport>;

export async function sendResult(
  getGameReportById: GetGameReportById,
  updateGameReport: UpdateGameReport,
  gameReport: GameReport,
  gameResult: GameResult
): Promise<GameReport> {
  await delay(300);

  const gameReportFromServer = await getGameReportById(gameReport.id);

  gameReportFromServer.result = gameResult;

  return await updateGameReport(gameReportFromServer);
}

export const sendResultImpl = (gameReport: GameReport, gameResult: GameResult) =>
  sendResult(getGameReportById, updateGameReport, gameReport, gameResult);
