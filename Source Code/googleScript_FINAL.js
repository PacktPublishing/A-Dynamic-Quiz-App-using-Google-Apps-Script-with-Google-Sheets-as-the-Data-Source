function doGet(e) {
    var ss = SpreadsheetApp.openById('1X2raQeBqfGLZ8DLyJAsPkQI814zkETyS--jIXYfn-l0');
    var len = ss.getSheets().length;
    var sheet = newNamer(len, ss);
    sheet.appendRow(['Question', 'Correct', 'Selection1', 'Selection2', 'Selection3', 'Selection4']);
    //var holder = [['test'],['test2']];
    var holder = (e.parameter.data) ? JSON.parse(e.parameter.data) : [];
    for (var x = 0; x < holder.length; x++) {
        sheet.appendRow(holder[x]);
    }
    var lastRowValue = sheet.getLastRow();
    return ContentService.createTextOutput(JSON.stringify({
        'status': 'success'
        , 'output': holder
        , 'row': lastRowValue
        , 'quizName': sheet.getName()
    }))
    Logger.log(quizName);
}

function doPost(e) {
    var ss = SpreadsheetApp.openById('1X2raQeBqfGLZ8DLyJAsPkQI814zkETyS--jIXYfn-l0');
    var len = ss.getSheets().length;
    var sheet = newNamer(len, ss);
    sheet.appendRow(['Question', 'Correct', 'Selection1', 'Selection2', 'Selection3', 'Selection4']);
    //var holder = [['test'],['test2']];
    var holder = JSON.parse(e.parameter.data);
    for (var x = 0; x < holder.length; x++) {
        sheet.appendRow(holder[x]);
    }
    var lastRowValue = sheet.getLastRow();
    return ContentService.createTextOutput(JSON.stringify({
        'status': 'success'
        , 'output': holder
        , 'row': lastRowValue
        , 'quizName': sheet.getName()
    }))
    Logger.log(quizName);
}

function newTester() {
    var ss = SpreadsheetApp.openById('1X2raQeBqfGLZ8DLyJAsPkQI814zkETyS--jIXYfn-l0');
    var len = ss.getSheets().length;
    var sheet = newNamer(len, ss);
    Logger.log(sheet.getName());
}

function newNamer(len, ss) {
    var quizName = 'quiz' + (len + 1);
    if (ss.getSheetByName(quizName) != null) {
        return newNamer(len + 1, ss);
    }
    else {
        return ss.insertSheet(quizName);
    }
}

function test() {
    var ss = SpreadsheetApp.openById('1X2raQeBqfGLZ8DLyJAsPkQI814zkETyS--jIXYfn-l0');
    var len = ss.getSheets().length;
    var quizName = 'quiz' + (len + 1);
    var sheet = ss.insertSheet(quizName);
    sheet.appendRow(['Question', 'Correct', 'Selection1', 'Selection2', 'Selection3', 'Selection4']);
    var holder = [['test'], ['test2']];
    for (var x = 0; x < holder.length; x++) {
        sheet.appendRow(holder[x]);
    }
    var lastRowValue = sheet.getLastRow();
    return ContentService.createTextOutput(JSON.stringify({
        'status': 'success'
        , 'output': holder
        , 'row': lastRowValue
        , 'quizName': quizName
    }))
    Logger.log(quizName);
}