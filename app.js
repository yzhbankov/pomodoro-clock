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

taskPlus.addEventListener("click", function () {
    var minuts;
    if (taskTime.innerText.slice(2, 3) == ":") {
        minuts = Number(taskTime.innerText.slice(0, 2)) + 1;
    } else {
        minuts = Number(taskTime.innerText.slice(0, 1)) + 1;
    }
    taskTime.innerText = minuts + ":00";
    clockTime.innerText = minuts + ":00";
});
taskMinus.addEventListener("click", function () {
    var minuts = 0;
    if (taskTime.innerText.slice(2, 3) == ":") {
        minuts = Number(taskTime.innerText.slice(0, 2)) - 1;
    } else if (Number(taskTime.innerText.slice(0, 1)) >= 1) {
        minuts = Number(taskTime.innerText.slice(0, 1)) - 1;
    }
    taskTime.innerText = minuts + ":00";
    clockTime.innerText = minuts + ":00";
});
breakPlus.addEventListener("click", function () {
    var minuts;
    if (breakTime.innerText.slice(2, 3) == ":") {
        minuts = Number(breakTime.innerText.slice(0, 2)) + 1;
    } else {
        minuts = Number(breakTime.innerText.slice(0, 1)) + 1;
    }
    breakTime.innerText = minuts + ":00";
});
breakMinus.addEventListener("click", function () {
    var minuts = 0;
    if (breakTime.innerText.slice(2, 3) == ":") {
        minuts = Number(breakTime.innerText.slice(0, 2)) - 1;
    } else if (Number(breakTime.innerText.slice(0, 1)) >= 1) {
        minuts = Number(breakTime.innerText.slice(0, 1)) - 1;
    }
    breakTime.innerText = minuts + ":00";
});
var switcher = 1;
var timeOfBreak = false;

clockTime.addEventListener("click", function () {
    switcher++;

    timer(clockTime.innerText);
    /*    var minuts = Number(time(clockTime.innerText)[0]);
     var seconds = Number(time(clockTime.innerText)[1]);
     var timerId = setInterval(function () {
     if (((minuts == 0) && (seconds == 0)) || (switcher % 2 != 0)) {
     clearInterval(timerId);
     } else {
     if (seconds == 0) {
     minuts--;
     seconds = 59;
     } else {
     seconds--;
     }
     clockTime.innerText = minuts + ":" + seconds;
     }
     }, 1000);*/
});

function time(time) {
    var arr = [];
    if (time.length == 5) {
        var minuts = time.slice(0, 2);
        var seconds = time.slice(3, 5);
    } else {
        var minuts = time.slice(0, 1);
        var seconds = time.slice(2, 4);
    }
    arr.push(minuts);
    arr.push(seconds);
    return arr;
}


function timer(duration) {

    var minuts = Number(time(duration)[0]);
    var seconds = Number(time(duration)[1]);
    var timerId = setInterval(function () {
        if (switcher % 2 != 0) {
            clearInterval(timerId);
        } else if ((minuts == 0) && (seconds == 0)) {
            clearInterval(timerId);
            timeOfBreak = !timeOfBreak;
            if (!timeOfBreak) {
                clockTime.innerText = taskTime.innerText;
            } else {
                clockTime.innerText = breakTime.innerText;
            }
            timer(clockTime.innerText);
        }
        else {
            if (seconds == 0) {
                minuts--;
                seconds = 59;
            } else {
                seconds--;
            }
            clockTime.innerText = minuts + ":" + seconds;
        }
    }, 1000);

    if (switcher % 2 != 0) {
        clearInterval(timerId);
        console.log(switcher);
    }
}
