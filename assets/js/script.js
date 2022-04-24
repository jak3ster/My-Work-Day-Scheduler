//
// ## Your Task
// Create a simple calendar application that allows a user to save events for 
// each hour of the day by modifying starter code. This app will run in the 
// browser and feature dynamically updated HTML and CSS powered by jQuery.

// You'll need to use the [Moment.js](https://momentjs.com/) library to work with date and time. 
// Be sure to read the documentation carefully and concentrate on using Moment.js in the browser.
//

//
// ## Acceptance Criteria
//

// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future
// WHEN I click into a timeblock
// THEN I can enter an event
// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

// VARIABLES

// FUNCTIONS

// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
var dateNow = moment().format("dddd MMMM Do YYYY");
$("#currentDay").text(dateNow);

// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours
// WHEN I view the timeblocks for that day
var workHours = ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM']
var template = "";
workHours.forEach(function(time, i) {
    let id = i + 9;
    template += `
    <div class="row time-block" id="${id}">
        <div class="col-1 hour pt-2">${time}</div>
        <textarea class="col-10 plan"></textarea>
        <button class="col-1 saveBtn"><i class="fas fa-save"></i></button>
    </div>`
});
$(".container").html(template);

// THEN each timeblock is color coded to indicate whether it is in the past, present, or future
function timeBlockColor() {
    let hour = moment().hours();
    let timeBlock = $(".time-block"); 
    for(let i = 0; i < timeBlock.length; i++) {
        var currHour = parseInt($(timeBlock[i]).attr("id")) - 10; 
        console.log(currHour);
        if (currHour > hour) {
            $(timeBlock[i]).addClass("future");
        } else if (currHour === hour) {
            $(timeBlock[i]).addClass("present");
        } else {
            $(timeBlock[i]).addClass("past");
        }
    }
}

// WHEN I click into a timeblock
// THEN I can enter an event
// WHEN I click the save button for that timeblock
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var time = $(this).siblings(".hour").text();
    var plan = $(this).siblings(".plan").val();

    // THEN the text for that event is saved in local storage
    storeData(time, plan);
});

// WHEN I refresh the page
// THEN the saved events persist
function usePlanner() {
    $(".hour").each(function () {
        var currHour = $(this).text();
        var currPlan = readData(currHour);

        if (currPlan !== null) {
            $(this).siblings(".plan").val(currPlan);
        }
    });
}

// LOCAL STORAGE FUNCTIONS
function storeData(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}
function readData(key){
    return JSON.parse(localStorage.getItem(key)); 
}

// CALL FUNCTIONS
timeBlockColor();
usePlanner();