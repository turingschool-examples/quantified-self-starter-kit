const Food             = require('../../models/Food');
const HtmlHelper       = require('../../helpers/HtmlHelper');

const href             = document.location.href;
const $nameInput       = $('input[name="food-name"]');
const $caloriesInput   = $('input[name="food-calories"]');
const $nameDescription = $('#name-description');
const $calDescription  = $('#calories-description');
const $foodTable       = $('#foods-table');

let state;

const refreshTable = (foods) => {
  $foodTable.find("tr:gt(0)").remove();
  const fileLocation = href.substr(href.lastIndexOf('/') + 1);
  $foodTable.append(HtmlHelper.allFoodToHTML(
    foods, (fileLocation === '' || fileLocation === "index.html"))
  );
};

const validateInputs = () => {
  return (validName() && validCalories());
};

const validName = () => {
  if ($nameInput.val() === '') {
    $nameDescription.text('Error: Please enter a name');
    return false;
  } else {
    return true;
  }
};

const validCalories = () => {
  if ($caloriesInput.val() === '') {
    $calDescription.text('Error: Please enter a calorie amount');
    return false;
  } else {
    return true;
  };
};

const clearInputs = () => {
  $nameInput.val('');
  $caloriesInput.val('');
};

const resetDescriptions = () => {
  $nameDescription.text('Please enter a name');
  $calDescription.text('Please enter a calorie amount');
};

const changeFoodOrderByCalories = () => {
  state = state || 'original';

  foodCollection.sort((foodA, foodB) => {
    if (state === 'original') {
      return foodA.calories - foodB.calories; //sorts asc
    } else if (state === 'asc') {
      return foodB.calories - foodA.calories; //sorts desc
    } else {
      return foodB.id - foodA.id; //sorts by ID
    };
  });

  changeSortOrder();
  refreshTable(foodCollection);
};

const changeSortOrder = () => {
  if (state === 'original') {
    state = 'asc';
  } else if (state === 'asc') {
    state = 'desc';
  } else {
    state = 'original';
  };
};

const changeToInput = (event, field) => {
  const itemID = event.target.dataset.id;
  event.target.outerHTML = `<td><input type="text" class="edit-input edit-${field}"` +
  ` data-id=${itemID} value="${event.target.innerText}"></td>`;
};

const acceptEdits = (event, field) => {
  const itemID = event.target.dataset.id;
  let food = foodCollection.find(food => food.id === itemID);

  if (field === 'name') {
    food.name = event.target.value;
  } else {
    food.calories = event.target.value
  };

  food.update();
  refreshTable(foodCollection);
};

module.exports = {
  refreshTable, validateInputs, clearInputs, resetDescriptions,
  changeFoodOrderByCalories, changeToInput, acceptEdits
};
