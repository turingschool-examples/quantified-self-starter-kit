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
                appendFood(meal.foods[j], `.list#${meal.name}`, "meal_food")
            }
            appendCalories(meal.name)
            renderAllCals(meal.name)
        }
        renderTotalCalsTable()
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
    let goalValues = {"Snack": (200 - total), "Breakfast": (400 - total), "Lunch": (600 - total), "Dinner":(800 - total)}
    console.log(goalValues[name])
    return goalValues[name]
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

// gets array of each meals total cals
const getTotalCalories = () => {
    let calories = []
    $(`td.total-meal-cals`).each((index, val) => {
        calories.push(parseInt(val.innerHTML))
    })
    return calories
}

// render total cals consumed for all meals
const renderAllMealTotalCals = () => {
    let allMealCals = getTotalCalories()
    let totalMealCals = sumCalories(allMealCals)
    $(`#all-cals-consumed`).text(totalMealCals)
}

// get total remaining cals for all meals
const getTotalRemainCals = (name) => {
    let goalCals = parseInt($('td#total-goal-cals').text())
    let consumedCals = parseInt($('td#all-cals-consumed').text())
    return goalCals - consumedCals
}

// render total remaining cals
const renderTotalRemainingCals = () => {
    let totalRemainingCals = getTotalRemainCals()
    $('#total-cals-remaining').text(totalRemainingCals)
}

// colorize total remaining cals
const colorizeAllMealCals = () => {
    $(`td#total-cals-remaining:contains('-')`).addClass('red').removeClass('green')
    $(`td#total-cals-remaining:not(:contains('-'))`).addClass('green').removeClass('red')
}

const renderTotalCalsTable = () => {
    renderAllMealTotalCals()
    renderTotalRemainingCals()
    colorizeAllMealCals()
}

export { renderMeals, renderAllCals, renderMealTotals, renderTotalCalsTable }
