// ↓ corpo principale dello script ↓
$(document).ready(function() {

  // ↓ settate date in italiano ↓
  moment.updateLocale('it', {
    months : [
        "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio",
        "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ],
    weekdays : [
        "Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"
    ],
  });
  // ↑ settate date in italiano ↑

  // ↓ variabili globali e stampa calendario di default ↓
  var initialDate = moment([2018, 0, 1]);
  var date = initialDate;
  var alertShowed = false;
  getHolidays( date.format('M'), date.format('MMMM'), date.daysInMonth(), date.format('YYYY') );
  // ↑ variabili globali e stampa calendario di default ↑

  // ↓ funzioni onClick ↓
  $('.past_month').on('click', function(){
    getPastCalendarMonth(date);
  });

  $('.next_month').on('click', function() {
    getNextCalendarMonth(date);
  });
  // ↑ funzioni onClick ↑

  // ↓ funzioni onKeydown ↓
  $('body').on('keydown',
  function(event) {
    if (event.keyCode == 37) {
      event.preventDefault();
      getPastCalendarMonth(date, alertShowed);
    }
    if (event.keyCode == 38) {
      event.preventDefault();
      getNextCalendarYear(date, alertShowed);
      alertShowed = true;
    }
    if (event.keyCode == 39) {
      event.preventDefault();
      getNextCalendarMonth(date, alertShowed);
    }
    if (event.keyCode == 40) {
      event.preventDefault();
      getPastCalendarYear(date, alertShowed);
      alertShowed = true;
    }
  });
  // ↑ funzioni onKeydown ↑

});
// ↑ corpo principale dello script ↑

// ↓ elenco funzioni ↓
function getHolidays( monthNumber, monthName, daysInMonth, year ) {
  $('.month_and_year').text(monthName + year);
  $.ajax(
    {
      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month="+(monthNumber-1),
      method: "GET",
      success: function(response) {
        var source = $('#calendar_template').html();
        var calendar = Handlebars.compile(source);
        for (var days = 1; days <= daysInMonth; days++) {
          var day = {
            dayNumber: days+'',
            monthName: monthName,
            holidayName: holidayName(response.response, days),
          }
          var html = calendar(day);
          $('#calendar').append(html);
        };
        $('.day').each(
          function() {
            if ( $(this).attr('data-holiday') != 0 ) $(this).addClass('holiday');
          }
        );
      },
      error: function(request, stats, errors) {
        alert('Mhè'+errors);
      },
    }
  );
}

function holidayName(response, days) {
  for ( var i = 0; i < response.length; i++ ) {
    var dayNumber = response[i].date;
    dayNumber = dayNumber[dayNumber.length-2]+dayNumber[dayNumber.length-1];
    var thisDay = days+'';
    if ( days < 10 ) thisDay = '0'+thisDay;
    if ( dayNumber == thisDay ) return response[i].name;
  }
}

function getCalendarMonth( monthNumber, monthName, daysInMonth, year ) {
  var source = $('#calendar_template').html();
  var calendar = Handlebars.compile(source);
  $('.month_and_year').text(monthName + year);
  for (var days = 1; days <= daysInMonth; days++) {
    var day = {
      dayNumber: days+'',
      monthName: monthName,
    }
    var html = calendar(day);
    $('#calendar').append(html);
  }
}

function getPastCalendarMonth(date, alertShowed) {
  date.subtract(1, 'months');
  $('.day').remove();
  if (date.format('YYYY') == '2018') {
  getHolidays( date.format('M'), date.format('MMMM'), date.daysInMonth(), date.format('YYYY'))
  } else {
    getCalendarMonth( date.format('M'), date.format('MMMM'), date.daysInMonth(), date.format('YYYY') )
    if ( !alertShowed ) {
      alert('Per annate diverse dalla 2018, non è possibile stabilire festività');
    }
  }
}

function getNextCalendarMonth(date, alertShowed) {
  date.add(1,'months');
  $('.day').remove();
  if (date.format('YYYY') == '2018') {
  getHolidays( date.format('M'), date.format('MMMM'), date.daysInMonth(), date.format('YYYY') )
  } else {
    getCalendarMonth( date.format('M'), date.format('MMMM'), date.daysInMonth(), date.format('YYYY') )
    if ( !alertShowed ) {
      alert('Per annate diverse dalla 2018, non è possibile stabilire festività');
    }
  }
}

function getNextCalendarYear(date, alertShowed) {
  date.add(1,'years');
  $('.day').remove();
  if (date.format('YYYY') == '2018') {
  getHolidays( date.format('M'), date.format('MMMM'), date.daysInMonth(), date.format('YYYY') )
  } else {
    getCalendarMonth( date.format('M'), date.format('MMMM'), date.daysInMonth(), date.format('YYYY') )
    if ( !alertShowed ) {
      alert('Per annate diverse dalla 2018, non è possibile stabilire festività');
    }
  }
}

function getPastCalendarYear(date, alertShowed) {
  console.log("in pastCalendarYear: ",alertShowed);
  date.subtract(1,'years');
  $('.day').remove();
  if (date.format('YYYY') == '2018') {
  getHolidays( date.format('M'), date.format('MMMM'), date.daysInMonth(), date.format('YYYY') )
      } else {
    getCalendarMonth( date.format('M'), date.format('MMMM'), date.daysInMonth(), date.format('YYYY') )
    if ( !alertShowed ) {
      alert('Per annate diverse dalla 2018, non è possibile stabilire festività');
    }
  }
}

function alertShowed(booleanValue) {
  if (booleanValue == false) return true;
}

// ↑ elenco funzioni ↑
