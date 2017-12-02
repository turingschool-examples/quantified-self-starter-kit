const Ajax = require('../ajax_requests/ajax')
const HTMLHelper = require('../helpers/HTMLHelper')

module.exports = class Food{
  constructor(food){
    this.id = food.id
    this.name = food.name
    this.calories = food.calories
    this.tableRow = HTMLHelper.newTableRow
  }

  static allFood(){
    return Ajax.getAllFood().then((data)=>{
      let allFood = data.map((k,v)=>{
        return new Food(k)
      })
      Food.sort(allFood)
      return allFood
    })
  }

  static getFood(foods){
    return foods.map((food)=>{
      return new Food(food)
    })
  }

  static sort(foods){
    foods.sort((a,b)=>{
      b.id - a.id
    })
  }
}
