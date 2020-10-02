// Welcome to my JS code! WOW! 500 lines! Enjoy breaking your eyes!

// locks the start button, preventing it from being pressed and messing up the time.
window.lock = 0;

// Shows if timer if active or not. Gives stop button functionality.
window.active = 0;

// Counter counts my elapsed time. It will be reset to zero each time reset or clear is pressed.
var counter = 0;

// This array keeps all the possible 'tasks' the starship computer can perform.
var tasks = [
  "&nbsp;&nbsp;Partol neutral zone<br>",
  "&nbsp;&nbsp;Calibrate astrometirc sensors<br>",
  "&nbsp;&nbsp;Stabilize warp core<br>",
  "&nbsp;&nbsp;Realign matter-anitmatter injectors<br>",
  "&nbsp;&nbsp;Repair replicators<br>",
  "&nbsp;&nbsp;General maintenance<br>",
  "&nbsp;&nbsp;Scan unidentified probe<br>",
  "&nbsp;&nbsp;Launch shuttlecraft<br>",
  "&nbsp;&nbsp;Recharge phaser banks<br>",
  "&nbsp;&nbsp;Investigate temporal anomaly<br>",
  "&nbsp;&nbsp;Sanitize holodeck<br>",
  "&nbsp;&nbsp;Maintain current position<br>",
  "&nbsp;&nbsp;Repel hostile Klingons<br>",
  "&nbsp;&nbsp;Scan for cloaked Romulan Ships<br>",
  "&nbsp;&nbsp;Investigate Borg activity<br>",
  "&nbsp;&nbsp;Crew evaluations<br>",
  "&nbsp;&nbsp;Routine medical examinations<br>",
  "&nbsp;&nbsp;Purge residual tetryon particles<br>",
  "&nbsp;&nbsp;Repair damaged nacelles<br>",
  "&nbsp;&nbsp;Inspect Jeffries tubes<br>",
  "&nbsp;&nbsp;Engage in combat simulations<br>",
  "&nbsp;&nbsp;Recieve Andorian ambassador<br>",
  "&nbsp;&nbsp;Disable pirate vessels<br>",
  "&nbsp;&nbsp;Trace suspicious warp trails<br>",
  "&nbsp;&nbsp;Identify gaseous anomaly<br>",
  "&nbsp;&nbsp;Set course for nearest Starbase<br>",
  "&nbsp;&nbsp;Overload experimental warp core<br>",
  "&nbsp;&nbsp;Prepare for first contact<br>",
  "&nbsp;&nbsp;Arrest intergalactic fugitive<br>",
  "&nbsp;&nbsp;Host diplomatic conference<br>",
  "&nbsp;&nbsp;Expose Dominion spy<br>",
  "&nbsp;&nbsp;Replicate earl grey tea<br>",
  "&nbsp;&nbsp;Recalibrate turbolifts<br>",
  "&nbsp;&nbsp;Warp 1<br>",
  "&nbsp;&nbsp;Warp 2<br>",
  "&nbsp;&nbsp;Warp 3<br>",
  "&nbsp;&nbsp;Warp 4<br>",
  "&nbsp;&nbsp;Warp 5<br>",
  "&nbsp;&nbsp;Warp 6<br>",
  "&nbsp;&nbsp;Warp 7<br>",
  "&nbsp;&nbsp;Warp 8<br>",
  "&nbsp;&nbsp;Warp 9<br>"
];

// This array keeps the links to all my alarm audio.
var allalarms = [
  "audio/standard.mp3",
  "audio/redalert.mp3",
  "audio/sensors.mp3",
  "audio/intercom.mp3",
  "audio/khan.mp3",
  "audio/phaser.mp3",
  "audio/ferengi.mp3",
  "audio/borg.mp3"
];

