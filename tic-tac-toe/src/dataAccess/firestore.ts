import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAC973WpMJygzy-pZlBfzoxgMkWIowh6Xo',
  authDomain: 'tictactoe-b31fe.firebaseapp.com',
  projectId: 'tictactoe-b31fe',
  storageBucket: 'tictactoe-b31fe.appspot.com',
  messagingSenderId: '965245883576',
  appId: '1:965245883576:web:04cdf4ed28b4b177c1504d',
  measurementId: 'G-8V581QE73D'
};

const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);
