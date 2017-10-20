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
	__webpack_require__(6);
	__webpack_require__(8);

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
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./foods-styling.scss", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./foods-styling.scss");
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
	exports.push([module.id, "#food-table {\n  width: 25%;\n  border: 2px solid black; }\n\n#food-table table {\n  width: auto;\n  border-collapse: collapse; }\n\n.list:hover {\n  background-color: #f5f5f5; }\n\ntd {\n  padding: 5px; }\n\ntd {\n  text-align: center; }\n\n.add-food-form {\n  width: 25%; }\n\n.sub-name {\n  text-align: right;\n  color: red; }\n\n.sub-calories {\n  text-align: right;\n  color: red; }\n", ""]);

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
/***/ (function(module, exports) {

	let localURL = "https://quantified-self-node.herokuapp.com";

	$(document).ready(function () {
	  getFoods();
	  errorMessage();
	  createFoodHandler();
	  // foodsFilterHandler();
	  // listenToEdit();
	}); //end of document.ready

	// start of AJAX call to get all foods currently in db
	function getFoods() {
	  $.get(`${localURL}/api/v1/foods`).then(function (foods) {
	    foods.reverse();
	    createFoodTable(); // reverse list of foods in response
	    foods.forEach(function (food) {
	      $("#foodTable").find('tbody').append($(`<tr id=${food.id} class=list>`).append($(`<td class=edit-name contenteditable=true>${food.name}</td> <td class=edit-calories contenteditable=true>${food.calories}</td><td class=delete-row><input class=delete-food type=button name=delete-food id=${food.id} value=delete </td>`)));
	    });
	  });
	} // end of getFoods();

	// function listenToEdit(){
	$(document).on('focus', '#foodTable > td', function () {
	  $(this).data("initialText", $(this).html());
	  $(document).on('blur', 'td', function () {
	    // does this logic work if updating more than one td element at a time
	    // ...if content is different...
	    if ($(this).data("initialText") == $(this).html()) {
	      event.preventDefault();
	    } else {
	      const newName = $(this.parentElement.children[0]).html();
	      const newCalories = $(this.parentElement.children[1]).html();
	      const foodId = `${this.parentElement.id}`;
	      $.ajax({
	        url: `${localURL}/api/v1/foods/${foodId}`,
	        type: 'PATCH',
	        data: { food: { name: `${newName}`, calories: `${newCalories}` } },
	        success: function (response) {
	          getFoods();
	        },
	        error: function () {
	          alert("Error");
	        }
	      });
	    };
	  });
	});

	// delete food handler
	let itemId;

	$(document).on('click', '.delete-food', function () {
	  itemId = this.id;
	  let deleteRow = this.parentElement.parentElement;
	  console.log(`clicked delete for item with id: ${itemId}`);
	  $.ajax({
	    url: `${localURL}/api/v1/foods/${itemId}`,
	    type: 'DELETE',
	    success: function () {
	      deleteRow.remove(); // deletes foods not in meals
	    },
	    error: function () {
	      alert("Error");
	      deleteFoodMeal(itemId);
	    }
	  });
	});

	function deleteFoodMeal(itemId) {
	  //let mealsWithFood;
	  $.get(`${localURL}/api/v1/meals`).then(function (meals) {
	    meals.forEach(function (meal) {
	      if (meal.foods.ids == itemId) {
	        let mealId = meal.id;
	        $.ajax({
	          url: `${localURL}/api/v1/meals/${mealId}/foods/${itemId}`, //destroy join table record
	          type: 'DELETE',
	          success: function () {
	            $.ajax({
	              url: `${localURL}/api/v1/foods/${itemId}`,
	              type: 'DELETE',
	              success: function () {
	                deleteRow.remove(); // deletes foods not in meals
	              },
	              error: function () {
	                alert("Error in deleting food after deleting food meal join");
	              }
	            });
	          }
	        }); //end delete join record
	      } // close if statement
	    }); // close forEach
	  });
	}

	// food filter handler
	$('#searchInput').keyup(function () {
	  filter(this);
	});

	//foods filtering case insensitive
	function filter(element) {
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
	}

	function errorMessage() {
	  $(".sub-name").hide();
	  $(".sub-calories").hide();
	}

	// new food form handler
	function createFoodHandler() {
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
	      createFoodCall();
	    }
	  });
	}

	// start ajax post call
	function createFoodCall() {
	  $.ajax({
	    url: `${localURL}/api/v1/foods`,
	    type: 'POST',
	    beforeSend: function (xhr) {
	      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
	    },
	    data: { food: { name: `${$(".new-food-name").val()}`, calories: `${$(".new-food-calories").val()}` } },
	    success: function (response) {
	      getFoods();
	    }
	  });
	}
	// end of ajax post call function


	function createFoodTable() {
	  var table = $("<table id=foodTable>").appendTo('#food-table'),
	      tbody = $("<tbody>").appendTo(table),
	      headersRow = $("<tr id=headers>").appendTo(tbody),
	      headerName = $("<th>").text("Food Name").appendTo(headersRow),
	      headerCalories = $("<th>").text("Calories").appendTo(headersRow),
	      newFoodRow = $("<tr id=result>").appendTo("table tr:last");
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./index_styling.scss", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./index_styling.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "a.button {\n  -webkit-appearance: button;\n  -moz-appearance: button;\n  appearance: button;\n  text-decoration: none;\n  color: initial; }\n\ntd.green {\n  color: green; }\n\ntd.red {\n  color: red; }\n\ndiv.right {\n  width: 40%;\n  float: right;\n  padding-right: 80px;\n  padding-bottom: 40px; }\n\ndiv.left {\n  width: 40%;\n  float: left;\n  padding-bottom: 40px; }\n\ndiv.left1 {\n  width: 40%;\n  float: left; }\n\ndiv.left2 {\n  width: 40%;\n  float: left;\n  padding-top: 90px; }\n\ndiv.right1 {\n  width: 40%;\n  float: right;\n  padding-right: 80px; }\n\ndiv.total-calories {\n  width: 40%;\n  float: right;\n  padding-right: 80px;\n  padding-top: 40px; }\n\ntable {\n  border-collapse: collapse;\n  width: 100%; }\n\ntable.left {\n  float: left; }\n\ntable.right {\n  float: right; }\n\n.diary-food {\n  border: 1px solid #000000;\n  text-align: left;\n  padding: 10px; }\n\nthead, tfoot {\n  background-color: #dddddd; }\n", ""]);

	// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	let localURL = "https://quantified-self-node.herokuapp.com";

	$(document).ready(function () {
	  createTableContents();
	  $('#searchInput').keyup(function () {
	    filter(this);
	  });
	});

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
	    let i = parseInt(mealId) - 1;
	    collectTableSelection(mealId);
	    let totalCals = calculateTotalMealCalories(mealName);
	    calorieCounter(mealName, i, totalCals);
	    removeCheckedBoxes();
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
	      },
	      error: function () {
	        alert("error");
	      }
	    });
	    $(this).closest("tr").remove();
	  });
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
	    $("#" + mealId + " table > tbody").append(`<tr><td class=food-name id=${idOfFood}>` + foodName + "</td><td>" + foodCalories + "</td><td><input class=remove-row type=button value=delete /></td></tr>");
	    deleteClickedRows();
	  });
	}

	function removeCheckedBoxes() {
	  $("#foodTable input:checkbox").prop("checked", false);
	}

	function addCheckboxes() {
	  $(".left2 > #foodTable > tbody").find(".list").prepend('<td><input type="checkbox"/></td>');
	  $(".left2 > #foodTable > tbody").find("#headers").prepend('<span/>');
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
	  $("tr#total-calories").append("<th>" + caloriesConsumed + "</th>");
	  $("tr#total-goal").append("<td>" + (2000 - caloriesConsumed) + "</td>");
	  $("tr#total-goal > td").addClass('green');
	  $("tr#total-goal > td:contains('-')").addClass('red');
	}

	function generateTable(meal) {
	  let table = new Table();
	  if (meal.id === 1) {
	    $("div.left").append(table.tableBody.addClass(meal.name));
	  } else if (meal.id === 2) {
	    $("div.right").append(table.tableBody.addClass(meal.name));
	  } else if (meal.id === 3) {
	    $("div.left1").append(table.tableBody.addClass(meal.name));
	  } else if (meal.id === 4) {
	    $("div.right1").append(table.tableBody.addClass(meal.name));
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

	var $totalsTable = $('<table/>').append($("<tfoot/>").append($("<tr/>", {
	  id: "total"
	}).append($("<th/>").text("Goal Calories"), $("<th/>").text(2000)), $("<tr/>", {
	  id: "total-calories"
	}).append($("<th/>").text("Calories Consumed")), $("<tr/>", {
	  id: "total-goal"
	}).append($("<th/>").text("Remaining Calories"))));

/***/ })
/******/ ]);