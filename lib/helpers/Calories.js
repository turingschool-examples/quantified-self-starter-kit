const $ = require('jquery')
const LocalStorage = require('../response_handlers/LocalStorage')

module.exports = class Calories{

  static calculateCalories(row){
    LocalStorage.totalAllMealCalories(row)
  }

  static calculateRemainingCalories(row, total){
    LocalStorage.totalRemainingCalories(row, total)
  }

  static updateCalories(row){
    return new Promise((res, rej)=>{
      LocalStorage.totalAllMealCalories(row)
      res("Proceed")
    })
  }

  static updateRemainingCalories(row, totalConsumed){
    return new Promise((res, rej)=>{
      LocalStorage.totalRemainingCalories(row, totalConsumed)
      res("Proceed")
    })
  }

  static updateMealCalories(row, mealID, meal){
    return new Promise((res, rej)=>{
      LocalStorage.totalMealCalories(row, mealID)
      res(meal)
    })
  }

  static updateRemainingMealCalories(row, mealID){
    return new Promise((res, rej)=>{
      LocalStorage.remainingIndivMealCalories(row, mealID)
      res("Proceed")
    })
  }
}
