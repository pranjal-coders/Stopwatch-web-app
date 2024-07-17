let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;
let lapTimes = [];

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        document.getElementById('startStop').textContent = 'Stop';
        document.getElementById('lap').disabled = false;
        document.getElementById('reset').disabled = false;
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime = difference;
        document.getElementById('startStop').textContent = 'Start';
        document.getElementById('lap').disabled = true;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    document.getElementById('time').textContent = '00:00:00';
    document.getElementById('startStop').textContent = 'Start';
    document.getElementById('lap').disabled = true;
    document.getElementById('reset').disabled = true;
    lapTimes = [];
    document.getElementById('laps').innerHTML = '';
}

function lap() {
    if (running) {
        let lapTime = new Date().getTime() - startTime + (savedTime || 0);
        lapTimes.push(lapTime);
        let li = document.createElement('li');
        li.textContent = formatTime(lapTime);
        document.getElementById('laps').appendChild(li);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
        difference =  updatedTime - startTime;
    }
    document.getElementById('time').textContent = formatTime(difference);
}

function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10),
        seconds = Math.floor((time / 1000) % 60),
        minutes = Math.floor((time / (1000 * 60)) % 60),
        hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    hours = (hours < 10) ? "0" + hours : hours;
    return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);