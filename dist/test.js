"use strict";
/**
 * doGet: HTMLページを返す
 */
function doGet(e) {
    return HtmlService.createHtmlOutputFromFile("index");
}
/**
 * メッセージを送信する
 */
function sendMessage(chatId, sender, message) {
    var sheet = getSheet();
    if (!sheet)
        return false;
    sheet.appendRow([new Date(), chatId, sender, message]);
    return true;
}
/**
 * 指定されたチャットIDのメッセージを取得する
 */
function getMessages(chatId) {
    var sheet = getSheet();
    if (!sheet)
        return [];
    var data = sheet.getDataRange().getValues();
    return data
        .filter(function (row) { return row[1] === chatId; })
        .map(function (row) { return ({ timestamp: row[0], sender: row[2], message: row[3] }); });
}
/**
 * スプレッドシートのシートを取得する
 */
function getSheet() {
    try {
        var ss = SpreadsheetApp.openById(SHEET_ID);
        return ss.getSheetByName(SHEET_NAME);
    }
    catch (e) {
        Logger.log("シートを開けませんでした: " + e.toString());
        return null;
    }
}
