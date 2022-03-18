// set data
const timeZones = {
  0: {
    timezone: "America/Los_Angeles", // tz database name - https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    name: "West Coast", // display name for this timezone
    team: "Jane, John" // team members working in this timezone
  },
  1: {
    timezone: "America/New_York",
    name: "East Coast",
    team: "The team on the East Coast"
  },
  2: {
    timezone: "Europe/London",
    name: "London",
    team: "Someone in the UK"
  },
  3: {
    timezone: "Europe/Berlin",
    name: "Berlin",
    team: "Two people in Berlin"
  },
  4: {
    timezone: "Asia/Dubai",
    name: "Dubai",
    team: "Someone in Dubai"
  },
  5: {
    timezone: "Australia/Sydney",
    name: "Sydney",
    team: "The team in Sydney"
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

function generateHTML(i, name, team) {
  const outerDiv = document.createElement('div');
  outerDiv.classList.add("col-sm", "text-center", "d-flex", "flex-column", "justify-content-between");

  const topRow = document.createElement('div');
  topRow.classList.add("row");
  outerDiv.appendChild(topRow);
  
  const middleRow = document.createElement('div');
  middleRow.classList.add("row", "mt-3", "mt-sm-0");
  
  const clock = document.createElement('h1');
  clock.classList.add("clock");
  clock.id = `time-${i}`
  middleRow.appendChild(clock);

  const date = document.createElement('p');
  date.id = `date-${i}`
  middleRow.appendChild(date);
  outerDiv.appendChild(middleRow);

  const bottomRow = document.createElement('div');
  bottomRow.classList.add("row", "mb-1", "mb-sm-4");
  const bottomRowHTML = `
    <p><span>${name}</span>
      <br><span id="offset-${i}"></span>
      <br><span>${team}</span>
    </p>
  `;
  bottomRow.innerHTML = bottomRowHTML;
  outerDiv.appendChild(bottomRow);

  const main = document.querySelector('main');
  main.appendChild(outerDiv);
}

function displayClock(i, timezone) {
  const dt = generateDT(timezone);
  document.getElementById(`time-${i}`).textContent = dt.toLocaleString(DateTime.TIME_SIMPLE);
  document.getElementById(`date-${i}`).textContent = dt.toLocaleString({ weekday: 'short', month: 'long', day: 'numeric' });
  document.getElementById(`offset-${i}`).textContent = dt.offsetNameShort;
  document.getElementById(`time-${i}`).parentElement.parentElement.classList.remove(getClass(dt.hour - 2));
  document.getElementById(`time-${i}`).parentElement.parentElement.classList.add(getClass(dt.hour));
}

// main function, runs every second
function displayClocks() {
  for (var i = 0; i < numberOfTimezones; ++i) {
    // first time it runs, create HTML structure
    if (document.querySelector('main').childElementCount < numberOfTimezones) {
      generateHTML(i, timeZones[i].name, timeZones[i].team);
    }
    // display dynamic data
    displayClock(i, timeZones[i].timezone)
  }
}

window.onload = displayClocks();
setInterval(displayClocks, 1000);