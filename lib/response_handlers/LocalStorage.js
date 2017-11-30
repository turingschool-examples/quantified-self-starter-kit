const $ = require('jquery')
let localStore = window.localStorage

module.exports = class SessionStorage{
  static saveMealData(mealData){
    console.log(localStore)
    mealData.forEach((meal)=>{
      localStore.setItem(`meal ${meal.id}`, meal)
      console.log(localStore.getItem(`meal ${meal.id}`))
    })
  }
}
