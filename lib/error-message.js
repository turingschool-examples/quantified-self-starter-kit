//   $('#food-name').on('input', function() {
//     var foodName = $(this).val();
//
//     function msg(body) {
//       $(".name-error").text(body).show();
//     };
//
//     function hide() {
//       $(".name-error").hide();
//     };
//
//     if (foodName.length < 1) {
//       msg('Please enter a food name');
//     } else {
//       hide();
//       $(foodName).val('');
//       var testName = new RegExp(/^[a-zA-Z _]+$/);
//       if (!testName.test(foodName)) {
//         msg('Please enter valid letters');
//       } else {
//         hide();
//         if (foodName.length < 3) {
//           msg('Must be at least 3 characters long');
//         } else {
//           hide();
//       }
//     }
//   }
// })
//
//   $('#calorie-count').on('input', function() {
//     var calorieCount = $(this).val();
//     function msg(body) {
//       $(".calories-error").text(body).show();
//     };
//
//     function hide() {
//       $(".calories-error").hide();
//     };
//
//     if (calorieCount.length < 1) {
//       msg('Please enter a calorie count');
//     } else {
//       hide();
//       var testCalorie = new RegExp(/^[0-9]+$/);
//       if (!testCalorie.test(calorieCount)) {
//         msg('Please enter numbers only');
//       } else {
//         hide();
//       }
//     }
//   })
