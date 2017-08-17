require ('./index.scss')
require('./style/food_index.scss')

const food = require ('./Food.js')
const meal = require ('./Meal.js')

const myFood = new food({name: "Test", calories: 100})
console.log(myFood)
