import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZL_U0zN_nrN0F_k32ZeZcJ8r2_QULaNs",
  authDomain: "dealsdry.firebaseapp.com",
  projectId: "dealsdry",
  storageBucket: "dealsdry.appspot.com",
  messagingSenderId: "47727853735",
  appId: "1:47727853735:web:43b7839fc6b1b0c3fa1b82"
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };