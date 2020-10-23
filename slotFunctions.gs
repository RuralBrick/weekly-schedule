function generateTimeSlots(events) {
  var timeSlots = {};
  for (var i = 0; i < events.length; i++) {
    var key = events[i].timeStart.toString();

    if (!timeSlots.hasOwnProperty(key)) {
      timeSlots[key] = [];
    }
    timeSlots[key].push(i);
  }
  for (var hour = DAY_HOUR_START; hour < DAY_HOUR_END; hour++) {
    if (!timeSlots.hasOwnProperty(hour * MIN_PER_HOUR)) {
      timeSlots[hour * MIN_PER_HOUR] = [];
    }
  }
  return timeSlots;
}

function newColSlotsObject() {
  var colSlots = {};
  for (var day = 1; day <= 7; day++) {
    colSlots[day.toString()] = [];
  }
  return colSlots;
}

function newTimeSlotsObject() {
  var timeSlots = {};

}

function searchColumn(colList, num, eventList, eventIndex) {
  if (colList[num] != null) {
    var currentEvent = eventList[eventIndex];
    for (var otherIndex of colList[num]) {
      var otherEvent = eventList[otherIndex];
      // if overlapping any event in current column, move on to next column
      if (currentEvent.timeStart >= otherEvent.timeStart && currentEvent.timeStart < otherEvent.timeEnd) {
        return searchColumn(colList, num + 1, eventList, eventIndex);
      }
    }
  }
  // if column empty or no overlap, slot found
  return num;
}

function findColSlots(events) {
  var colSlots = newColSlotsObject();
  for (var i = 0; i < events.length; i++) {
    var day = events[i].day;
    var col = searchColumn(colSlots[day], 0, events, i);

    // if not enough columns for day, add one
    if (colSlots[day].length - 1 < col) {
      colSlots[day].push([]);
    }
    colSlots[day][col].push(i);
  }
  return colSlots;
}

function calcColumn(dayCols, day, offset) {
  var col = 1;
  switch (day) {
    case 7:
      col += dayCols[6];
    case 6:
      col += dayCols[5];
    case 5:
      col += dayCols[4];
    case 4:
      col += dayCols[3];
    case 3:
      col += dayCols[2];
    case 2:
      col += dayCols[1];
    case 1:
    default:
      col += offset;
  }
}

function findColOffset(eventCol, dayCols, eventList, eventIndex, limit) {
  if (limit == 0) {
    return 1;
  }
  else {
    var currentEvent = eventList[eventIndex];
    for (var otherIndex = 0; otherIndex < eventCol.length; otherIndex++) {
      if (eventIndex == otherIndex) {
        continue;
      }
      var otherEvent = eventList[otherIndex];
      if (calcColumn(dayCols, currentEvent.day + 1, -limit) == eventCol[otherIndex]
          && eventIndex.timeStart >= otherIndex.timeStart
          && eventIndex.timeStart < otherIndex.timeEnd) {
        return 1 + findColOffset(eventCol, dayCols, eventList, eventIndex, limit - 1);
      }
    }
  }
}

function findColumn() {

}

function scheduleData(events) {
  var data = {
    timeSlots: {},
    eventCol: [],
    dayCols: [null, [], [], [], [], [], [], []]
  };

  for (var i = 0; i < events.length; i++ ) {
    var day = events[i].day;
    var start = events[i].timeStart.toString();
    var end = events[i].timeEnd.toString();

    if (!data.timeSlots.hasOwnProperty(start)) {
      data.timeSlots[start] = [];
    }
    data.timeSlots[start].push(i);
    if (!data.timeSlots.hasOwnProperty(end)) {
      data.timeSlots[end] = [];
    }
    
    eventCol[i] = day;
  }

  return data;
}
