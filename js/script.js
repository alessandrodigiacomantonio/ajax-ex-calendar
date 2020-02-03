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
  var monthNumber = parseInt( moment().startOf('years').format('m') );
  var daysInMonth = parseInt( moment().endOf('years').format('D') );
  var monthName = moment().startOf('years').format('MMMM');
  getHolidays(monthNumber, monthName, daysInMonth);
});

function getHolidays(monthNumber, monthName, daysInMonth) {
  $.ajax(
    {
      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month="+monthNumber+"",
      method: "GET",
      success: function(response) {
        // var paolo = response.response[0].date;
        // var giulio = paolo[paolo.length-2]+paolo[paolo.length-1];
        // console.log(paolo, giulio);
        var source = $('#calendar_template').html();
        var calendar = Handlebars.compile(source);
        for (var days = 1; days <= daysInMonth; days++) {
          var day = {
            dayNumber: days+'',
            monthName: monthName,
            holidayName: function() {
              for (var i = 0; i < response.response.length; i++) {
                var dayNumber = response.response[i].date;
                dayNumber = dayNumber[dayNumber.length-2]+dayNumber[dayNumber.length-1];
                var thisDay = days+'';
                if (days<10) thisDay = '0'+thisDay;
                if ( dayNumber == thisDay ) return response.response[i].name;
              }
            },
          };
          var html = calendar(day);
          $('#calendar').append(html);
        };
          $('.day').each(
            function() {
              if ( $(this).attr('data-holiday') != 0 ) $(this).addClass('holiday');
            }
          )
      },
      error: function(request, stats, errors) {
        alert('Mhè');
      },
    }
  );
}