// When body loads, do these things:
function start() {
  // window.active globally keeps track of whether the timer is active. 0 = inactive.
  window.active = 0;
  // Set alarm1 (standard) as staring alarm.
  chooseAlarm(0);
  // Set helppage display as none. This helps 'if' loop to check whether help page is open or not.
  document.getElementById("helppage").style.display = "none";
}

function help() {
  var help = document.getElementById("helppage");
  if (help.style.display == "none") {
    help.style.display = "block";
  } else {
    help.style.display = "none";
  }
}

function volume() {
  var volumeicon = document.getElementById("volumeicon");
  var allaudio = document.getElementsByClassName("myAudio");
  if (volumeicon.innerHTML == "volume_up") {
    volumeicon.innerHTML = "volume_off";
    // Mute all audio
    for (var i = 0; i < allaudio.length; i++) {
      allaudio[i].muted = true;
    }
  } else {
    volumeicon.innerHTML = "volume_up";
    // Unmute all audio
    for (var i = 0; i < allaudio.length; i++) {
      allaudio[i].muted = false;
    }
  }
}

function set1() {
  var x = document.getElementById("hrset");
  x.value = x.value.slice(0, 2);
}

function set2() {
  var x = document.getElementById("minset");
  x.value = x.value.slice(0, 2);
}

function set3() {
  var x = document.getElementById("secset");
  x.value = x.value.slice(0, 2);
}

/* setInt does not accually set the interval, it hides the timer and pulls out the set interval display for user*/
var timer = document.getElementById("timercontainer");
var inter = document.getElementById("intsetcontainer");
var alarm = document.getElementById("alarmsetcontainer");
function setInt() {
  if (window.active == 0) {
    alarm.style.display = "none";
    timer.style.display = "none";
    inter.style.display = "table";
  }
}
// Again, setAlarm does not actually set alarm. It displays alarm setting selection for user.
function setAlarm() {
  if (window.active == 0) {
    inter.style.display = "none";
    timer.style.display = "none";
    alarm.style.display = "block";
  }
}

// Back to main button
function back() {
  alarm.style.display = "none";
  inter.style.display = "none";
  timer.style.display = "block";
  var intContainer = document.getElementById("intcontainer");
  /* If any intervals have been logged, then proceed */
  if (intContainer.childNodes.length > 0) {
    console.log("Interval detected. Timer placeholder set.");
    // Retrieve value from the first child of interval log and set timer as placeholder.
    document.getElementById("timer").innerHTML =
      intContainer.childNodes[0].innerHTML;
  } else {
    /* If no intervals are logged, clear timer.*/
    console.log("No intervals logged. Timer static.");
    document.getElementById("timer").innerHTML = "00:00:00";
  }
  // Update remaining time when user goes back to timer to start countdown
  document.getElementById("timer").style.color = "#eee";
  updateTimeleft();
}

//THIS FUNCTION ACTUALLY SETS THE ALARM.
function chooseAlarm(clicked_id) {
  var allbut = alarm.children;
  for (var i = 0; i < allbut.length; i++) {
    allbut[i].style.backgroundColor = "#ddd";
  }
  document.getElementById(clicked_id).style.backgroundColor = "orange";
  document.getElementById(clicked_id).style.borderColor = "grey";
  var alarmaudio = document.getElementById("alarmaudio");
  alarmaudio.src = allalarms[clicked_id];
}

