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
    string = string.split(new RegExp(`(${searchStart}|${searchEnd}|\\\\)`, 'g'));

    searchStart = searchStart.replaceAll("\\", "");
    searchEnd = searchEnd.replaceAll("\\", "");
    

    let searchStartIndeces = []
    let searchEndIndeces = []

    let ignoreFormatting = false;

    let codeBlockStarts = [];
    let codeBlockEnds = [];

    // find all pairs of searchStart and searchEnd
    for (let i = 0; i < string.length; i++) {
        
        if(string[i] == searchStart){
            if(ignoreFormatting == false){
                searchStartIndeces.push(i);
            }

        }
    }

    for(i = 0; i < searchStartIndeces.length; i++){
        for(let j = searchStartIndeces[i]; j < string.length; j++){
            if(string[j] == searchEnd && searchStartIndeces[i] != j){
                searchEndIndeces.push(j);
                break;
            }
        }
    }

    for(i = 0; i < searchStartIndeces.length; i++){
        if(searchEndIndeces[i] != undefined){
            string[searchStartIndeces[i]] = replaceStart;
            string[searchEndIndeces[i]] = replaceEnd;
        }
    }

    return string.join("");
}

function format(content){
    content = surround(content, "\\*\\*", "\\*\\*", "<formatBold start='**' end='**'>", "</formatBold>")
    content = surround(content, "\\*", "\\*", "<formatItalic start='*' end ='*'>", "</formatItalic>")
    content = surround(content, "__", "__", "<formatUnderline start='__' end='__'>", "</formatUnderline>")
    content = surround(content, "~~", "~~", "<formatStrike start='~~' end='~~'>", "</formatStrike>")
    content = surround(content, "#r\\|", "\\|", "<formatColor class='colorRed' start='#r|' end='|'>", "</formatColor>")
    content = surround(content, "#o\\|", "\\|", "<formatColor class='colorOrange' start='#o|' end='|'>", "</formatColor>")
    content = surround(content, "#y\\|", "\\|", "<formatColor class='colorYellow' start='#y|' end='|'>", "</formatColor>")
    content = surround(content, "#g\\|", "\\|", "<formatColor class='colorGreen' start='#g|' end='|'>", "</formatColor>")
    content = surround(content, "#b\\|", "\\|", "<formatColor class='colorBlue' start='#b|' end='|'>", "</formatColor>")
    content = surround(content, "#p\\|", "\\|", "<formatColor class='colorPurple' start='#p|' end='|'>", "</formatColor>")
    content = surround(content, "#c\\|", "\\|", "<formatColor class='colorCyan' start='#c|' end='|'>", "</formatColor>")
    content = surround(content, "#m\\|", "\\|", "<formatColor class='colorMagenta' start='#m|' end='|'>", "</formatColor>")
    content = surround(content, "@", "@", "<formatHead start='@' end='@'>", "</formatHead>")
    content = surround(content, "`", "`", "<formatCode>", "</formatCode>")
    content = surround(content, "\\$twirly", "\\$", "<twirly start='$twirly' end='$'>", "</twirly>")
    content = surround(content, "\\$growing-smiley", "\\$", "<growing-smiley start='$growing-smiley' end='$'>", "</growing-smiley>")
    content = surround(content, "\\$emoji-wheel", "\\$", "<emoji-wheel start='$emoji-wheel' end='$'>", "</emoji-wheel>")
    return content;
}

function removeHTMLTags(content){    
    let tags = content.match(/(<\w+>)|(<\/\w+>) /g);
    let tagsToReplace = [];

    if(tags == null) return content;
    for(let i = 0; i < tags.length; i++){
        let tag = tags[i].replaceAll("</", "").replaceAll("<", "").replaceAll(">", "");
        openingTag = "<" + tag + ">";
        closingTag = "</" + tag + ">";
        tagsToReplace.push(openingTag);
        tagsToReplace.push(closingTag);

    }

    for(let i = 0; i < tagsToReplace.length; i++){
        content = content.replace(tagsToReplace[i], "");
    }

    return content;
}