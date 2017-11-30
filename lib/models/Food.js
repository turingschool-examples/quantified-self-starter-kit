const Ajax = require('../ajax_requests/ajax')

module.exports = class Food{
  constructor(food){
    this.id = food.id
    this.name = food.name
  }
  static all_foods(){
    return Ajax.getAllFoods().then((data)=>{
      let allFoods = data.map((k,v)=>{
        return new Food(k)
      })
      Food.sort(allFoods)
      return allFoods
    })
  }

  static sort(foods){
    foods.sort((a,b)=>{
      b.id - a.id
    })
  }
}
