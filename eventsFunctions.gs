function newEventsObject() {
  var events = {};
  for (var day = 1; day <= 7; day++) {
    events[day.toString()] = [];
  }
  return events;
}

function pullEvents(range) {
  //var events = newEventsObject();
  var events = [];
  for (var row of range.getValues()) {
    var event = {
      name: row[0],
      day: weekdayToNum(row[1]),
      timeStart: timeValue(row[2]),
      timeEnd: timeValue(row[3]),
      type: row[4],
      emphasize: ynToBool(row[5])
    };
    //events[event.day.toString()].push(event);
    events.push(event);
  }
  return events;
}
