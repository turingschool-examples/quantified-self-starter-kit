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

	'use strict';

	var Food = __webpack_require__(1);

	var someFood = new Food();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	function Food(food, calories) {
	  this.name = name;
	  this.calories = calories;
	}

	var app = new function () {
	  var foodElements = document.getElementById('foods');
	  var edibles = [{ name: 'orange', calories: 34 }, { name: 'French Silk Pie', calories: 340 }, { name: 'Banana', calories: 34 }, { name: 'Deep Dish Pizza', calories: 890 }, { name: 'Spinach Salad with Dressing', calories: 240 }, { name: 'Roasted Cauliflower', calories: 80 }, { name: 'Chicken Breast', calories: 210 }, { name: 'Dark Chocolate', calories: 150 }];

	  this.Count = function (data) {
	    var el = document.getElementById('counter');
	    var name = 'food';
	    if (data) {
	      if (data > 1) {
	        name = 'foods';
	      }
	      el.innerHTML = data + ' ' + name;
	    } else {
	      el.innerHTML = 'No ' + name;
	    }
	  };

	  this.FetchAll = function () {
	    var data = '';
	    if (edibles.length > 0) {
	      for (var i = 0; i < edibles.length; i++) {
	        console.log(i);
	        data += '<tr>';
	        data += '<td>' + edibles[i].name + '</td>';
	        data += '</tr>';
	        data += '<tr>';
	        data += '<td>' + edibles[i].calories + '</td>';
	        data += '</tr>';
	        console.log(data);
	      }
	    }

	    this.Count(edibles.length);
	    return foodElements.innerHTML = data;
	  };
	}();

	app.FetchAll();

	// Food.prototype.edit = function () {
	//   //Some cool storage stuff here
	// };

	module.exports = Food;

/***/ })
/******/ ]);