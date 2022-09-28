import collectionDefinition from './collectionDefinition';
import collectionRef from './collectionRef';
import { GameReport } from '../../model/game/gameReport';
import { getDocs, query, where } from 'firebase/firestore';
import documentDataToGameReport from './documentDataToGameReport';

export type FindInitiatedGameReport = (gameSize: number) => Promise<GameReport | null>;

export async function findInitiatedGameReport(gameSize: number): Promise<GameReport | null> {
  const q = query(
    collectionRef,
    where(collectionDefinition.fields.gameSize, '==', gameSize),
    where(collectionDefinition.fields.player2AccountId, '==', null)
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }

  const gameReportDocSnapshot = querySnapshot.docs[0];
  const gameReport = documentDataToGameReport(gameReportDocSnapshot.data(), gameReportDocSnapshot.id);
  return gameReport;
}
