
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const milliSecondsElement = document.getElementById('milliSeconds');
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');
const lapList = document.getElementById('laplist');

// Initialize variables
let minutes = 0;
let seconds = 0;
let milliSeconds = 0;
let intervalId;
let isRunning = false;
let isPaused = false;
let lapCounter = 1;
let elapsedTime = 0;
let pauseTime = 0;

// Add event listeners
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Functions
function startTimer() {
  if (!isRunning) {
    intervalId = setInterval(updateTimer, 10);
    isRunning = true;
    isPaused = false;
  }
}

function stopTimer() {
  clearInterval(intervalId);
  addLap(); // Add the current lap time to the lap lis
  isRunning = false;
}

function pauseTimer() {
  if (isRunning && !isPaused) {
    clearInterval(intervalId);
    pauseTime = Date.now();
    isPaused = true;
  } else if (isPaused) {
    const currentTime = Date.now();
    elapsedTime += currentTime - pauseTime;
    intervalId = setInterval(updateTimer, 10);
    isPaused = false;
  }
}

function resetTimer() {
  stopTimer();
  minutes = 0;
  seconds = 0;
  milliSeconds = 0;
  elapsedTime = 0;
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  milliSecondsElement.textContent = '00';
  lapList.innerHTML = '';
  lapCounter = 1;
}

function updateTimer() {
  const currentTime = Date.now();
  milliSeconds += 10;
  if (milliSeconds >= 1000) {
    seconds++;
    milliSeconds = 0;
  }
  if (seconds >= 60) {
    minutes++;
    seconds = 0;
  }
  minutesElement.textContent = padZero(minutes);
  secondsElement.textContent = padZero(seconds);
  milliSecondsElement.textContent = padZero(milliSeconds / 10);
}

function padZero(value) {
  return (value < 10 ? '0' : '') + value;
}

function addLap() {
  const lapTime = `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliSeconds / 10)}`;
  const lapElement = document.createElement('li');
  lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
  lapList.appendChild(lapElement);
  lapCounter++;
}

// Add lap functionality
startButton.addEventListener('click', function() {
  if (lapCounter > 1) {
    addLap();
  }
});