// THIS FUNTION ACTUALLY SETS INTERVAL
// Makeitso takes values from input boxes and sets intervals. This function is triggered by the setint button
function makeitso() {
  // Retrieve time values from input bars. Trim to remove spaces.
  var sset = parseInt(document.getElementById("secset").value.trim());
  var mset = parseInt(document.getElementById("minset").value.trim());
  var hset = parseInt(document.getElementById("hrset").value.trim());

  // If any int is not a number(user didn't input anything), make its value zero //
  if (isNaN(sset)) {
    sset = "0";
  }
  if (isNaN(mset)) {
    mset = "0";
  }
  if (isNaN(hset)) {
    hset = "0";
  }

  // Next, converts smaller units to larger ones and store the leftovers (found using modulus) in new variables.
  // For example, if 120 minutes were selected, it would be converted into an additional 2 hours.
  var secondset = sset % 60;
  var minuteset = (mset + Math.floor(sset / 60)) % 60;
  var hourset = hset + Math.floor((mset + Math.floor(sset / 60)) / 60);

  console.log(
    "New interval added: " +
      hourset +
      "hours " +
      minuteset +
      "minutes " +
      secondset +
      "seconds"
  );

  // Insert a zero before all time values to make a timer format.
  // Uses an if statement to remove this zero when triple digits occur;
  // if only one digit is present, the zero won't be removed.
  secondset = "0" + secondset;
  if (secondset.length > 2) {
    secondset = secondset.substring(1);
  }
  minuteset = "0" + minuteset;
  if (minuteset.length > 2) {
    minuteset = minuteset.substring(1);
  }
  hourset = "0" + hourset;
  if (hourset.length > 2) {
    hourset = hourset.substring(1);
  }

  // If the value in all three fields is zero, do nothing. Only log interval when all values != 0.
  if (secondset == 0 && minuteset == 0 && hourset == 0) {
    // nothing
  } else {
    // create a span eloement and append it to lcars log to display new intervals.
    var newelement = document.createElement("SPAN");
    newelement.className = "int";
    newelement.innerHTML = hourset + ":" + minuteset + ":" + secondset;
    document.getElementById("intcontainer").appendChild(newelement);
    // create another span eloement and append it to lcars log to display accompnying text.
    var newelement = document.createElement("SPAN");
    newelement.className = "inttext";
    newelement.innerHTML = tasks[Math.floor(Math.random() * 42)];
    document.getElementById("intcontainer").appendChild(newelement);
  }
}

/* Reset function removes all child elements from incontainer, effectively clearing all intervals */
function resetint() {
  while (document.getElementById("intcontainer").hasChildNodes()) {
    document
      .getElementById("intcontainer")
      .removeChild(document.getElementById("intcontainer").lastChild);
  }
  /* To be thorough, also remove time inputs by user. */
  document.getElementById("secset").value = "";
  document.getElementById("minset").value = "";
  document.getElementById("hrset").value = "";
  // Update the timeleft to account for deletion of intervals
  updateTimeleft();
  counter = 0;
}

/* Random function generates random numbers and inserts them into time inputs */
function randomint() {
  var sset = document.getElementById("secset");
  var mset = document.getElementById("minset");
  var hset = document.getElementById("hrset");
  // Only randomize when the imput field is empty.
  // This allows for flexibility. User can decide which values to make random.
  if (sset.value == "") {
    /* random number can vary from 0 to 99 */
    sset.value = Math.floor(Math.random() * 100);
  }
  if (mset.value == "") {
    mset.value = Math.floor(Math.random() * 100);
  }
  if (hset.value == "") {
    hset.value = Math.floor(Math.random() * 100);
  }
}

