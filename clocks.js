// set data
const timeZones = {
  0: {
    timezone: "America/Los_Angeles",
    name: "West Coast",
    team: "Emma, Nick, Sri"
  },
  1: {
    timezone: "America/New_York",
    name: "East Coast",
    team: "Jeff, Dan, Rich, Scott"
  },
  2: {
    timezone: "Europe/London",
    name: "London",
    team: "Lewis"
  },
  3: {
    timezone: "Europe/Berlin",
    name: "Berlin",
    team: "Michal"
  },
  4: {
    timezone: "Asia/Dubai",
    name: "Dubai",
    team: "Garima"
  },
  5: {
    timezone: "Australia/Sydney",
    name: "Sydney",
    team: "Alex"
  }
}

const numberOfTimezones = Object.keys(timeZones).length;

// import luxon
var DateTime = luxon.DateTime;

// helpers
function generateDT(tzString) {
    return DateTime.now().setLocale('en-GB').setZone(tzString);
}

function getClass(hour) {
    if (hour >=6 && hour < 8) {
        return "dawn";
    } else if (hour >=8 && hour < 10) {
        return "morning";
    } else if (hour >=10 && hour < 12) {
        return "late-morning";
    } else if (hour >=12 && hour < 14) {
        return "lunch";
    } else if (hour >=14 && hour < 16) {
        return "afternoon";
    } else if (hour >=16 && hour < 18) {
        return "late-afternoon";
    } else if (hour >=18 && hour < 20) {
        return "sunset";
    } else if (hour >=20 && hour < 22) {
        return "evening";
    } else {
        return "night";
    }
}

function displayClock(timezone, name, team, i) {
  let dt = generateDT(timezone);
  document.getElementById(`time-${i}`).innerHTML = dt.toLocaleString(DateTime.TIME_SIMPLE);
  document.getElementById(`date-${i}`).innerHTML = dt.toLocaleString({ weekday: 'short', month: 'long', day: 'numeric' });
  document.getElementById(`zone-name-${i}`).innerHTML = name;
  document.getElementById(`offset-${i}`).innerHTML = dt.offsetNameShort;
  document.getElementById(`team-${i}`).innerHTML = team;
  document.getElementById(`time-${i}`).parentElement.parentElement.classList.remove(getClass(dt.hour - 2));
  document.getElementById(`time-${i}`).parentElement.parentElement.classList.add(getClass(dt.hour));
}

// main function, runs every second - iterates over timeZones object
function displayClocks() {
    for (var i = 0; i < numberOfTimezones; ++i) {
      displayClock(timeZones[i].timezone, timeZones[i].name, timeZones[i].team, i)
    }
}

window.onload = displayClocks();
setInterval(displayClocks, 1000);