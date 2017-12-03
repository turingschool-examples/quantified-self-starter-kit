const Ajax = require('../ajax_requests/ajax')
const HTMLHelper = require('../helpers/HTMLHelper')
const $ = require('jquery')

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

  static allFoods(){
    return Ajax.getAllFoods().then((data)=>{
      let allFoods = data.map((ob)=>{
        return new Food(ob)
      })
      var byId = allFoods.slice(0);
      byId.sort(function(a,b) {
        return a.id - b.id;
      });
      return byId
    })
  }
}
