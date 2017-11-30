const Ajax = require('../ajax_requests/ajax')

module.exports = class Meal{
  constructor(meal){
    this.id = meal.id
    this.name = meal.name
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
