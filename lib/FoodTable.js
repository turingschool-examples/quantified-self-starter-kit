const buildTable = () => {
  let table=$("<table id=foodTable>").appendTo('#food-table')
  addTableBody(table)
}

const addTableBody = (table) => {
  let tbody=$("<tbody>").appendTo(table)
  addTableHeaders(tbody)
}

const addTableHeaders = (tbody) => {
  let headersRow=$("<tr id=headers>").appendTo(tbody)
  let headerName=$("<th>").text("Food Name").appendTo(headersRow)
  addTableRows(headersRow)
}

const addTableRows = (headersRow) => {
  let headerCalories=$("<th>").text("Calories").appendTo(headersRow)
}

module.exports = {
  buildTable
}
