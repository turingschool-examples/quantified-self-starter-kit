/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _events = __webpack_require__(1);

	var _mealEvents = __webpack_require__(3);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _foods = __webpack_require__(2);

	// if (window.location.pathname == '/foods.html') {

	var onLoad = $(document).ready(function () {
	  (0, _foods.getFoods)();
	}); // const getFoods = require('../requests/foods')


	var clickSubmit = $('#new-food-submit').on('click', function (event) {
	  console.log('clicked');
	  event.preventDefault();
	  var food = $('#food').val();
	  var calories = $('#calories').val();

	  if (food === "") {
	    alert("Please enter food");
	  } else if (calories === "") {
	    alert("Please enter calories");
	  } else {
	    (0, _foods.postFood)(food, calories);
	  }
	});
	// }

	module.exports = { onLoad: onLoad, clickSubmit: clickSubmit };

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	var requestUrl = "http://localhost:3000/api/v1";

	var tableRow = function tableRow(food) {
	  return "<tr><td>" + food["name"] + "</td><td>" + food["calories"] + "</td></tr>";
	};

	var getFoods = function getFoods() {
	  $.get(requestUrl + "/foods").then(function (foods) {
	    foods.forEach(function (food) {
	      $("#food-table").prepend(tableRow(food));
	    });
	  });
	};

	var postFood = function postFood(food, calories) {
	  $.post(requestUrl + "/foods", {
	    "food": {
	      "name": food,
	      "calories": calories
	    }
	  }).then(function () {
	    location.reload(true);
	    // getFoods()
	  });
	};

	module.exports = { getFoods: getFoods, postFood: postFood };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _meals = __webpack_require__(4);

	if (window.location.pathname == '/') {
	  var _onIndexLoad = $(document).ready(function () {
	    (0, _meals.getMeals)();
	  });

	  // const clickSubmit = $('#new-food-submit').on('click', function(event){
	  //   console.log('clicked')
	  //   event.preventDefault()
	  //   const food = $('#food').val()
	  //   const calories = $('#calories').val()
	  //
	  //   if (food === "") {
	  //     alert("Please enter food")
	  //   }
	  //   else if (calories === "") {
	  //     alert("Please enter calories")
	  //   }
	  //   else {
	  //     postFood(food, calories)
	  //   }
	  // })
	}

	module.exports = { onIndexLoad: onIndexLoad };

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	var requestUrl = "http://localhost:3000/api/v1";

	var totalGoalCalories = 2000;

	var tableRow = function tableRow(food, calories) {
	  return "<tr><td>" + food + "</td><td>" + calories + "</td></tr>";
	};

	var totalCaloriesRow = function totalCaloriesRow(calories) {
	  return "<tr><th>Total Calories</th><td>" + calories + "</td></tr>";
	};

	var remainingCaloriesRow = function remainingCaloriesRow(calories) {
	  var color = "";
	  if (calories >= 0) {
	    return "<tr><th>Remaining Calories</th><td class=\"remaining-calories\" style=\"color: green;\">" + calories + "</td></tr>";
	  } else {
	    return "<tr><th>Remaining Calories</th><td class=\"remaining-calories\" style=\"color: red;\">" + calories + "</td></tr>";
	  }
	};

	var getMeals = function getMeals() {
	  $.get(requestUrl + "/meals").then(function (meals) {
	    populateTable(meals);
	    calculateCalories(meals);
	    generateTotals(meals);
	    getAllFoods();
	  });
	};

	var populateTable = function populateTable(meals) {
	  meals.forEach(function (meal) {
	    meal["foods"].forEach(function (item) {
	      var food = item["name"];
	      var calories = item["calories"];
	      $("#" + meal["name"].toLowerCase() + "-table").append(tableRow(food, calories));
	    });
	  });
	};

	var calculateCalories = function calculateCalories(meals) {
	  meals.forEach(function (meal) {
	    var totalCalories = 0;
	    meal["foods"].forEach(function (item) {
	      totalCalories += item["calories"];
	    });
	    var remainingCalories = getRemainingCalories(meal, totalCalories);
	    $("#" + meal["name"].toLowerCase() + "-table").append(totalCaloriesRow(totalCalories));
	    $("#" + meal["name"].toLowerCase() + "-table").append(remainingCaloriesRow(remainingCalories));
	  });
	};

	var getRemainingCalories = function getRemainingCalories(meal, totalCalories) {
	  if (meal["name"] == "Breakfast") {
	    return 400 - totalCalories;
	  } else if (meal["name"] == "Lunch") {
	    return 600 - totalCalories;
	  } else if (meal["name"] == "Dinner") {
	    return 800 - totalCalories;
	  } else if (meal["name"] == "Snack") {
	    return 200 - totalCalories;
	  }
	};

	var generateTotals = function generateTotals(meals) {
	  var total = calculateTotal(meals);
	  var remaining = totalGoalCalories - total;
	  $('#consumed-calories').html("" + total);
	  $('#total-remaining-calories').html("" + remaining);
	  if (remaining >= 0) {
	    $('#total-remaining-calories').css("color", "green");
	  } else {
	    $('#total-remaining-calories').css("color", "red");
	  }
	};

	var calculateTotal = function calculateTotal(meals) {
	  var totalMealCalories = 0;
	  meals.forEach(function (meal) {
	    var calories = 0;
	    meal["foods"].forEach(function (item) {
	      calories += item["calories"];
	    });
	    totalMealCalories += calories;
	  });
	  return totalMealCalories;
	};

	var getAllFoods = function getAllFoods() {
	  $.get(requestUrl + "/foods").then(function (foods) {
	    foods.forEach(function (food) {
	      $("#diary-food-table").append(foodsTableRow(food));
	    });
	  });
	};

	var foodsTableRow = function foodsTableRow(food) {
	  return "<tr id=\"" + food.id + "\"><td><input type=\"checkbox\"/></td><td class=\"food-item\" >" + food["name"] + "</td><td>" + food["calories"] + "</td></tr>";
	};

	$("#food-search").bind("keyup", function () {
	  var text = $(this).val().toLowerCase();
	  var foodItem = $(".food-item");

	  foodItem.parent().hide();

	  foodItem.filter(function () {
	    return $(this).text().toLowerCase().indexOf(text) == 0;
	  }).parent().show();
	});

	module.exports = { getMeals: getMeals };

/***/ })
/******/ ]);