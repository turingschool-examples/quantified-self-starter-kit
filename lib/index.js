require ('./index.scss')
require('./style/food_index.scss')

const food = require ('./Food.js')
const menu = require ('./Menu.js')

const myFood = new food({name: "Test", calories: 100})
console.log(myFood)
