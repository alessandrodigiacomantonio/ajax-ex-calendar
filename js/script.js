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
  var daysInMonth = parseInt( moment().startOf('years').format('D') );
  var monthName = moment().startOf('years').format('MMMM');
  getHolidays(monthNumber);
  var luca = moment().format('YYYY-MM-DD');
  console.log(luca);
});

function getHolidays(monthNumber,daysInMonth) {
  $.ajax(
    {
      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month="+monthNumber+"",
      method: "GET",
      success: function(response) {
        console.log(response.response[0].date);
        for (var days = 1; days <= daysInMonth; days++) {

        }
        for (var i = 0; i < response.response.length; i++) {

        }
      },
      error: function(request, stats, errors) {

      }
    }
  )
}
