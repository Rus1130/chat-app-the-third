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
            // check if there is a matching string end
            if(string.indexOf(searchEnd) > -1) {
                // check if the string end is after the string start
                if(string.indexOf(searchEnd) > i) {
                    // check if the string start is not already surrounded
                    if(!string[i-1].includes(replaceStart) && !string[i+1].includes(replaceStart)) {
                        string[i] = replaceStart;
                        string[string.indexOf(searchEnd)] = replaceEnd;
                    }
                }
            }
        }
    }
    string = string.join("");
    return string;
}

function format(content){
    content = surround(content, "!", "!", "<formatBold>", "</formatBold>")
    content = surround(content, "\\*", "\\*", "<formatItalic>", "</formatItalic>")
    content = surround(content, "_", "_", "<formatUnderline>", "</formatUnderline>")
    content = surround(content, "~", "~", "<formatStrike>", "</formatStrike>")
    content = surround(content, "#r\\|", "#", "<formatColor class='colorRed'>", "</formatColor>")
    content = surround(content, "#o\\|", "#", "<formatColor class='colorOrange'>", "</formatColor>")
    content = surround(content, "#y\\|", "#", "<formatColor class='colorYellow'>", "</formatColor>")
    content = surround(content, "#g\\|", "#", "<formatColor class='colorGreen'>", "</formatColor>")
    content = surround(content, "#b\\|", "#", "<formatColor class='colorBlue'>", "</formatColor>")
    content = surround(content, "#p\\|", "#", "<formatColor class='colorPurple'>", "</formatColor>")
    content = surround(content, "#c\\|", "#", "<formatColor class='colorCyan'>", "</formatColor>")
    content = surround(content, "#m\\|", "#", "<formatColor class='colorMagenta'>", "</formatColor>")
    content = surround(content, "#lg\\|", "#", "<formatColor class='colorLimegreen'>", "</formatColor>")
    content = surround(content, "@", "@", "<formatHead>", "</formatHead><br>")

    return content;
}