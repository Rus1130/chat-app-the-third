const firebaseConfig = {
    apiKey: "AIzaSyCa2CBiVrTvIIAghBkFtSCE7qQ_xZaFHFs",
    authDomain: "chat-app-eb721.firebaseapp.com",
    projectId: "chat-app-eb721",
    storageBucket: "chat-app-eb721.appspot.com",
    messagingSenderId: "283100449591",
    appId: "1:283100449591:web:778ecd4cb6c17d087768b2",
    measurementId: "G-MQX1ZZWTMF",
    databaseURL: "https://chat-app-eb721-default-rtdb.firebaseio.com/"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const rtdb = firebase.database();

function surround(string, searchStart, searchEnd, replaceStart, replaceEnd) {

    string = string.split(new RegExp(`(${searchStart}|${searchEnd})`, 'g'));

    searchStart = searchStart.replaceAll("\\", "");
    searchEnd = searchEnd.replaceAll("\\", "");
    for(i = 0; i < string.length; i++) {
        if(string[i] == searchStart) {
            if(string.lastIndexOf(searchEnd) > i) {
                string[i] = replaceStart;
                string[string.lastIndexOf(searchEnd)] = replaceEnd;
            }
        }
    }
    string = string.join("");
    return string;
}