// Initiates when user presses start button
function begincount() {
  if (
    window.lock == 0 &&
    document.getElementById("intcontainer").childNodes.length > 0
  ) {
    // Lock the start button, preventing repeated pressing
    window.lock = 1;
    // Activate the timer
    window.active = 1;

    // Let the timer display the interval for hlaf of a second before beginning.
    // Set the color of the timer to blue for this duration to create a blue 'flash' effect.
    // This is for the sake of alerting the user to the start of a new interval.
    document.getElementById("timer").innerHTML = document.getElementById(
      "intcontainer"
    ).childNodes[0].innerHTML;
    document.getElementById("timer").style.color = "dodgerblue";
    document.getElementById("intcontainer").childNodes[0].style.color =
      "dodgerblue";

    setTimeout(function() {
      // variables for easy getElementing
      var firstInt = document.getElementById("intcontainer").childNodes[0];
      var timer = document.getElementById("timer");

      //Return timer and interval back to normal looks
      timer.style.color = "#eee";
      firstInt.style.color = "#ff9104";

      // Dissect the current interval to retrieve hours, minutes, and seconds.
      var setseconds = firstInt.innerHTML.slice(-2);
      firstInt = firstInt.innerHTML.substring(0, firstInt.innerHTML.length - 3);
      var setminutes = firstInt.slice(-2);
      firstInt = firstInt.substring(0, firstInt.length - 3);
      var sethours = firstInt;

      // Convert all time values into miliseconds
      var countdown =
        new Date().getTime() +
        sethours * 1000 * 60 * 60 +
        setminutes * 1000 * 60 +
        setseconds * 1000;

      // Update the time set every 1/5 of a second. This guarentees excellent accuracy.
      window.x = setInterval(startcount, 200);

      function startcount() {
        // Set distance. Distance = time it takes to count to zero.
        var distance = countdown - new Date().getTime();
        // I'm using date.getTime, as opposed to simply subtracting each second, for accuracy.
        // This stack overflow question convinced me: https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
        // The gist is that even if the browser stalls, the timing will still remain accurate.
        if (window.active == 1) {
          // Time conversions for hours, minutes and seconds
          var hours = Math.floor(distance / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);

          //call a function to update the elapsed time with seconds as a parameter;
          updateElapsed(seconds);

          // Adds zeroes to single digits, again.
          seconds = "0" + seconds;
          if (seconds.length > 2) {
            seconds = seconds.substring(1);
          }
          minutes = "0" + minutes;
          if (minutes.length > 2) {
            minutes = minutes.substring(1);
          }
          hours = "0" + hours;
          if (hours.length > 2) {
            hours = hours.substring(1);
          }

          // Output the result in timer
          timer.innerHTML = hours + ":" + minutes + ":" + seconds;

          // update interval display element continuously
          document.getElementById("intcontainer").childNodes[0].innerHTML =
            hours + ":" + minutes + ":" + seconds;

          // update time left. To do this, we just have to call updateTimeleft
          // since we already changed the interval display, and updateTimeleft calculates time left based on all intervals
          updateTimeleft();

          // Activates when the countdown is over
          if (distance < 0) {
            clearInterval(window.x);
            var audio = document.getElementById("alarmaudio");
            // Set the current time to zero to prevent overlap.
            audio.currentTime = 0;
            //Sound the alarm
            audio.play();
            //Delete both the current interval and the setinterval countdown
            var intcontainer = document.getElementById("intcontainer");
            let loop = 0;
            while (loop < 2) {
              intcontainer.childNodes[0].remove();
              loop++;
            }
            // If there are still more intervals, continue keeping time.
            if (intcontainer.childNodes.length > 0) {
              window.lock = 0;
              begincount();
              // Update time left to account for new interval
              updateTimeleft();
            } else {
              timer.innerHTML = "EXPIRED";
              timer.style.color = "crimson";
              window.active = 0;
              window.lock = 0;
              updateTimeleft();
            }
          }
        } else {
          window.lock = 0;
          clearInterval(window.x);
        }
      }
    }, 500);
  }
}

// Activates when stop button is clicked
function halt() {
  // makes timer inactive and unlocks start button.
  clearInterval(window.x);
  window.active = 0;
  window.lock = 0;
  document.getElementById("alarmaudio").pause();
  document.getElementById("alarmaudio").currentTime = 0;
}

