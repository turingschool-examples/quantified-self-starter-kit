
const sortFoodsDesc = () => {
let $tbody = $('tbody');
$tbody.find('.list').sort(function(a,b){
    let tda = $(a).find('td:eq(1)').text();
    let tdb = $(b).find('td:eq(1)').text();
    return tda < tdb ? 1
           : tda > tdb ? -1
           : 0;
}).appendTo($tbody)
}

const sortFoodsAsc = () => {
let $tbody = $('tbody');
$tbody.find('.list').sort(function(a,b){
    let tda = $(a).find('td:eq(1)').text();
    let tdb = $(b).find('td:eq(1)').text();
    return tda < tdb ? -1
           : tda > tdb ? 1
           : 0;
}).appendTo($tbody)
}

const filter = (element) => {
  let inputValue = $(element).val().toLowerCase();
  let tableRows = $("#foodTable").find("tr.list")
  tableRows.hide();
  tableRows.each(function (index) {
    let $currentData = $(this).text();
    let $lower = $currentData.toLowerCase();
    if ($lower.indexOf(inputValue) > -1) {
      $(this).show()
      return true;
    }
  });
  return false;
}

module.exports = {sortFoodsDesc, sortFoodsAsc, filter}
