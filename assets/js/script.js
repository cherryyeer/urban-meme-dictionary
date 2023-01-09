console.log("hello world");

function renderGif(wordSearch) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=6YBZyDMzPgGymZCqE5zHPD0fYhwaMlgK&q=" + wordSearch + "&limit=1&offset=0&rating=g&lang=en";
    $.ajax({
    url: queryURL,
    method: "GET",
}).then(function (response) {
    console.log(response);
    console.log(queryURL);
    
    var giffy = response.data;

    for (var i = 0; i < giffy.length; i++) {

        var gifPoster = $('<img>').attr('src', giffy[i].images.downsized_large.url);
        gifPoster.addClass(".gif");
        $('#meme-display').append(gifPoster);
    };

});

};


$("#search-button").on("click", function (event) {
    event.preventDefault();
    $("#meme-display").empty();
    
    // Getting the value in
    var wordSearch = $("#search-query").val().trim();
  
    // Empty input field
    $("#search-query").val("");
    
    $("#memes").hide();
    $("#words").hide();
    $("#about").hide();
    $(".results-meme").show();
    $('html,body').animate({scrollTop: $("#result").offset().top},'slow');
    
  console.log("amen");
  renderGif(wordSearch);
  });
