const Ajax = require('../ajax_requests/ajax')
const Food = require('./Food')
const LocalStorage = require('../response_handlers/LocalStorage')

module.exports = class Meal{
  constructor(meal){
    this.id = meal.id
    this.name = meal.name
    this.food = Food.getFood(meal.foods)
  }
  static allMeals(){
    return Ajax.getAllMeals().then((data)=>{
      let allMeals = data.map((k,v)=>{
        return new Meal(k)
      })
      Meal.sort(allMeals)
      return allMeals
    })
  }

  static sort(meals){
    meals.sort((a,b)=>{
      b.id - a.id
    })
  }

  static deleteMealFood(target, parentRow){
    const meal = target.className.split(' ')[3]
    const food = target.className.split(' ')[1]
    Ajax.deleteMealFood(meal, food)
    .then((data)=>{
      if (data.message.includes("Successfully")) {
        LocalStorage.deleteMealFood(meal, food, parentRow)
      }
    })
  }
}
