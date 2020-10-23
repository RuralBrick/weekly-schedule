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
  var timeSlots = generateTimeSlots(events);
  var columnSlots = findColSlots(events);

  console.log(timeSlots);
  console.log(columnSlots);

  // TODO: format sheet
}

function formatSheet(event, timeSlots, colSlots) {

}
