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

	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(10);
	__webpack_require__(12);
	__webpack_require__(7);
	__webpack_require__(6);
	__webpack_require__(8);
	__webpack_require__(9);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./foods-styling.scss", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./foods-styling.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".add-food-button {\n  float: right; }\n\n.heading {\n  padding-top: 30px;\n  padding-bottom: 30px;\n  padding-left: 0px; }\n\n.filter {\n  padding-top: 40px;\n  padding-bottom: 5px;\n  padding-left: 0px;\n  display: block; }\n\n.icon-button {\n  appearance: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  outline: none;\n  border: 0;\n  background: transparent;\n  color: red; }\n\n.btn-info {\n  float: left; }\n\n#foodsTable {\n  border-collapse: collapse;\n  width: 50%; }\n\n.delete-food {\n  color: #300;\n  cursor: pointer; }\n  .delete-food:hover {\n    color: #f00; }\n\n.list:hover {\n  background-color: #f5f5f5; }\n\n#foodsTable th {\n  padding-bottom: 15px;\n  text-align: center; }\n\ntd.green {\n  color: green; }\n\ntd.red {\n  color: red; }\n\n.sub-name {\n  text-align: right;\n  color: red; }\n\n.sub-calories {\n  text-align: right;\n  color: red; }\n", ""]);

	// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	const herokuURL = "https://quantified-self-node.herokuapp.com";
	const FoodCall = __webpack_require__(6);
	const FoodHandler = __webpack_require__(8);

	$(document).ready(function () {

	  FoodCall.getFoods();
	  FoodHandler.deleteHandler();
	  FoodHandler.createHandler();
	  FoodHandler.updateHandler();
	  FoodHandler.descHandler();
	  FoodHandler.ascHandler();
	  FoodHandler.searchFoods();
	});

	$(".sub-name").hide();
	$(".sub-calories").hide();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	const postURL = "https://quantified-self-node.herokuapp.com/api/v1/foods";
	const getURL = "https://quantified-self-node.herokuapp.com/api/v1/foods";
	const herokuURL = `https://quantified-self-node.herokuapp.com`;
	const FoodTable = __webpack_require__(7);

	const getFoods = () => {
	  $.get(`${postURL}`).then(function (foods) {
	    foods.reverse();
	    FoodTable.buildTable();
	    FoodTable.addFoodData(foods);
	  });
	};

	const postFood = () => {
	  $.ajax({
	    url: `${postURL}`,
	    type: 'POST',
	    data: { food: { name: `${$(".new-food-name").val()}`, calories: `${$(".new-food-calories").val()}` } },
	    success: function (response) {
	      getFoods();
	    },
	    error: function () {
	      console.log(error);
	    }
	  });
	};

	const deleteFood = (itemId, deleteRow) => {
	  $.ajax({
	    url: `${herokuURL}/api/v1/foods/${itemId}`,
	    type: 'DELETE',
	    success: function () {
	      deleteRow.remove();
	    },
	    error: function () {
	      console.log(error);
	    }
	  });
	};

	const updateFood = (foodId, newName, newCalories) => {
	  $.ajax({
	    url: `${herokuURL}/api/v1/foods/${foodId}`,
	    type: 'PUT',
	    data: { food: { name: `${newName}`, calories: `${newCalories}` } },
	    success: function (response) {
	      getFoods();
	    },
	    error: function () {
	      console.log(error);
	    }
	  });
	};

	module.exports = { postFood, getFoods, deleteFood, updateFood };

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	const buildTable = () => {
	  emptyTableData();
	  let table = $("<table id=foodTable>").appendTo('#food-table');
	  addTableBody(table);
	};

	const addTableBody = table => {
	  let tbody = $("<tbody>").appendTo(table);
	  addTableHeaders(tbody);
	};

	const addTableHeaders = tbody => {
	  let headersRow = $("<tr id=headers>").appendTo(tbody);
	  let headerName = $("<th>").text("Food Name").appendTo(headersRow);
	  let headerCalories = $("<th class=order>").text("Calories").appendTo(headersRow);
	};

	const addFoodRow = food => {
	  let tableBody = $("#foodTable").find('tbody');
	  let eachFoodRow = $(`<tr id=${food.id} class=list>`).appendTo(tableBody);
	  appendTableData(eachFoodRow, food);
	};

	const emptyTableData = () => {
	  $("#food-table.food-table").empty();
	};

	const appendTableData = (eachFoodRow, food) => {
	  let dataName = $(`<td class=edit-name contenteditable=true>${food.name}</td>`);
	  let dataCalories = $(`<td class=edit-calories contenteditable=true>${food.calories}</td>`);
	  let deleteFood = $(`<td class=delete-row><input class=delete-food type=button name=delete-food id=${food.id} value=delete </td>`);
	  eachFoodRow.append(dataName).append(dataCalories).append(deleteFood);
	};

	const addFoodData = foods => {
	  foods.forEach(function (food) {
	    addFoodRow(food);
	  });
	};

	module.exports = {
	  buildTable,
	  addFoodData
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	const FoodCall = __webpack_require__(6);
	const FoodOrder = __webpack_require__(9);

	const deleteHandler = () => {
	  $(document).on('click', '.delete-food', function () {
	    let itemId = this.id;
	    let deleteRow = this.parentElement.parentElement;
	    FoodCall.deleteFood(itemId, deleteRow);
	  });
	};

	const createHandler = () => {
	  $(".add-food-form").submit(function (event) {
	    if ($(".new-food-name").val().length === 0 & $(".new-food-calories").val().length === 0) {
	      event.preventDefault();
	      $(".sub-name").show();
	      $(".sub-calories").show();
	    } else if ($(".new-food-name").val().length === 0) {
	      event.preventDefault();
	      $(".sub-calories").hide();
	      $(".sub-name").show();
	    } else if ($(".new-food-calories").val().length === 0) {
	      event.preventDefault();
	      $(".sub-name").hide();
	      $(".sub-calories").show();
	    } else {
	      FoodCall.postFood();
	    }
	  });
	};

	const updateHandler = () => {
	  $(document).on('focus', '#foodTable td', function () {
	    $(this).data("initialText", $(this).html());
	    $(document).on('blur', 'td', function () {
	      if ($(this).data("initialText") == $(this).html()) {
	        event.preventDefault();
	      } else {
	        let newName = $(this.parentElement.children[0]).html();
	        let newCalories = $(this.parentElement.children[1]).html();
	        let foodId = `${this.parentElement.id}`;
	        FoodCall.updateFood(foodId, newName, newCalories);
	      }
	    });
	  });
	};

	const descHandler = () => {
	  $(document).on('click', '.order', function () {
	    FoodOrder.sortFoodsDesc();
	    $('.order').attr('class', 'reorder');
	  });
	};

	const ascHandler = () => {
	  $(document).on('click', '.reorder', function () {
	    FoodOrder.sortFoodsAsc();
	    $('.reorder').attr('class', 'order');
	  });
	};

	const searchFoods = () => {
	  $('#searchInput').keyup(function () {
	    FoodOrder.filter(this);
	  });
	};

	module.exports = { deleteHandler, createHandler, updateHandler, ascHandler, descHandler, searchFoods };

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	
	const sortFoodsDesc = () => {
	  let $tbody = $('tbody');
	  $tbody.find('.list').sort(function (a, b) {
	    let tda = $(a).find('td:eq(1)').text();
	    let tdb = $(b).find('td:eq(1)').text();
	    return tda < tdb ? 1 : tda > tdb ? -1 : 0;
	  }).appendTo($tbody);
	};

	const sortFoodsAsc = () => {
	  let $tbody = $('tbody');
	  $tbody.find('.list').sort(function (a, b) {
	    let tda = $(a).find('td:eq(1)').text();
	    let tdb = $(b).find('td:eq(1)').text();
	    return tda < tdb ? -1 : tda > tdb ? 1 : 0;
	  }).appendTo($tbody);
	};

	const filter = element => {
	  let inputValue = $(element).val().toLowerCase();
	  let tableRows = $("#foodTable").find("tr.list");
	  tableRows.hide();
	  tableRows.each(function (index) {
	    let $currentData = $(this).text();
	    let $lower = $currentData.toLowerCase();
	    if ($lower.indexOf(inputValue) > -1) {
	      $(this).show();
	      return true;
	    }
	  });
	  return false;
	};

	module.exports = { sortFoodsDesc, sortFoodsAsc, filter };

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./index_styling.scss", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./index_styling.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "label, h2, h3, td, th {\n  font-family: \"Arial\";\n  text-align: center; }\n\na.button {\n  -webkit-appearance: button;\n  -moz-appearance: button;\n  appearance: button;\n  text-decoration: none;\n  color: initial; }\n\ndiv {\n  display: block; }\n\ndiv.right {\n  width: 40%; }\n\ndiv.left {\n  width: 40%; }\n\ndiv.left1 {\n  width: 40%; }\n\ndiv.left2 {\n  width: 40%; }\n\ndiv.right1 {\n  width: 40%; }\n\ndiv.total-calories {\n  width: 40%;\n  float: right; }\n\ntable {\n  border-collapse: collapse;\n  width: 100%;\n  background-color: #edf7f9; }\n\nul.buttons {\n  list-style-type: none; }\n\nli {\n  display: inline; }\n", ""]);

	// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	let localURL = "https://quantified-self-node.herokuapp.com";

	$(document).ready(function () {
	  createTableContents();
	  searchFoods();
	});

	function searchFoods() {
	  $('#searchInput').keyup(function () {
	    filter(this);
	  });
	}

	function createTableContents() {
	  $.get(`${localURL}/api/v1/meals`).then(function (meals) {
	    meals.forEach(function (meal, i) {
	      generateTable(meal);
	      let mealName = meal.name;
	      let mealId = meal.id;
	      meal.foods.forEach(function (food) {
	        $(`table.${mealName} > tbody`).append(`<tr><td class=food-name id=${food.id}>` + food.name + "</td><td class='total'>" + food.calories + "</td></tr>");
	      });
	      let totalReturnedMealCalories = calculateTotalMealCalories(mealName);
	      calorieCounter(mealName, i, totalReturnedMealCalories);
	    });
	    totalCalories();
	    hideDeleteButtons();
	    addCheckboxes();
	    addToMealTable();
	    addDeleteButtons();
	    deleteClickedRows();
	  }).catch(function (error) {
	    console.error(error);
	  });
	}

	function updateTableContents() {
	  $.get(`${localURL}/api/v1/meals`).then(function (meals) {
	    meals.forEach(function (meal, i) {
	      generateTable(meal);
	      let mealName = meal.name;
	      let mealId = meal.id;
	      meal.foods.forEach(function (food) {
	        $(`table.${mealName} > tbody`).append(`<tr><td class=food-name id=${food.id}>` + food.name + "</td><td class='total'>" + food.calories + "</td></tr>");
	      });
	      let totalReturnedMealCalories = calculateTotalMealCalories(mealName);
	      calorieCounter(mealName, i, totalReturnedMealCalories);
	    });
	    totalCalories();
	    hideDeleteButtons();
	    addCheckboxes();
	    addDeleteButtons();
	    deleteClickedRows();
	  }).catch(function (error) {
	    console.error(error);
	  });
	}

	function calculateTotalMealCalories(mealName) {
	  let totalMealCalories = 0;
	  $(`table.${mealName} .total`).each(function () {
	    totalMealCalories += parseFloat($(this).text());
	  });
	  return totalMealCalories;
	}

	function addToMealTable() {
	  $("li").on("click", function () {
	    let mealId = $(this).children().attr("class");
	    let mealName = $(this).children().attr("value");
	    collectTableSelection(mealId);
	    calculateTotalMealCalories(mealName);
	    removeCheckedBoxes();
	    reloadTables();
	  });
	}

	function deleteClickedRows() {
	  $(".remove-row").on("click", function () {
	    let mealId = $(this).closest("div").attr("id");
	    let idOfFood = $(this).closest("tr").find(".food-name").attr("id");
	    let foodName = $(this).closest("tr").find(".food-name").text();
	    $.ajax({
	      url: "https://quantified-self-node.herokuapp.com/api/v1/meals/" + mealId + "/foods/" + idOfFood,
	      type: "DELETE",
	      success: function (result) {
	        alert("Successfully deleted " + foodName);
	      }
	    });
	    $(this).closest("tr").remove();
	    reloadTables();
	  });
	}

	function reloadTables() {
	  eraseTableContents();
	  updateTableContents();
	}

	function eraseTableContents() {
	  $(".meal").remove();
	}

	function addDeleteButtons() {
	  if (!$(".total").next().length) {
	    $(".total").after('<td><input class=remove-row type=button value=delete /></td>');
	  }
	}

	function collectTableSelection(mealId) {
	  $.each($("#foodTable :checkbox:checked"), function () {
	    let idOfFood = $(this).closest("tr").find("td:eq(3)").children().attr("id");
	    $.post("https://quantified-self-node.herokuapp.com/api/v1/meals/" + mealId + "/foods/" + idOfFood, function (data) {});
	    let foodName = $(this).closest("td").next().text();
	    let foodCalories = $(this).closest("td").next().next().text();
	    $("#" + mealId + " table tbody").append(`<tr><td class=food-name id=${idOfFood}>` + foodName + "</td><td>" + foodCalories + "</td><td><input class=remove-row type=button value=delete /></td></tr>");
	  });
	}

	function removeCheckedBoxes() {
	  $("#foodTable input:checkbox").prop("checked", false);
	}

	function addCheckboxes() {
	  if (!$(".left2 tr").find(".food-checkbox").length > 0) {
	    $(".left2 > #foodTable > tbody").find(".list").prepend('<td class="food-checkbox"><input type="checkbox"/></td>');
	    $(".left2 > #foodTable > tbody").find("#headers").prepend('<span/>');
	  }
	}

	function hideDeleteButtons() {
	  $(".left2 > #foodTable > tbody").find(".delete-row").hide();
	}

	function calorieCounter(mealName, i, totalReturnedMealCalories) {
	  let goalCalories = [400, 200, 600, 800][i];
	  $(`table.${mealName} > tfoot > tr#total`).append("<td class='sum'>" + totalReturnedMealCalories + "</td>");
	  let remainingCalories = goalCalories - totalReturnedMealCalories;
	  $(`table.${mealName} > tfoot > tr#goal`).append("<td>" + remainingCalories + "</td>");
	  $(`table.${mealName} > tfoot > tr#goal > td`).addClass('green');
	  $(`table.${mealName} > tfoot > tr#goal > td:contains('-')`).addClass('red');
	}

	function totalCalories() {
	  let caloriesConsumed = 0;
	  $(".sum").each(function () {
	    caloriesConsumed += parseFloat($(this).text());
	  });
	  $(".total-calories").append($totalsTable);
	  $("tr#total-calories > th:eq(1)").html(caloriesConsumed);
	  $("tr#total-goal > td").html(2000 - caloriesConsumed);
	  $("tr#total-goal > td").addClass('green');
	  $("tr#total-goal > td:contains('-')").addClass('red');
	}

	function generateTable(meal) {
	  let table = new Table();
	  if (meal.id === 1) {
	    $("div.left").append(table.tableBody.addClass(meal.name).addClass("meal"));
	  } else if (meal.id === 2) {
	    $("div.right").append(table.tableBody.addClass(meal.name).addClass("meal"));
	  } else if (meal.id === 3) {
	    $("div.left1").append(table.tableBody.addClass(meal.name).addClass("meal"));
	  } else if (meal.id === 4) {
	    $("div.right1").append(table.tableBody.addClass(meal.name).addClass("meal"));
	  }
	}

	class Table {
	  constructor() {
	    this.tableBody = $('<table/>').append($("<thead/>").append($("<tr/>").append($("<th/>").text("Name"), $("<th/>").text("Calories"))), $("<tbody/>").append("<tr/>"), $("<tfoot/>").append($("<tr/>", {
	      id: "total"
	    }).append($("<th/>").text("Total Calories:")), $("<tr/>", {
	      id: "goal"
	    }).append($("<th/>").text("Remaining Calories:"))));
	  }
	}

	const $totalsTable = $('<table/>').append($("<tfoot/>").append($("<tr/>", {
	  id: "total"
	}).append($("<th/>").text("Goal Calories"), $("<th/>").text(2000)), $("<tr/>", {
	  id: "total-calories"
	}).append($("<th/>").text("Calories Consumed"), $("<th/>")), $("<tr/>", {
	  id: "total-goal"
	}).append($("<th/>").text("Remaining Calories"), $("<td />")))).addClass("meal");

/***/ })
/******/ ]);