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
    var minus;
    if (typeof Number(taskTime.innerText.slice(0, 2)) == "number") {
        minuts = Number(taskTime.innerText.slice(0, 2)) + 1;
    } else {
        minuts = Number(taskTime.innerText.slice(0, 1)) + 1;
    }
    taskTime.innerText = minuts + ":00";
    clockTime.innerText = minuts + ":00";
});
taskMinus.addEventListener("click", function () {
    var minus;
    if (typeof Number(taskTime.innerText.slice(0, 2)) == "number") {
        minuts = Number(taskTime.innerText.slice(0, 2)) - 1;
    } else if (Number(taskTime.innerText.slice(0, 1)) >= 1) {
        minuts = Number(taskTime.innerText.slice(0, 1)) - 1;
    }
    taskTime.innerText = minuts + ":00";
    clockTime.innerText = minuts + ":00";
});
breakPlus.addEventListener("click", function () {
    var minuts;
    if (typeof Number(breakTime.innerText.slice(0, 2)) == "number") {
        minuts = Number(breakTime.innerText.slice(0, 2)) + 1;
    } else {
        minuts = Number(breakTime.innerText.slice(0, 1)) + 1;
    }
    breakTime.innerText = minuts + ":00";
});
breakMinus.addEventListener("click", function () {
    if (Number(breakTime.innerText.slice(0, 1)) >= 1) {
        var minuts = Number(breakTime.innerText.slice(0, 1)) - 1;
        breakTime.innerText = minuts + ":00";
    }
    if (typeof Number(breakTime.innerText.slice(0, 2)) == "number") {
        var minuts = Number(breakTime.innerText.slice(0, 2)) - 1;
        breakTime.innerText = minuts + ":00";
    }
});