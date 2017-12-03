const $ = require('jquery')

import { mealsResponse } from '../ajax-requests/meal-requests.js'
import { appendMeal, appendCalories, appendMealTotals } from "../response-handlers/append-meal.js"
import { appendFood } from "../response-handlers/append-food.js"

// renderMeals()

// render meals
function renderMeals() {
    mealsResponse().then(function(mealObjects) {
        for (var i = 0; i < mealObjects.length; i++) {
            let meal = mealObjects[i]
            appendMeal(meal)
            for (var j = 0; j < meal.foods.length; j++) {
                appendFood(meal.foods[j], `.list#${meal.name}`)
            }
            appendCalories(meal.name)
            renderAllCals(meal.name)
        }
        renderAllMealTotalCals()
    }).catch(function() {
        $(".alert").append("Error Loading Food Tracker")
    })
}

// render total calories
const renderTotalCals = (name) => {
    let tableCalories = getCalories(name)
    let totalCalories = sumCalories(tableCalories)
    $(`#${name}-calories`).text(totalCalories)
}

const getCalories = (name) => {
    let calories = []
    $(`#${name} td.calories`).each((index, val) => {
        calories.push(parseInt(val.innerHTML))
    })
    return calories
}

const sumCalories = (tableCalories) => {
    return tableCalories.reduce((calories, total) => {
        return calories + total
    }, 0)
}

// render remaining cals
const renderRemainCals = (name) => {
    let remainCals = getRemainCals(name)
    $(`#${name}-remaining`).text(remainCals)
}

const colorizeCals = () => {
    $(`td.remaining-calories:contains('-')`).addClass('red').removeClass('green')
    $(`td.remaining-calories:not(:contains('-'))`).addClass('green').removeClass('red')
}

const getRemainCals = (name) => {
    let total = parseInt($(`#${name}-calories`).text())
    if (name === 'Snack')
        return 200 - total
    else if (name === 'Breakfast')
        return 400 - total
    else if (name === 'Lunch')
        return 600 - total
    else if (name === 'Dinner')
        return 800 - total
}

//render all Calories
const renderAllCals = (name) => {
    renderTotalCals(name)
    renderRemainCals(name)
    colorizeCals()
}

// render meal totals table
const renderMealTotals = () => {
    appendMealTotals()
}

const getTotalCalories = () => {
    let calories = []
    $(`td.total-meal-cals`).each((index, val) => {
        calories.push(parseInt(val.innerHTML))
    })
    return calories
}

const renderAllMealTotalCals = () => {
    let allMealCals = getTotalCalories()
    let totalMealCals = sumCalories(allMealCals)
    $(`#all-cals-consumed`).text(totalMealCals)
}

export { renderMeals, renderAllCals, renderMealTotals, renderAllMealTotalCals }