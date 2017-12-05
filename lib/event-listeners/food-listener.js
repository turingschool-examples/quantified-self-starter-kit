import { Food } from '../models/food.js'
import { renderFoods } from '../response-handlers/all_food_objects.js'
import { createFood, deleteFood, updateFood, foodsResponse } from '../ajax-requests/food-requests.js'
import { appendFood } from '../response-handlers/append-food.js'

export { defaultSort }

const $ = require('jquery')

let foodFormName = $("#name")
let foodFormCals = $("#calories")

$("#food_form").on("submit", (event) => {
    event.preventDefault()
    let newFood = foodFormData()
    if (objectHasData(newFood)) {
        clearFormFields()
        createFood(newFood).then((response) => {
            appendFood(response, "#foodlist")
        })
    }
})

const objectHasData = (newFood) => {
    let foodname = newFood.name
    let calories = newFood.calories
    if (foodname === '' || calories === '') {
        return false
    } else {
        return true
    }
}

const foodFormData = () => {
    return new Food(foodFormName.val(), foodFormCals.val())
}

const clearFormFields = () => {
    foodFormName.val("")
    foodFormCals.val("")
}


//delete button functions
$(document).on({
    mouseenter: function() {
        $(this).prop("src", "../src/x-button.svg")
    },
    mouseleave: function() {
        $(this).prop("src", "../src/delete.svg")
    },
    click: function() {
        let parent = $(this).parents("tr")
        deleteFood(parent.attr('id'))
    }
}, '.food_delete_button')

//edit food functions
$(document).on({
    click: function() {
        $(this).attr('contenteditable', "true")
        $(this).addClass('highlighted')
    },
    blur: function() {
        $(this).removeClass('highlighted')
        let updatedFood = getUpdatedFood($(this))
        updateFood(updatedFood)
    }
}, '.foodinfo')

const getUpdatedFood = (element) => {
    $(element).attr('contenteditable', "false")
    let row = $(element).parent()
    let id = row.attr('id')
    let name = row.find('.name').text()
    let calories = row.find('.calories').text()
    return new Food(name, calories, id)
}

//filter functions
$("#foodfilter").on('keyup', () => {
    let regex = getFilterTermRegExp()
    prepareTableForFilter()
    filterFoods(regex)
})

const getFilterTermRegExp = () => {
    let term = $("#foodfilter").val()
    return new RegExp(term, "i")
}

const prepareTableForFilter = () => {
    $("table.searchable tr").hide()
    $("th").parents().show()
}

const filterFoods = (regexTerm) => {
    $("table.searchable tr").filter(function() {
        return regexTerm.test($(this).children().text());
    }).show()
}

// sort - might need to be in a class
$(document).on({
    click: function() {
        let table = $(this).parents('table')
        sortFoodTable(table)
    }
}, '#calorie-header')

const sortTableAscending = (table) => {
    let sortableRows = table.children('tr')
    let sortedRows = sortableRows.sort((a, b) => {
        let valueA = parseInt($(a).children('td.calories').text())
        let valueB = parseInt($(b).children('td.calories').text())
        return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
    })
    sortableRows.remove()
    $(table).append(sortedRows).addClass('asc').removeClass('alphabetical')
}

const sortTableDescending = (table) => {
    let sortableRows = table.children('tr')
    let sortedRows = sortableRows.sort((a, b) => {
        let valueA = parseInt($(a).children('td.calories').text())
        let valueB = parseInt($(b).children('td.calories').text())
        return (valueA > valueB) ? -1 : (valueA < valueB) ? 1 : 0;
    })
    sortableRows.remove()
    $(table).append(sortedRows).addClass('desc').removeClass('asc')
}

function defaultSort(table) {
    let sortableRows = table.children('tr')
    let sortedRows = sortableRows.sort((a, b) => {
        let valueA = $(a).children('td.name').text()
        let valueB = $(b).children('td.name').text()
        return (valueA.toUpperCase() < valueB.toUpperCase()) ? -1 : (valueA.toUpperCase() > valueB.toUpperCase()) ? 1 : 0;
    })
    sortableRows.remove()
    $(table).append(sortedRows).addClass('alphabetical').removeClass('desc')
}

const sortFoodTable = (table) => {
  if (table.hasClass('alphabetical'))
    return sortTableAscending(table)
  else if (table.hasClass('asc'))
    return sortTableDescending(table)
  else if (table.hasClass('desc'))
    return defaultSort(table)
}
