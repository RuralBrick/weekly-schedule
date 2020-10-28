function dayToNum(day) {
  switch (day.toLowerCase()) {
    case 'm':
    case "mon":
    case "monday":
      return 1;
    case 't':
    case "tues":
    case "tuesday":
      return 2;
    case 'w':
    case "wed":
    case "wednesday":
      return 3;
    case 'r':
    case "thurs":
    case "thursday":
      return 4;
    case 'f':
    case "fri":
    case "friday":
      return 5;
    case 's':
    case "sat":
    case "saturday":
      return 6;
    case 'u':
    case "sun":
    case "sunday":
      return 7;
    default:
      return -1;
  }
}

function numToDay(num) {
  switch (num) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thurdsay";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
    default:
      return "NotADay";
  }
}

function ynToBool(str) {
  switch (str.toLowerCase()) {
    case "yes":
      return true;
    case "no":
    default:
      return false;
  }
}

function boolToNum(bool) {
  return bool ? 1 : 0;
}

function timeValue(time, precision = 1, isFloat = false) {
  var value = 0;
  var multiplier = 1;
  switch (precision) {
    case 3:
      value += multiplier * time.getMilliseconds();
      multiplier *= 1000;
    case 2:
      value += multiplier * time.getSeconds();
      multiplier *= 60;
    case 1:
      value += multiplier * time.getMinutes();
      multiplier *= 60;
    default:
      value += multiplier * time.getHours();
  }
  if (isFloat) {
    value /= (multiplier * 24);
  }
  return value;
}

function valueTime(value, precision = 1) {
  var divisor = 1;
  switch (precision) {
    case 3:
      divisor *= 1000;
    case 2:
      divisor *= 60;
    case 1:
      divisor *= 60;
    default:
      divisor *= 24;
  }
  return value / divisor;
}

function getConstSheet(sheetVar) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  if (sheetVar == CURRENT_SCHEDULE || sheetVar == CURRENT_LIST) {
    var name = spreadsheet.getRange(sheetVar).getValue();
    return spreadsheet.getSheetByName(name);
  }
  else {
    return spreadsheet.getSheetByName(sheetVar);
  }
}

function cmpConstSheet(sheet, sheetVar) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  if (sheetVar == CURRENT_SCHEDULE || sheetVar == CURRENT_LIST) {
    var name = spreadsheet.getRange(sheetVar).getValue();
    return sheet.getName() == name;
  }
  else {
    return sheet.getName() == sheetVar;
  }
}

function getColors() {
  var colorSheet = getConstSheet(COLOR_KEY);
  var ranges = colorSheet.getNamedRanges();
  var regularRange = ranges[0].getRange();
  var emphasizedRange = ranges[1].getRange();

  var colors = [{}, {}];

  for (var row = 1; row <= regularRange.getNumRows(); row++) {
    var cell = regularRange.getCell(row, 1);
    colors[0][cell.getValue()] = cell.getBackground();
  }
  for (var row = 1; row <= emphasizedRange.getNumRows(); row++) {
    var cell = emphasizedRange.getCell(row, 1);
    colors[1][cell.getValue()] = cell.getBackground();
  }

  return colors;
}
