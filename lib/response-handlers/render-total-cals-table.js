import { getTotalRemainCals } from "./all_meal_objects.js"

const $ = require('jquery')

function renderTotalCalsTable() {
    renderAllMealTotalCals()
    renderTotalRemainingCals()
    colorizeAllMealCals()
}

// render total cals consumed for all meals
const renderAllMealTotalCals = () => {
    let allMealCals = getTotalCalories()
    let totalMealCals = sumCalories(allMealCals)
    $(`#all-cals-consumed`).text(totalMealCals)
}

function getTotalCalories() {
    let calories = []
    $(`td.total-meal-cals`).each((index, val) => {
        calories.push(parseInt(val.innerHTML))
    })
    return calories
}

function sumCalories(tableCalories) {
    return tableCalories.reduce((calories, total) => {
        return calories + total
    }, 0)
}

function getCalories(name) {
    let calories = []
    $(`#${name} td.calories`).each((index, val) => {
        calories.push(parseInt(val.innerHTML))
    })
    return calories
}


// colorize total remaining cals
const colorizeAllMealCals = () => {
    $(`td#total-cals-remaining:contains('-')`).addClass('red').removeClass('green')
    $(`td#total-cals-remaining:not(:contains('-'))`).addClass('green').removeClass('red')
}

// render total remaining cals
const renderTotalRemainingCals = () => {
    let totalRemainingCals = getTotalRemainCals()
    $('#total-cals-remaining').text(totalRemainingCals)
}

export { renderTotalCalsTable, sumCalories, getCalories }
