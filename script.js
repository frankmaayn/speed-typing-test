const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var originText = document.querySelector("#origin-text p").innerHTML;
var textEntered,
  textAnswer,
  textLength,
  timeStamp,
  timerInterval,
  minutes = 0,
  second = 0,
  hundredths = 0,
  thousandths = 6000,
  start = false;

// test bank
var testBank = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est",
  "The basic technique stands in contrast to hunt and peck typing in which the typist keeps his or her eyes on the source copy at all times. Touch typing also involves the use of the home row method, where typists keep their wrists up, rather than resting them on a desk or keyboard (which can cause carpal tunnel syndrome). To avoid this, typists should sit up tall, leaning slightly forward from the waist, place their feet flat on the floor in front of them with one foot slightly in front of the other, and keep their elbows close to their sides with forearms slanted slightly upward to the keyboard; fingers should be curved slightly and rest on the home row.",
  "Historically, the fundamental role of pharmacists as a healthcare practitioner was to check and distribute drugs to doctors for medication that had been prescribed to patients. In more modern times, pharmacists advise patients and health care providers on the selection, dosages, interactions, and side effects of medications, and act as a learned intermediary between a prescriber and a patient. Pharmacists monitor the health and progress of patients to ensure the safe and effective use of medication. Pharmacists may practice compounding; however, many medicines are now produced by pharmaceutical companies in a standard dosage and drug delivery form. In some jurisdictions, pharmacists have prescriptive authority to either independently prescribe under their own authority or in collaboration with a primary care physician through an agreed upon protocol.",
  "One morning my friend and I were thinking about how we could plan our summer break away from school. Driving from our own state to several nearby states would help to expand our limited funds. Inviting six other friends to accompany us would lower our car expenses. Stopping at certain sites would also help us stretch our truly limited travel budget. Yesterday I engaged in an interesting and enlightening discussion about finances. I found it difficult to imagine that during my lifetime I might well earn at least one-half million dollars. It is also possible that I might spend as much as one-half million during the same period. The really difficult thing for me to do will be to save more of the half-million than I spend. Thinking about today's high cost of living makes this seem an impossible task for most. Last week I asked a friend to talk with me and a girl-friend about college. Our friend is the Dean of Women at a nearby college. The Dean and her staff spend much of their time talking to students who plan to go to college. The first thing she said was to work very hard each day in high school. Good grades are most important for being accepted. Being on time for classes and having a good view toward all phases of the school life are two other things to remember.",
  "Trying to make a wise, good choice when thinking about what kinds of careers might be best for you is a hard thing to do. Your future may very well depend on the ways you go about finding the best job openings for you in the world of work. Some people will feel that there is one and only one job in the world for them. Hard thinking and a lot of hard work will help them find the one job that is best for them. Jobs are there for those with skills and a good work ethic. Many new young artists in the upper New England states are famous around the world as leaders in new American art. These fine artists are very good in their chosen fields and are willing to share their many talents by teaching others. The students have had the chance to learn and use skills in oil painting, sketching with chalk, sculpting, and weaving. Learning to typewrite is a skill that will help all of us in our work today. The development of the computer will open doors for people with the keyboarding skills and will make typing a necessity. Managers, as well as secretaries, will need skill at the keyboard to input data and process words. Therefore, good keyboarding skills may be important to you.",
  "You may use glitch or any editor that you prefer. For this project you will not need the JQuery library. If you feel the need to use it we can discuss in class. You may edit the structure of the provided HTML and CSS to better fit your preferred style. You may use lecture slides and the past hw's for sample code but make sure to make it your own. The purpose of this project is to make sure you have an understanding of JavaScript objects, functions, click events, event listeners, and changing DOM elements."
];

//Choose a random text from the testBank
function randomText() {
  let max = 6;
  return testBank[Math.floor(Math.random() * Math.floor(max))];
}

// Add leading zero to numbers 9 or below (purely for aesthetics):
function checkZero(timer) {
  if (timer <= 9) {
    timer = "0" + timer;
  }
  return timer;
}

// Run a standard minute/second/hundredths timer:
function stopwatch() {
  timeStamp =
    checkZero(minutes) + ":" + checkZero(second) + ":" + checkZero(hundredths);
  theTimer.innerHTML = timeStamp;

  //Decrease the time
  thousandths--;
  minutes = Math.floor(thousandths / 100 / 60);
  second = Math.floor(thousandths / 100 - minutes * 60);
  hundredths = Math.floor(thousandths - second * 100 - minutes * 6000);

  //When the time runs out, display the result
  if (minutes == 0 && second == 0 && hundredths == 0) {
    timeStamp =
      checkZero(minutes) +
      ":" +
      checkZero(second) +
      ":" +
      checkZero(hundredths);
    theTimer.innerHTML = timeStamp;
    clearInterval(timerInterval);
  }
}

//formula is based of this website: https://www.speedtypingonline.com/typing-equations
function wordPerMinute() {
  let WPM;
  let characters = testArea.value.split("");

  WPM = Math.floor(characters.length / 5 / 1);

  return WPM;
}

// Match the text entered with the provided text on the page:
function matchText() {
  let i;
  let error = 0;
  let resultWPM;
  textAnswer = originText.split(" "); // splits the content using a space as delimiter
  //console.log(textAnswer); //testing purposes
  textEntered = testArea.value.split(" "); //splits the users content using a space as delimiter
  //console.log(textEntered); //testing purposes

  //check how many incorrect WORDS were typed & how many words per minute
  for (i = 0; i < textEntered.length; i++) {
    if (textEntered[i] !== textAnswer[i]) {
      console.log("Entered: " + textEntered[i]); //testing purposes
      console.log("Correct: " + textAnswer[i]); //testing purposes
      error++;
    }
  }

  resultWPM = wordPerMinute();
  //console.log("WPM:" + resultWPM + "\n" + "Error:" + error);
  document.querySelector("#origin-text p").innerHTML =
    "Words Per Minute: " + resultWPM + "\nError: " + error;
}

// Start the timer:
function startTime() {
  textLength = testArea.value.length;
  if (textLength == 0 && !start) {
    start = true;
    timerInterval = setInterval(stopwatch, 10);
  }
}

// Reset everything:
function resetProgram() {
  clearInterval(timerInterval);
  theTimer.innerHTML = "01:00:00";
  testArea.value = "";
  timerInterval = null;
  start = false;
  minutes = 0;
  second = 0;
  hundredths = 0;
  thousandths = 6000;
  document.querySelector("#origin-text p").innerHTML = randomText();
  originText = document.querySelector("#origin-text p").innerHTML;
}

// Event listeners for keyboard input and the reset button:
resetButton.addEventListener("click", resetProgram);
testArea.addEventListener("keydown", startTime);
