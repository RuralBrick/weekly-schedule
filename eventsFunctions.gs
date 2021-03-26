function pullEvents(range) {
  var events = [];
  for (var row of range.getValues()) {
    var event = {
      name: row[0],
      day: dayToNum(row[1]),
      timeStart: timeValue(row[2]),
      timeEnd: timeValue(row[3]),
      type: row[4],
      emphasize: ynToBool(row[5])
    };
    if (event.day != -1 && event.timeStart != null && event.timeEnd != null)
      events.push(event);
  }
  events.sort((a, b) => (a.timeStart > b.timeStart) ? 1 : -1);
  return events;
}
