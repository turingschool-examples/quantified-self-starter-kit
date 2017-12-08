var $ = require('jquery')
var ajaxReq = require('../AJAX-requests/meals')
var response = require('../response-handlers/meals')

var deleteListener = function () {
  $('tbody').on('click', function () {
    if ($(event.target).hasClass('delete-button')) {
      ajaxReq.deleteFood()
    }
  })
}

var searchListeners = function() {
  $("#search").keyup(function() {
    response.searchTable($(this).val());
  });
}


var filterCalories = function filterCalories() {
  $('#sort-calorie').on('click', function() {
    var columnIndex = $(this).prevAll().length,
        tableBody   = $(this).closest("table").find("tbody"),
        tableRows   = tableBody.find("tr"),
        classAttr   = $(this).attr("class"),
        typeofClass = { 0: "ascending", 1: "descending", 2: "original" },
        ascendOrDecend;


    function addOrRemoveClass(typeofClass, context) {
      if ($(context).hasClass(typeofClass[0])) {
        $(context).removeClass(typeofClass[0]).addClass(typeofClass[1]);
        ascendOrDecend = classAttr
      } else if ($(context).hasClass(typeofClass[1])) {
        $(context).removeClass(typeofClass[1]).addClass(typeofClass[2]);
        ascendOrDecend = classAttr
      } else if ($(context).hasClass(typeofClass[2])) {
        $(context).removeClass(typeofClass[2]).addClass(typeofClass[0]);
        ascendOrDecend = classAttr
      }
    }

    addOrRemoveClass(typeofClass, this);

    function appendToTable(tableRows) {
      $.each(tableRows, function(index, element) {
        tableBody.append(element);
      });
    }

    function sortTable() {
      if (ascendOrDecend == typeofClass[2]) {
        $('.meal-table-body').empty();
        ajaxReq.populateFoods()
      } else {
        tableRows.sort(function(a,b) {
          var tda = $(a).find("td").eq(columnIndex).text();
          var tdb = $(b).find("td").eq(columnIndex).text();
          if (ascendOrDecend == typeofClass[0]) {
            if(!isNaN(tda) && !isNaN(tdb)) return parseInt(tda) - parseInt(tdb);
            return tda > tdb ? 1 : tda < tdb ? -1 : 0;
          } else if (ascendOrDecend == typeofClass[1]) {
            if(!isNaN(tda) && !isNaN(tdb)) return parseInt(tdb) - parseInt(tda);
            return tda < tdb ? 1 : tda > tdb ? -1 : 0;
          }
        });
        appendToTable(tableRows);
      }
    }
    sortTable();
  });
}


module.exports = {
  deleteListener,
  searchListeners,
  filterCalories
}
