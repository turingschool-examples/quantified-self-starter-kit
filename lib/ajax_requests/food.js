const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";

const getAllFoods = function() {
  $.ajax({
    url: API + '/api/v1/foods',
    method: 'GET',
  }).done(function(data) {
    for(var i = 0; data.length; i++) {
      $('#new_food_table').append('<tr data-id=' + data[i].id + '><td class="food-name-cell">' + data[i].name + '</td><td class="calorie-cell">' + data[i].calories + '</td><td class="delete_row">X</td></tr>');
    }
  }).fail(function() {
    handleError();
  })
};

const filterFoods = function() {
  let filter = $('#search-foods').val().toUpperCase()
  $('.food-name-cell').each(function() {
    if($(this).text().toUpperCase().includes(filter)){
      $(this).parent().show()
    } else {
      $(this).parent().hide()
    }
  })
}

const createNewFood = function() {
  var foodName = $(".new_food_form input[name='food_name']").val();
  var calorieCount = $(".new_food_form input[name='calorie_count']").val();
  return $.ajax({
    url: API + '/api/v1/foods',
    method: 'POST',
    data: { food: {name: foodName, calories: calorieCount} }
  }).done(function(data) {
    // console.log(data)
    $('#new_food_table').prepend('<tr><td class="food-name-cell">' + foodName + '</td><td class="calorie-cell">' + calorieCount + '</td><td class="delete_row">X</td></tr>');
  }).fail(function(error) {
    handleError(error);
  })
};

const updateFood = function(event) {
  var $parentNode = $(event.currentTarget.parentElement)
  var id = $parentNode.data().id
  var foodName = $parentNode.children(".food-name-cell")[0].textContent
  var calories = $parentNode.children(".calorie-cell")[0].textContent

  return $.ajax({
    url: API + '/api/v1/foods/' + id,
    method: 'PATCH',
    data: { food: { name: foodName, calories: calories} },
  }).done(function(data) {
  }).fail(function() {
    handleError();
  })
}

const deleteFood = function(event) {
  var id = event.currentTarget.parentElement.dataset.id
  return $.ajax({
    url: API + '/api/v1/foods/' + id,
    method: 'DELETE',
  }).done(function(data) {
    debugger;
    event.currentTarget.parentElement.remove();
  }).fail(function(error) {
    handleError(error);
  })
}

const sortByCaloriesDesc = function(event) {
  var columns = event.delegateTarget.children[1].children
  var sortedColumns = Array.prototype.slice.call(columns).sort(function(a,b) {
    var ac = Number(a.children[1].outerText)
    var bc = Number(b.children[1].outerText)
    if(ac > bc) {
      return 1;
    }
    if(ac < bc) {
      return -1;
    }
    return 0;
  });
  sortedColumns.forEach(function(column) {
    $('#new_food_table').append(column);
  })
}

const sortByCaloriesAsc = function(event) {
  var columns = event.delegateTarget.children[1].children
  var sortedColumns = Array.prototype.slice.call(columns).sort(function(a,b) {
    var ac = Number(a.children[1].outerText)
    var bc = Number(b.children[1].outerText)
    if(ac > bc) {
      return -1;
    }
    if(ac < bc) {
      return 1;
    }
    return 0;
  });
  sortedColumns.forEach(function(column) {
    $('#new_food_table').append(column);
  })
}

//
// const sortByCaloriesOrig = function(event) {
//   var calorieColumns =
//   var newOrder = calorieColumns.sort(function(a,b) {
//     a - b;
//   });
// }

var handleError = function(error) {
  console.log(error.statusText);
  console.log(error.responseText);
}

  $('#search-foods').on('keyup', filterFoods);
  $('.new_food_form input[type="submit"]').on('click', function(event){
    event.preventDefault();
    createNewFood();
  });
  $('#new_food_table').on('click', '.food-name-cell, .calorie-cell', function(event) {
    $(event.currentTarget).attr('contenteditable','true');
  });
  $('#new_food_table').on('blur', '.food-name-cell, .calorie-cell', function(event) {
    if (event.currentTarget.contentEditable === 'true') {
    $(event.currentTarget).attr('contenteditable','false');
    updateFood(event);
    }
  });
  $('#new_food_table').on('click','.delete_row' ,function(event) {
    deleteFood(event);
  });
  $('#food-table').on('click','#calorie-cell' ,function(event) {
    if (event.currentTarget.dataset.sort === "default") {
      sortByCaloriesDesc(event);
      event.currentTarget.dataset.sort = "desc";
    }
    else if (event.currentTarget.dataset.sort === "desc") {
      sortByCaloriesAsc(event);
      event.currentTarget.dataset.sort = "asc";
    }
    else {
      sortByCaloriesOrig(event);
      event.currentTarget.dataset.sort = "default";
    }
  });

getAllFoods()
