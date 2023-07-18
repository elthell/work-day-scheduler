// jquery wrap to only run code after page is rendered
$(function () {
  // save button to save to local storage
  let saveBtn = $(".saveBtn");
  saveBtn.on("click", function () {
    // 'this' is the same button, get the parent id referring to hour
    let thisHour = $(this).parent("div").attr("id");
    // get sibling text area value
    let thisHourText = $(this).siblings("textarea").val();
    // localstorage key is hour id that can be called on later
    localStorage.setItem(thisHour, thisHourText);
  });

  // apply past / present / future depending on current time
  let allTimes = $(".container-lg").children();
  // map array of all time-block ids
  let timeBlockList = $(".time-block").map(function () {
    return $(this).attr("id");
  });
  // current hour
  let currentHour = dayjs().hour();
  // reformat to look like time-block ids
  let hourLabel = "hour-" + currentHour;
  // number value of where hourLabel falls in time-block id array
  let timeBlock = $.inArray(hourLabel, timeBlockList);
  // calls on time-block of that number
  let currentTimeBlock = allTimes.eq(timeBlock);

  // set colors
  if (currentHour < 9) {
    allTimes.addClass("future");
  } else if (currentHour >= 9 && currentHour <= 17) {
    // asign past / present / future based on time-block of current number
    currentTimeBlock.prevAll().addClass("past");
    currentTimeBlock.addClass("present");
    currentTimeBlock.nextAll().addClass("future");
  } else {
    allTimes.addClass("past");
  }

  // for loop using above timeBlockList var to get the ids off all time-blocks
  // and get the text saved to each one to display there
  for (var i = 0; i < timeBlockList.length; i++) {
    let userBlock = timeBlockList[i];
    let savedText = localStorage.getItem(userBlock);
    $("#" + userBlock + " > textarea").val(savedText);
  }

  // current date in header
  let today = setInterval(function () {
    $("#currentDay").text(dayjs().format("MMM D YYYY, hh:mm:ss a"));
  }, 1000);
});
