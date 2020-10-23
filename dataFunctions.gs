function newColObj() {
  var columns = {};
  for (var day = 1; day <= 7; day++) {
    columns[day] = [];
  }
  return columns;
}

function findColumn(columns, colNum, events, eventStart) {
  if (columns[colNum] != null) {
    for (var i of columns[colNum]) {
      var other = events[i];
      // if overlapping any event in current column, move on to next column
      if (eventStart >= other.timeStart && eventStart < other.timeEnd) {
        return findColumn(columns, colNum + 1, events, eventStart);
      }
    }
  }
  // if column empty or no overlap, slot found
  return colNum;
}

function generateScheduleData(events) {
  var data = {
    times: {},           // Time stamp header: Indexes of events[]
    days: [],            // [Index of event] -> Day number of event
    columns: newColObj() // Day number: [Subcolumn number] -> Index of event
  };

  for (var i = 0; i < events.length; i++ ) {
    var start = events[i].timeStart.toString();
    var end = events[i].timeEnd.toString();
    var day = events[i].day.toString();
    var col = findColumn(data.dayCol[day], 0, events, events[i].timeStart);

    if (!data.times.hasOwnProperty(start)) {
      data.times[start] = [];
    }
    data.times[start].push(i);
    if (!data.times.hasOwnProperty(end)) {
      data.times[end] = [];
    }

    data.days[i] = events[i].day;

    if (data.columns[day].length - 1 < col) {
      data.columns[day].push([]);
    }
    data.columns[day][col].push(i);
  }

  return data;
}
