import collectionDefinition from './collectionDefinition';
import { GameReport } from '../../model/game/gameReport';
import { DocumentData } from 'firebase/firestore';
import { GameResult, Move } from '../../model/game/gameState';
import { Piece } from '../../model/game/piece';
import { Player } from '../../model/game/player';

export default function documentDataToGameReport(documentData: DocumentData, documentId: string): GameReport {
  const player2AccountId = documentData[collectionDefinition.fields.player2AccountId] as string;
  const player2AccountEmail = documentData[collectionDefinition.fields.player2AccountEmail] as string;
  const player2Piece = documentData[collectionDefinition.fields.player2Piece] as Piece;

  const player2: Player | null =
    player2AccountId == null
      ? null
      : { accountId: player2AccountId, accountEmail: player2AccountEmail, piece: player2Piece };

  return {
    id: documentId,
    player1: {
      accountId: documentData[collectionDefinition.fields.player1AccountId] as string,
      accountEmail: documentData[collectionDefinition.fields.player1AccountEmail] as string,
      piece: documentData[collectionDefinition.fields.player1Piece] as Piece
    },
    player2: player2,
    gameSize: documentData[collectionDefinition.fields.gameSize] as number,
    moves: (documentData[collectionDefinition.fields.moves] as string[]).map(m => JSON.parse(m) as Move),
    result: JSON.parse(documentData[collectionDefinition.fields.result] as string) as GameResult | null
  };
}
