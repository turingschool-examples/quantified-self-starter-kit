const $ = require('jquery')
const HTMLRunner = require('../helpers/HTMLRunner')

let localStore = window.localStorage

module.exports = class SessionStorage{

  static saveMealData(mealData, table){
    mealData.forEach((meal)=>{
      localStore.setItem(`meal ${meal.id}`, JSON.stringify(meal))
    })
    HTMLRunner.appendTable(table, mealData);
  }

  static deleteMealFood(meal, foodID, row){
    let item = JSON.parse(localStore.getItem(`meal ${meal}`))
    for(let i=0;i<item.food.length;i++){
      if (item.food[i].id == foodID){
        item.food.splice(i,1);
       }
    }
    localStore[`meal ${meal}`] = JSON.stringify(item)
    HTMLRunner.deleteTableRow(row)
  }
}
