import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBgBygjA3pyv_AyytKkZW9iAP_tbfVMl1g",
  authDomain: "amazino-fitness.firebaseapp.com",
  databaseURL: "https://amazino-fitness-default-rtdb.firebaseio.com",
  projectId: "amazino-fitness",
  storageBucket: "amazino-fitness.appspot.com",
  messagingSenderId: "265986580996",
  appId: "1:265986580996:web:7f3cbe2053502cfe3a8b51",
  measurementId: "G-Q7330BCQFN",
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
