const Ajax = require('../ajax_requests/ajax')
const Food = require('./Food')
module.exports = class Meal{
  constructor(meal){
    this.id = meal.id
    this.name = meal.name
    this.food = Food.getFood(meal.foods)
  }
  static all_meals(){
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
}
