/**
 * doGet: HTMLページを返す
 */
function doGet(e: GoogleAppsScript.Events.DoGet) {
  return HtmlService.createHtmlOutputFromFile("index");
}

/**
 * メッセージを送信する
 */
function sendMessage(chatId: string, sender: string, message: string): boolean {
  const sheet = getSheet();
  if (!sheet) return false;

  sheet.appendRow([new Date(), chatId, sender, message]);
  return true;
}

/**
 * 指定されたチャットIDのメッセージを取得する
 */
function getMessages(chatId: string): any[] {
  const sheet = getSheet();
  if (!sheet) return [];

  const data = sheet.getDataRange().getValues();
  return data
    .filter(row => row[1] === chatId)
    .map(row => ({ timestamp: row[0], sender: row[2], message: row[3] }));
}

/**
 * スプレッドシートのシートを取得する
 */
function getSheet(): GoogleAppsScript.Spreadsheet.Sheet | null {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    return ss.getSheetByName(SHEET_NAME);
  } catch (e) {
    Logger.log("シートを開けませんでした: " + e.toString());
    return null;
  }
}