// Activates when clear button is clicked
function haltall() {
  // DESTROY EVERYTHING. (including current interval)
  document.getElementById("timer").style.color = "#eee";
  document.getElementById("timer").innerHTML = "00:00:00";
  var intcontainer = document.getElementById("intcontainer");
  document.getElementById("alarmaudio").pause();
  document.getElementById("alarmaudio").currentTime = 0;
  if (intcontainer.childNodes.length > 0) {
    let loop = 0;
    while (loop < 2) {
      intcontainer.childNodes[0].remove();
      loop++;
    }
    if (intcontainer.childNodes.length != 0) {
      document.getElementById("timer").innerHTML =
        intcontainer.childNodes[0].innerHTML;
    }
  }
  // Update the timeleft to account for missing interval
  updateTimeleft();
  counter = 0;
  clearInterval(window.x);
  window.active = 0;
  window.lock = 0;
}

function updateTimeleft() {
  // The following sets up time left
  // Some easy fetchings
  var intcontainer = document.getElementById("intcontainer").childNodes;
  var tleft = document.getElementById("tleft");
  // If there are no intervals, don't bother doing math
  if (intcontainer.length == 0) {
    tleft.innerHTML = "00:00:00";
  } else {
    // If there are intervals, do math. Var total = total time in seconds
    var total = 0;
    // Dissect ALL values in interval log and add together to get final, total time.
    for (var i = 0; i < intcontainer.length; i += 2) {
      var sec = intcontainer[i].innerHTML.slice(-2);
      var remain = intcontainer[i].innerHTML.substring(
        0,
        intcontainer[i].innerHTML.length - 3
      );
      var min = remain.slice(-2);
      remain = remain.substring(0, remain.length - 3);
      var hrs = remain;
      // Convert all time values into seconds
      var convert =
        parseInt(hrs) * 60 * 60 + parseInt(min) * 60 + parseInt(sec);
      // and continuously add this to total
      total += convert;
    }
    // var total now stores the total time left, in seconds
    // Do some modulus and division to turn total time
    // back into hours, minutes, and seconds format
    var hours = Math.floor(total / (60 * 60));
    var minutes = Math.floor(total / 60) % 60;
    var seconds = total % 60;

    // Adds zeroes to single digits to look clocklike.
    seconds = "0" + seconds;
    if (seconds.length > 2) {
      seconds = seconds.substring(1);
    }
    minutes = "0" + minutes;
    if (minutes.length > 2) {
      minutes = minutes.substring(1);
    }
    hours = "0" + hours;
    if (hours.length > 2) {
      hours = hours.substring(1);
    }
    // Output the result in time left
    tleft.innerHTML = hours + ":" + minutes + ":" + seconds;
  }
}

// This is used exclusively for the next function, but must stay outside.
// Why? Because when updateElapsed is first called, save2's value must not stay constant.
var save2 = 100;
// Updates elapsed time
// continuously checks to see if the seconds change. Sec is the current second.
function updateElapsed(sec) {
  // Save current second
  var save1 = sec;
  // Compare previous second with current second. If same, do nothing.
  // If different, then increment the elapsed timer by 1 and update save 2.
  // Also, if the timer has continued counting pass zero (happens when intevrals change), then we musn't counter++
  if (save1 != save2 && save1 != -1) {
    save2 = save1;
    counter++;
    // use same formula as before to derive the # of hrs, mins, and secs
    var hours = Math.floor(counter / (60 * 60));
    var minutes = Math.floor(counter / 60) % 60;
    var seconds = counter % 60;
    //add some zeros to make it clocky again
    seconds = "0" + seconds;
    if (seconds.length > 2) {
      seconds = seconds.substring(1);
    }
    minutes = "0" + minutes;
    if (minutes.length > 2) {
      minutes = minutes.substring(1);
    }
    hours = "0" + hours;
    if (hours.length > 2) {
      hours = hours.substring(1);
    }
    // Output the result in elapsed time
    document.getElementById("elapsed").innerHTML =
      hours + ":" + minutes + ":" + seconds;
  } else if (save1 == -1) {
    // If timer has passed zero, reset save2 to match save1 in preparation for new int
    save2 = save1;
  }
  // Really confusing, I know... BUT IT WORKS. YAS.
}
