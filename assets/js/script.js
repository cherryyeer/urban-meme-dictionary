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
    $("#words-display").empty();
    
    // Getting the value in
    var wordSearch = $("#search-query").val().trim();
  
    // Empty input field
    $("#search-query").val("");
    
    $("#memes").hide();
    $("#words").hide();
    $("#about").hide();
    $(".results-gifs").show();
    $('html,body').animate({scrollTop: $("#result").offset().top},'slow');
    

  renderGif(wordSearch);
  wordDefinition(wordSearch)
  });

  //   URBAN Dictionary API

function wordDefinition(wordSearch) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=" + wordSearch,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "27c8768c7emshe8136aa61c03913p161fefjsn21fb5db4ef80",
            "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com"
        }
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        var definition = response.list[0].definition;
            var wordParagraph = $("<p>").text(definition);
            $("#words-display").append(wordParagraph);
            var searchedWord = $("<h2>").text(wordSearch);
            $("#searched-word").append(searchedWord);
    });
}