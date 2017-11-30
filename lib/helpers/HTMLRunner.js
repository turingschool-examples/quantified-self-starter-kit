const $ = require('jquery')
const HTMLHelper = require('./HTMLHelper')

module.exports = class HTMLRunner{

  static appendTable(elementName,mealData){
    mealData.forEach((meal)=>{
      $(elementName).append(HTMLHelper.newTableDiv(meal))
    })
  }
}
