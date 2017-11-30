var API = "http://localhost:3000";

$(document).ready(function(){
  // #tabs for CRUD actions activated
  $( "#tabs" ).tabs();

  // general form submission prevention
  $('form').on('submit', function(event){
    event.preventDefault();
  });

  var getAllPosts = function() {
    return $.ajax({
      url: API + '/api/v1/posts',
      method: 'GET',
    }).done(function(data) {
      console.log(data);
      for(i = 0; data.length; i++) {
        $('#latest-posts').append('<p class="post">' + data[i].description + '</p>');
      }
    }).fail(function() {
      handleEror();
    })
  }

  var getSinglePost = function() {
    var postId = $(".show-form input[name='show-id']").val();

    return $.ajax({
      url: API + '/api/v1/posts/' + postId,
      method: 'GET',
    }).done(function(data) {
      $('#latest-posts').append('<p class="post">' + data.description + '</p>');
    }).fail(function() {
      handleEror();
    })
  }

  var createNewPost = function() {
    var postDescription = $(".post-form input[name='post-description']").val();

    return $.ajax({
      url: API + '/api/v1/posts',
      method: 'POST',
      data: { post: { description: postDescription } }
    }).done(function(data) {
      $('#latest-posts').append('<p class="post">New post has been created!</p>');
    }).fail(function() {
      handleEror();
    })
  }

  var updatePost = function() {
    var postId = $(".update-form input[name='update-id']").val();
    var postDescription = $(".update-form input[name='post-description']").val();

    return $.ajax({
      url: API + '/api/v1/posts/' + postId,
      method: 'PUT',
      data: { post: { description: postDescription } }
    }).done(function(data) {
      $('#latest-posts').append('<p class="post">New post has been updated!</p>');
    }).fail(function() {
      handleEror();
    })
  }

  var deletePost = function() {
    var postId = $(".delete-form input[name='delete-id']").val();

    return $.ajax({
      url: API + '/api/v1/posts/' + postId,
      method: 'DELETE',
    }).done(function(data) {
      $('#latest-posts').append('<p class="post">This post has been deleted</p>');
    }).fail(function() {
      handleEror();
    })
  }

  var handleEror = function() {
    $('#latest-posts').append('<p class="post">Something went wrong. Try again later</p>');
  }

  $('button[name="button-fetch"]').on('click', getAllPosts);
  $(".show-form input[type='submit']").on('click', getSinglePost);
  $('.post-form input[type="submit"]').on('click', createNewPost);
  $('.update-form input[type="submit"]').on('click', updatePost);
  $('.delete-form input[type="submit"]').on('click', deletePost);
});
