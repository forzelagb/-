function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    const raw = e && e.postData ? e.postData.contents : '{}';
    const data = JSON.parse(raw);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Дата выбранная на сайте', 'Время отправки']);
    }

    const selectedDate = data.date || 'Не указана';
    const timestamp = data.timestamp
      ? new Date(data.timestamp)
      : new Date();

    sheet.appendRow([selectedDate, timestamp]);

    return ContentService
      .createTextOutput(JSON.stringify({ok: true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        error: String(error)
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
