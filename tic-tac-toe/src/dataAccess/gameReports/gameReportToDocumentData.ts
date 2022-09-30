import { DocumentData } from 'firebase/firestore';
import collectionDefinition from './collectionDefinition';
import { GameReport } from '../../model/game/gameReport';

export default function gameReportToDocumentData(gameReport: GameReport): DocumentData {
  return {
    [collectionDefinition.fields.player1AccountId]: gameReport.player1.accountId,
    [collectionDefinition.fields.player1AccountEmail]: gameReport.player1.accountEmail,
    [collectionDefinition.fields.player1Piece]: gameReport.player1.piece,
    [collectionDefinition.fields.player2AccountId]: gameReport.player2?.accountId ?? null,
    [collectionDefinition.fields.player2AccountEmail]: gameReport.player2?.accountEmail ?? null,
    [collectionDefinition.fields.player2Piece]: gameReport.player2?.piece ?? null,
    [collectionDefinition.fields.gameSize]: gameReport.gameSize,
    [collectionDefinition.fields.moves]: gameReport.moves.map(move => JSON.stringify(move)),
    [collectionDefinition.fields.result]: JSON.stringify(gameReport.result)
  };
}
