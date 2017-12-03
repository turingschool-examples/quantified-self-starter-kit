const Ajax = require('../ajax_requests/ajax')
const Food = require('./Food')
const LocalStorage = require('../response_handlers/LocalStorage')

module.exports = class Meal{
  constructor(meal){
    this.id = meal.id
    this.name = meal.name
    this.food = Food.getFood(meal.foods)
  }

  static addFoodToMeal(mealID, foodIDs){
    return Promise.all(
      foodIDs.map((foodID)=>{
        Ajax.addFoodToMeal(mealID, foodID)
      })
    ).then((data)=>{
      LocalStorage.addFoodToMeal(mealID, foodIDs)
    })
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
    const meal = target.id
    const mealID = target.className.split(' ')[6]
    const food = target.className.split(' ')[4]
    return new Promise((res, rej)=>{
      Ajax.deleteMealFood(mealID, food)
      .then((data)=>{
        if (data.message.includes("Successfully")) {
          LocalStorage.deleteMealFood(mealID, food, parentRow)
          res(meal)
        } else {
          rej("error")
        }
      })
    })
  }
}
