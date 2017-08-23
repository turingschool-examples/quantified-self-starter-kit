const Food             = require('../../models/Food');
const href             = document.location.href;
const $nameInput       = $('input[name="food-name"]');
const $caloriesInput   = $('input[name="food-calories"]');
const $nameDescription = $('#name-description');
const $calDescription  = $('#calories-description');
const $foodTable       = $('#foods-table');
const HtmlHelper       = require('../../helpers/HtmlHelper');

const refreshTable = (foods) => {
  $foodTable.find("tr:gt(0)").remove()
  const fileLocation = href.substr(href.lastIndexOf('/') + 1);
  $foodTable.append(HtmlHelper.allFoodToHTML(
    foods, (fileLocation === '' || fileLocation === "index.html"))
  )
}

const validateInputs = () => {
  let isValid = true
  if ($nameInput.val() === '') {
    $nameDescription.text('Error: Please enter a name')
    isValid = false
  }

  if ($caloriesInput.val() === '') {
    $calDescription.text('Error: Please enter a calorie amount')
    isValid = false
  }

  return isValid
}

const clearInputs = () => {
  $nameInput.val('')
  $caloriesInput.val('')
}

const resetDescriptions = () => {
  $nameDescription.text('Please enter a name')
  $calDescription.text('Please enter a calorie amount')
}

module.exports = { refreshTable, validateInputs, clearInputs, resetDescriptions }
