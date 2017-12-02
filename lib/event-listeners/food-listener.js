import { Food } from '../models/food.js'
import { renderFoods } from '../response-handlers/all_food_objects.js'
import { createFood, deleteFood, updateFood, foodsResponse } from '../ajax-requests/food-requests.js'

const $ = require('jquery')

let foodFormName = $("#name")
let foodFormCals = $("#calories")

$("#food_form").on("submit", (event) => {
    event.preventDefault()
    let newFood = foodFormData()
    clearFormFields()
    if (objectHasData(newFood)) {
        createFood(newFood)
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
        $(this).prop("src", "src/x-button.svg")
    },
    mouseleave: function() {
        $(this).prop("src", "src/delete.svg")
    },
    click: function() {
        let parent = $(this).parents("tr")
        deleteFood(parent.attr('id'))
        parent.remove()
    }
}, '.delete_button')

//edit food functions
$(document).on({
    click: function() {
        $(this).attr('contenteditable', "true")
    },
    blur: function() {
        let targetElement = $(this)
        let updatedFood = getUpdatedFood(targetElement)
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
    $("tr").hide()
    $("th").parents().show()
}

const filterFoods = (regexTerm) => {
    $("tr").filter(function() {
        return regexTerm.test($(this).children().text());
    }).show()
}