$(document).ready(function() {

  moment.updateLocale('it', {
    months : [
        "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio",
        "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ],
    weekdays : [
        "Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"
    ],
  });
  var initialDate = moment([2018, 0, 31]);
  var date = initialDate;
  getHolidays( date.format('M'), date.format('MMMM'), parseInt(date.format('D')) );

  $('.indietro').on('click',
  function(){
      date.subtract(1,'months');
      if (date.format('YYYY') == '2018') {
      $('.day').remove();
      getHolidays( date.format('M'), date.format('MMMM'), parseInt(date.format('D')) )
    } else {
      date.add(1,'months')
      alert('Mhé');
    }
  });
  $('.avanti').on('click',
  function() {
      date.add(1,'months');
      if (date.format('YYYY') == '2018') {
      $('.day').remove();
      getHolidays( date.format('M'), date.format('MMMM'), parseInt(date.format('D')) )
    } else {
        date.subtract(1,'months')
        alert('Mhé');
      }
  });

});

function getHolidays( monthNumber, monthName, daysInMonth ) {
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
            holidayName: holidayName(response.response,days),
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

function holidayName(response,days) {
  for ( var i = 0; i < response.length; i++ ) {
    var dayNumber = response[i].date;
    dayNumber = dayNumber[dayNumber.length-2]+dayNumber[dayNumber.length-1];
    var thisDay = days+'';
    if ( days < 10 ) thisDay = '0'+thisDay;
    if ( dayNumber == thisDay ) return response[i].name;
  }
}
