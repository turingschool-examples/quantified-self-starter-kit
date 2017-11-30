const $ = require('jquery')
const HTMLHelper = require('./HTMLHelper')

module.exports = class HTMLRunner{

  static appendTable(elementName,mealData){
    let data = mealData
    Promise.all(
      mealData.map((meal)=>{
        $(elementName).append(HTMLHelper.newTableDiv(meal))
      })
    ).then(()=>{
      HTMLRunner.appendTableRow(data)
    })
  }

  static appendTableRow(mealData){
    mealData.forEach((meal)=>{
      const table = $(`.${meal.name}-tbody`)
      HTMLRunner.formFoodRow(meal, meal.food, table)
    })
  }

  static formFoodRow(meal, foods, table){
    foods.forEach((food)=>{
      table.append(HTMLHelper.newTableRow(meal, food))
    })
  }

  static deleteTableRow(tableRow){
    tableRow.remove();
  }
}
