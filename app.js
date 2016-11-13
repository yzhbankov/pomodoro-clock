/**
 * Created by Iaroslav Zhbankov on 11.11.2016.
 */
var taskTime = document.querySelector(".task-time");
var breakTime = document.querySelector(".break-time");
var clockTime = document.querySelector(".clock-time");
var taskPlus = document.querySelector(".task-plus");
var taskMinus = document.querySelector(".task-minus");
var breakPlus = document.querySelector(".break-plus");
var breakMinus = document.querySelector(".break-minus");
var taskBar = document.querySelector(".inner-bar");
var switcher = 1;
var timeOfBreak = false;


function tPlus() {
    var minuts;
    if (taskTime.innerText.slice(2, 3) == ":") {
        minuts = Number(taskTime.innerText.slice(0, 2)) + 1;
    } else {
        minuts = Number(taskTime.innerText.slice(0, 1)) + 1;
    }
    taskTime.innerText = minuts + ":00";
    clockTime.innerText = minuts + ":00";
}

function tMinus() {
    var minuts = 0;
    if (taskTime.innerText.slice(2, 3) == ":") {
        minuts = Number(taskTime.innerText.slice(0, 2)) - 1;
    } else if (Number(taskTime.innerText.slice(0, 1)) >= 1) {
        minuts = Number(taskTime.innerText.slice(0, 1)) - 1;
    }
    taskTime.innerText = minuts + ":00";
    clockTime.innerText = minuts + ":00";
}

function bPlus() {
    var minuts;
    if (breakTime.innerText.slice(2, 3) == ":") {
        minuts = Number(breakTime.innerText.slice(0, 2)) + 1;
    } else {
        minuts = Number(breakTime.innerText.slice(0, 1)) + 1;
    }
    breakTime.innerText = minuts + ":00";
}

function bMinus() {
    var minuts = 0;
    if (breakTime.innerText.slice(2, 3) == ":") {
        minuts = Number(breakTime.innerText.slice(0, 2)) - 1;
    } else if (Number(breakTime.innerText.slice(0, 1)) >= 1) {
        minuts = Number(breakTime.innerText.slice(0, 1)) - 1;
    }
    breakTime.innerText = minuts + ":00";
}

taskPlus.addEventListener("click", tPlus);
taskMinus.addEventListener("click", tMinus);
breakPlus.addEventListener("click", bPlus);
breakMinus.addEventListener("click", bMinus);

function time(time) {
    var arr = [];
    if (time.length == 5) {
        arr.push(time.slice(0, 2));
        arr.push(time.slice(3, 5));
    } else {
        arr.push(time.slice(0, 1));
        arr.push(time.slice(2, 4));
    }
    return arr;
}

function timer(duration) {
    var minuts = Number(time(duration)[0]);
    var seconds = Number(time(duration)[1]);
    taskPlus.removeEventListener("click", tPlus);
    taskMinus.removeEventListener("click", tMinus);
    breakPlus.removeEventListener("click", bPlus);
    breakMinus.removeEventListener("click", bMinus);
    var timerId = setInterval(function () {
        if (switcher % 2 != 0) {
            clearInterval(timerId);
            taskPlus.addEventListener("click", tPlus);
            taskMinus.addEventListener("click", tMinus);
            breakPlus.addEventListener("click", bPlus);
            breakMinus.addEventListener("click", bMinus);
        } else if ((minuts == 0) && (seconds == 0)) {
            clearInterval(timerId);
            timeOfBreak = !timeOfBreak;
            if (!timeOfBreak) {
                var inTime = time(taskTime.innerText);
                timer(taskTime.innerText);
            } else {
                timer(breakTime.innerText);
                var inTime = time(breakTime.innerText);
            }
        }
        else {
            if (seconds == 0) {
                minuts--;
                seconds = 59;
            } else {
                seconds--;
            }
            if (seconds / 10 < 1) {
                clockTime.innerText = minuts + ":0" + seconds;
            } else {
                clockTime.innerText = minuts + ":" + seconds;
            }
            if (!timeOfBreak) {
                var inTime = time(taskTime.innerText);
                var color = "green";
            } else {
                var inTime = time(breakTime.innerText);
                var color = "red";
            }
            var curTime = time(clockTime.innerText);

            progressBar(inTime, curTime, color);
        }
    }, 1000);

    if (switcher % 2 != 0) {
        clearInterval(timerId);
    }
}

clockTime.addEventListener("click", function () {
    switcher++;
    timer(clockTime.innerText);
});

function progressBar(initTime, currentTime, color) {
    var x = Number(currentTime[0]) * 60 + Number(currentTime[1]);
    var y = Number(initTime[0]) * 60 + Number(initTime[1]);
    var str = "width: " + ((y - x) / y) * 100 + "%;" + "background-color:" + color + ";";
    taskBar.setAttribute("style", str);
}
