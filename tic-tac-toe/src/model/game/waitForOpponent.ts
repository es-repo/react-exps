import getGameReportById, { GetGameReportById } from '../../dataAccess/gameReports/getGameReportById';
import { delay } from '../../utils/promise-utils';
import { GameReport } from './gameReport';

export type WaitForOpponent = (gameReport: GameReport) => Promise<GameReport>;

export default async function waitForOpponent(
  getGameReportById: GetGameReportById,
  gameReport: GameReport
): Promise<GameReport> {
  for (;;) {
    const freshGameReport = await getGameReportById(gameReport.id);
    if (freshGameReport.player2 != null) {
      return freshGameReport;
    }

    await delay(500);
  }
}

export const waitForOpponentImpl: WaitForOpponent = (gameReport: GameReport) =>
  waitForOpponent(getGameReportById, gameReport);
