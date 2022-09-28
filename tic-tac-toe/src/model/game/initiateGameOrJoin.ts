import { addGameReport, AddGameReport } from '../../dataAccess/gameReports/addGameReport';
import { findInitiatedGameReport, FindInitiatedGameReport } from '../../dataAccess/gameReports/findInitiatedGameReport';
import { updateGameReport, UpdateGameReport } from '../../dataAccess/gameReports/updateGameReport';
import { Account } from '../accounts/account';
import { GameReport } from './gameReport';
import { alternatePiece, Piece, randomPiece } from './piece';

export type InitiateOrJoinGame = (account: Account, gameSize: number) => Promise<GameReport>;

export async function initiateOrJoinGame(
  findInitiatedGameReport: FindInitiatedGameReport,
  updateGameReport: UpdateGameReport,
  addGameReport: AddGameReport,
  account: Account,
  gameSize: number
): Promise<GameReport> {
  const gameReport = await findInitiatedGameReport(gameSize);
  if (gameReport != null) {
    if (gameReport.player1.accountId == account.id) {
      return gameReport;
    }

    const player2Piece: Piece = alternatePiece(gameReport.player1.piece);
    gameReport.player2 = { accountId: account.id, accountEmail: account.email, piece: player2Piece };
    await updateGameReport(gameReport);
    return gameReport;
  } else {
    const newGameReport: GameReport = {
      id: '',
      gameSize,
      player1: {
        accountId: account.id,
        accountEmail: account.email,
        piece: randomPiece()
      },
      player2: null,
      moves: []
    };

    const gameReport = await addGameReport(newGameReport);
    return gameReport;
  }
}

export const initiateOrJoinGameImpl: InitiateOrJoinGame = (account: Account, gameSize: number) =>
  initiateOrJoinGame(findInitiatedGameReport, updateGameReport, addGameReport, account, gameSize);
