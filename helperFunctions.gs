function ynToBool(str) {
  switch (str.toLowerCase()) {
    case "yes":
      return true;
    case "no":
    default:
      return false;
  }
}

function numToWeekday(num) {
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
      return "NotAWeekday";
  }
}

function weekdayToNum(day) {
  switch (day.toLowerCase()) {
    case "monday":
      return 1;
    case "tuesday":
      return 2;
    case "wednesday":
      return 3;
    case "thursday":
      return 4;
    case "friday":
      return 5;
    case "saturday":
      return 6;
    case "sunday":
      return 7;
    default:
      return -1;
  }
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
    value /= isFloat;
  }
  return value;
}
