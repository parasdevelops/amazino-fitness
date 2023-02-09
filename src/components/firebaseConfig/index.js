// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function startFirebase() {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBgBygjA3pyv_AyytKkZW9iAP_tbfVMl1g",
    authDomain: "amazino-fitness.firebaseapp.com",
    databaseURL: "https://amazino-fitness-default-rtdb.firebaseio.com",
    projectId: "amazino-fitness",
    storageBucket: "amazino-fitness.appspot.com",
    messagingSenderId: "265986580996",
    appId: "1:265986580996:web:7f3cbe2053502cfe3a8b51",
    measurementId: "G-Q7330BCQFN",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}
export default startFirebase;
