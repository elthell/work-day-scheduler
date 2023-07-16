// jquery wrap to only run code after page is rendered
$(function () {
  // save button to save to local storage
  let saveBtn = $(".saveBtn");
  saveBtn.on("click", function () {
    let thisHour = $(this).parent("div").attr("id");
    let thisHourText = $(this).siblings("textarea").val();
    localStorage.setItem(thisHour, thisHourText);
    //to return current text context --> console.log(localStorage.getItem(thisHour));
    //to return text content of specific id --> console.log(localStorage.getItem("hour-10"))
  });

  // apply past / present / future depending on current time
  let allTimes = $(".container-lg").children();
  // map array of all time-block ids
  let timeBlockList = $(".time-block").map(function() {
    return $(this).attr("id");
  });
  // current hour
  let currentHour = dayjs().hour();
  // reformat to look like time-block ids
  let hourLabel = "hour-" + currentHour;
  if (currentHour < 9) {
    allTimes.addClass("future")
  } else if (currentHour >= 9 && currentHour <= 17) {
    // number value of where hourLabel is time-block id array
    let timeBlock = $.inArray(hourLabel, timeBlockList)
    // calls on time-block of that number
    let currentTimeBlock = allTimes.eq(timeBlock)
    // asign past / present / future based on that
    currentTimeBlock.prevAll().addClass("past");
    currentTimeBlock.addClass("present");
    currentTimeBlock.nextAll().addClass("future");
  } else {
    allTimes.addClass("past")
  };
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // current date in header
  let today = setInterval(function () {
    $("#currentDay").text(dayjs().format("MMM D YYYY, hh:mm:ss a"));
  }, 1000);
});
