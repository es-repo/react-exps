import collectionDefinition from './collectionDefinition';
import { GameReport } from '../../model/game/gameReport';
import { doc, getDoc } from 'firebase/firestore';
import documentDataToGameReport from './documentDataToGameReport';
import { firestore } from '../firestore';

export type GetGameReportById = (id: string) => Promise<GameReport>;

export default async function getGameReportById(id: string): Promise<GameReport> {
  const docRef = doc(firestore, collectionDefinition.name, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw Error('Document not found by ID.');
  }

  return documentDataToGameReport(docSnap.data(), id);
}
