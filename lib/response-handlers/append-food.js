const $ = require('jquery')

export { appendFood }

function appendFood(foodObject) {
  let name = foodObject.name
  let id = foodObject.id
  $("#list").append(`<tr id=${id}> <td>${name}</td> <td>${foodObject.calories}</td> <td><img src="src/delete.svg" class="delete_button" height="20px" width="20px"></td> </tr>`)
}


`<tr id=id> <td>name/td> <td>calories</td> <td><img src="src/delete.svg" class="delete_button" height="20px" width="20px"></td> </tr>`
