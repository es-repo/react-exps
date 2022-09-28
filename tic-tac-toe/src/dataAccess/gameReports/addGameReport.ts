import { addDoc } from 'firebase/firestore';
import collectionRef from './collectionRef';
import { GameReport } from '../../model/game/gameReport';
import gameReportToDocumentData from './gameReportToDocumentData';

export type AddGameReport = (gameReport: GameReport) => Promise<GameReport>;

export async function addGameReport(gameReport: GameReport): Promise<GameReport> {
  const documentData = gameReportToDocumentData(gameReport);
  const docRef = await addDoc(collectionRef, documentData);

  gameReport.id = docRef.id;

  return gameReport;
}
