function newColObj() {
  var columns = {};
  for (var day = 1; day <= 7; day++) {
    columns[day] = [];
  }
  return columns;
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
    var col = findColumn(data.columns[day], 0, events, events[i].timeStart);

    if (!data.times.hasOwnProperty(start)) {
      data.times[start] = [];
    }
    data.times[start].push(i);
    if (!data.times.hasOwnProperty(end)) {
      data.times[end] = [];
    }

    data.days[i] = events[i].day.toString();

    if (data.columns[day].length - 1 < col) {
      data.columns[day].push([]);
    }
    data.columns[day][col].push(i);
  }

  return data;
}

function findColumn(columns, colNum, events, eventStart) {
  if (columns[colNum] != null) {
    for (var i of columns[colNum]) {
      var other = events[i];
      // if overlapping any event in current column, move on to next column
      if (eventStart >= other.timeStart && eventStart <= other.timeEnd) {
        return findColumn(columns, colNum + 1, events, eventStart);
      }
    }
  }
  // if column empty or no overlap, slot found
  return colNum;
}

function calcCol(columns, day, offset = 0) {
  var col = 2;
  switch (day) {
    case 7:
    case '7':
      if (columns['6'].length <= 0)
        col++;
      else
        col += columns['6'].length;
    case 6:
    case '6':
      if (columns['5'].length <= 0)
        col++;
      else
        col += columns['5'].length;
    case 5:
    case '5':
      if (columns['4'].length <= 0)
        col++;
      else
        col += columns['4'].length;
    case 4:
    case '4':
      if (columns['3'].length <= 0)
        col++;
      else
        col += columns['3'].length;
    case 3:
    case '3':
      if (columns['2'].length <= 0)
        col++;
      else
        col += columns['2'].length;
    case 2:
    case '2':
      if (columns['1'].length <= 0)
        col++;
      else
        col += columns['1'].length;
    case 1:
    case '1':
    default:
      col += offset;
  }
  return col;
}

function getEventCol(days, columns, target) {
  var day = days[target];
  var dayCols = columns[day];
  var offset = 0;

  search:
  for (var subCol = 0; subCol < dayCols.length; subCol++) {
    for (var i of dayCols[subCol]) {
      if (target == i) {
        offset = subCol;
        break search;
      }
    }
  }

  return calcCol(columns, day, offset);
}
