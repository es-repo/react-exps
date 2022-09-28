import { doc, setDoc } from 'firebase/firestore';
import collectionDefinition from './collectionDefinition';
import { GameReport } from '../../model/game/gameReport';
import gameReportToDocumentData from './gameReportToDocumentData';
import { firestore } from '../firestore';

export type UpdateGameReport = (gameReport: GameReport) => Promise<GameReport>;

export async function updateGameReport(gameReport: GameReport): Promise<GameReport> {
  const docRef = doc(firestore, collectionDefinition.name, gameReport.id);
  const documentData = gameReportToDocumentData(gameReport);
  await setDoc(docRef, documentData);
  return gameReport;
}
