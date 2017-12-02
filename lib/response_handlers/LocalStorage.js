const $ = require('jquery')
const HTMLRunner = require('../helpers/HTMLRunner')
const mealRestrictions = {
  "1": 400,
  "2": 200,
  "3": 600,
  "4": 800
}
let localStore = window.localStorage

module.exports = class LocalStorage{

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

  static totalAllMealCalories(row){
    let total = 0
    for (var i = 1; i <= 4; i++) {
      total += LocalStorage.calculateTotalFood(
        JSON.parse(localStore.getItem(`meal ${i}`)).food
      )
      total
    }
    HTMLRunner.appendTotalCalories(total, row)
    total = 0
  }

  static totalMealCalories(row, mealID){
    let total = 0
    total += LocalStorage.calculateTotalFood(
      JSON.parse(localStore.getItem(`meal ${mealID}`)).food
    )
    localStore.setItem(`${mealID}_meal_calorie_total`, total)
    HTMLRunner.appendTotalCalories(total, row)
    total = 0
  }

  static calculateTotalFood(food, total=0){
    food.forEach((food)=>{
      total += parseInt(food.calories)
    })
    return total;
  }

  static totalRemainingCalories(row, consumed, total=2000){
    const remaining = (total - consumed)
    HTMLRunner.appendRemainingCalories(remaining, row)
  }

  static remainingIndivMealCalories(row, mealID){
    const consumed = localStore.getItem(`${mealID}_meal_calorie_total`)
    const totalAllowed = mealRestrictions[mealID]
    const remaining = (totalAllowed - consumed)
    HTMLRunner.appendRemainingCalories(remaining, row)
  }
}
