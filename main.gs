/** @OnlyCurrentDoc */

function onOpen() {
  var ui = SpreadsheetApp.getUi();

  ui.createMenu("Manager")
    .addItem("Add event", "addEvent")
    .addItem("Build schedule", "buildSchedule")
    .addToUi();
}

function addEvent() {
  var sheet = SpreadsheetApp.getActiveSheet();

  if (cmpConstSheet(sheet, TEST_LIST) || cmpConstSheet(sheet, CURRENT_LIST)) {
    var columns = sheet.getLastColumn();
    sheet.appendRow(new Array(columns));
  }
  else {
    SpreadsheetApp.getActiveSpreadsheet().toast("Cannot add event to this sheet");
  }
}

function buildSchedule() {
  var template = getConstSheet(TEMPLATE_SCHEDULE);
  var schedule = getConstSheet(CURRENT_SCHEDULE);
  var list = getConstSheet(CURRENT_LIST);

  var events = pullEvents(list.getRange("A2:F"));
  var scheduleData = generateScheduleData(events);

  schedule.clear();

  // Place and record time stamp headers
  var timeHeaders = {};
  var latestRow = 2;
  var prevTime = null;
  for (var timeStamp in scheduleData.times) {
    var currentTime = parseInt(timeStamp, 10);

    if (prevTime != null && currentTime - prevTime > MIN_PER_HOUR) {
      schedule.getRange(latestRow, 1).setValue("...");
      latestRow++;
    }

    timeHeaders[timeStamp] = latestRow;
    schedule.getRange(latestRow, 1).setValue(valueTime(currentTime));

    prevTime = currentTime;
    latestRow++;
  }

  // Format time stamp headers
  template.getRange(2, 1).copyFormatToRange(schedule, 1, 1, 2, latestRow);
  for (var row = 2; row < latestRow; row++) {
    var header = schedule.getRange(row, 1);
    var value = header.getValue();

    if (value instanceof Date) {
      var time = timeValue(value);

      if (time % MIN_PER_HOUR != 0) {
        header.setBackground("lightgray");
      }
    }
    else {
      header.setBackground("lightgray");
    }
  }

  // Place day headers and merge header cells
  var latestCol = 2;
  for (var day in scheduleData.columns) {
    var numSubcol = scheduleData.columns[day].length;
    if (numSubcol <= 0)
      numSubcol = 1;
    var range = schedule.getRange(1, latestCol, 1, numSubcol);

    range.merge()
         .setValue(numToDay(parseInt(day, 10)));

    latestCol += numSubcol;
  }

  // Place and color events and merge event cells
  var colors = getColors();
  for (var timeStamp in scheduleData.times) {
    for (var i of scheduleData.times[timeStamp]) {
      var row = timeHeaders[timeStamp];
      var col = getEventCol(scheduleData.days, scheduleData.columns, i);
      var numRows = timeHeaders[events[i].timeEnd.toString()] - row;
      var range = schedule.getRange(row, col, numRows);

      range.merge()
           .setValue(events[i].name)
           .setVerticalAlignment("top")
           .setBackground(colors[boolToNum(events[i].emphasize)][events[i].type]);
    }
  }

  // Polish
  schedule.autoResizeColumns(1, latestCol - 1);
  schedule.getRange(1, 1, 1, latestCol - 1).setBorder(null, null, true, null, null, null);
  for (var day = 1; day <= 7; day++) {
    schedule.getRange(1, calcCol(scheduleData.columns, day), latestRow - 1).setBorder(null, true, null, null, null, null);
  }
}
