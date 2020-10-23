/** @OnlyCurrentDoc */

function onOpen() {
  var ui = SpreadsheetApp.getUi();

  ui.createMenu("Manager")
    .addItem("Add event", "addEvent")
    .addItem("Build schedule", "buildSchedule")
    .addToUi();
}

function addEvent() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSheet();

  if (sheet.getName() == TEST_LIST || sheet.getName() == CURRENT_LIST) {
    var columns = sheet.getLastColumn();
    sheet.appendRow(new Array(columns));
  }
  else {
    spreadsheet.toast("Cannot add event to this sheet");
  }
}

function buildSchedule() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var schedule = spreadsheet.getSheetByName(TEST_SCHEDULE);
  var list = spreadsheet.getSheetByName(TEST_LIST);

  var events = pullEvents(list.getRange("A2:F"));
  var scheduleData = generateScheduleData(events);

  console.log(scheduleData);
  for (var day in scheduleData.columns) {
    console.log(scheduleData.columns[day]);
  }

  // TODO: format sheet
  formatSheet(events, scheduleData);
}

function formatSheet(events, data) {

}
