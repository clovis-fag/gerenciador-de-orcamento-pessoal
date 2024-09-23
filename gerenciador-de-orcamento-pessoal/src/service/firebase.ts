import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDS3_9sR1FVpnmWxIikZIYCghccMofexLk",
  authDomain: "gerenciador-orcamento-pe-c2084.firebaseapp.com",
  projectId: "gerenciador-orcamento-pe-c2084",
  storageBucket: "gerenciador-orcamento-pe-c2084.appspot.com",
  messagingSenderId: "285575887213",
  appId: "1:285575887213:web:5fa410d66b239ad24d8264"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
