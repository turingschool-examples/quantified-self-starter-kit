const $ = require('jquery')
const HTMLHelper = require('./HTMLHelper')

module.exports = class HTMLRunner{

  static appendTable(elementName,mealData){
    let data = mealData
    Promise.all( mealData.map((meal)=>{
        $(elementName).append(HTMLHelper.newTableDiv(meal))
      })
    ).then(()=>{
      HTMLRunner.appendTableFoot(data)
      HTMLRunner.appendTableRow(data)
    })
  }

  static appendFoodMealsTable(tableName, foodData){
    let data = foodData
    foodData.map((food)=>{
        $(tableName).append(HTMLHelper.newFoodMealTableEntry(food))
      })

  }

  static appendTableFoot(mealData){
    mealData.forEach((meal)=>{
      const table = $(`.${meal.name}-tfoot`)
      HTMLRunner.totalMealCaloriesRow(meal, table)
    })
  }

  static appendTableRow(mealData){
    mealData.forEach((meal)=>{
      const table = $(`.${meal.name}-tbody`)
      HTMLRunner.formFoodRow(meal, meal.food, table)
    })
  }

  static eventCalTrigger(meal){
    $(`.${meal}-calories`).trigger('click')
  }

  static eventRemainingTrigger(meal){
    $(`.${meal}-remaining-calories`).trigger('click')
  }

  static formFoodRow(meal, foods, table){
    foods.forEach((food)=>{
      table.append(HTMLHelper.newTableRow(meal, food))
    })
  }

  static totalMealCaloriesRow(meal, table){
    table.append(HTMLHelper.totalMealCalories(meal))
    HTMLRunner.eventCalTrigger(meal.name)
    HTMLRunner.eventRemainingTrigger(meal.name)
  }

  static deleteTableRow(tableRow){
    tableRow.remove();
  }

  static appendTotalCalories(total, tableRow){
    tableRow.html(total);
  }

  static appendRemainingCalories(total, tableRow){
    tableRow.html(total);
  }
}
