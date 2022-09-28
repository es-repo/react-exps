import { collection, CollectionReference, DocumentData } from 'firebase/firestore';
import { firestore } from '../firestore';
import collectionDefinition from './collectionDefinition';

const collectionRef: CollectionReference<DocumentData> = collection(firestore, collectionDefinition.name);

export default collectionRef;
