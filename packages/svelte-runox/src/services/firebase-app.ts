import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCVVle1gjhwNpsJ-6ZqlYKA7kCPmZTi6YI",
  authDomain: "runox-e913c.firebaseapp.com",
  databaseURL: "https://runox-e913c.firebaseio.com",
  projectId: "runox-e913c",
  storageBucket: "runox-e913c.appspot.com",
  messagingSenderId: "864843419430",
  appId: "1:864843419430:web:77a77941ecb8958bea7be7"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
