const $ = require('jquery')

import { mealsResponse } from '../ajax-requests/meal-requests.js'
import { appendMeal, appendCalories, appendMealTotals } from "./append-meal.js"
import { appendFood } from "./append-food.js"
import { renderTotalCalsTable, sumCalories, getCalories } from "./render-total-cals-table.js"

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

// get total remaining cals for all meals
const getTotalRemainCals = (name) => {
    let goalCals = parseInt($('td#total-goal-cals').text())
    let consumedCals = parseInt($('td#all-cals-consumed').text())
    return goalCals - consumedCals
}

export { renderMeals, renderAllCals, renderMealTotals, renderTotalCalsTable, getTotalRemainCals }
