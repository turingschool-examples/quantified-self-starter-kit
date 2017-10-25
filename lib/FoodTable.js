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
  let headerCalories=$("<th>").text("Calories").appendTo(headersRow)
}

const addFoodRow = (food) => {
  let $tableBody = $("#foodTable").find('tbody')
  let eachFoodRow = $tableBody.append($(`<tr id=${food.id} class=list>`))
  appendTableData(eachFoodRow, food)
}

const appendTableData = (eachFoodRow, food) => {
  let dataName = $(`<td class=edit-name contenteditable=true>${food.name}</td>`)
  let dataCalories = $(`<td class=edit-calories contenteditable=true>${food.calories}</td>`)
  let deleteFood = $(`<td class=delete-row><input class=delete-food type=button name=delete-food id=${food.id} value=delete </td>`)
  eachFoodRow.append(dataName).append(dataCalories).append(deleteFood)
}

const addFoodData = (foods) => {
  foods.forEach(function(food){
    addFoodRow(food)
  })
}

module.exports = {
  buildTable,
  addFoodData
}
