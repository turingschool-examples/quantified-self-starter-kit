const $ = require('jquery')

$(document).ready(function(){
  $(".display").click(function(){
    $(this).hide().siblings(".edit").show().val($(this).text()).focus();
  });

  $(".edit").focusout(function(){
    $(this).hide().siblings(".display").show().text($(this).val());
  });
})
