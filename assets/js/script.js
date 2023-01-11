console.log("hello world");

// Gets previous searches from local storage
var storedHistory = JSON.parse(localStorage.getItem("storedHistory")) || [];

if (storedHistory.length > 0) {
  wordDefinition(storedHistory[storedHistory.length - 1]);
}

for (var i = 0; i < storedHistory.length; i++) {
    
    // Appends the row to history div
    wordHistory(storedHistory[i]);
}

// Creating header
var h4El = $("<h4>").text("Recent Searched Words");
    h4El.css("display", "none");
    h4El.addClass("header-history");
    $("#history").append(h4El);

function wordHistory(btn) {
    

    var wordBtn = $("<button>");
    wordBtn.addClass("btn btn-sm history-btn");
    wordBtn.text(btn);
    $("#history").append(wordBtn);
}

$("#history").on("click", ".btn", function () {

    $("#meme-display").empty();
    $("#words-display").empty();
    $("#searched-word").empty();

    $("#memes").hide();
    $("#words").hide();
    $("#about").hide();
    $(".results-gifs").show();
    $('html,body').animate({scrollTop: $("#result").offset().top}, 500);

    wordDefinition($(this).text());
    renderGif($(this).text());
  });


function renderGif(wordSearch) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=6YBZyDMzPgGymZCqE5zHPD0fYhwaMlgK&q=" + wordSearch + "&limit=1&offset=0&rating=g&lang=en";
    $.ajax({
    url: queryURL,
    method: "GET",
}).then(function (response) {
    console.log(response);
    console.log(queryURL);

    if (storedHistory.indexOf(wordSearch) === -1) {
        // Pushing the search word into history array
        storedHistory.push(wordSearch);
  
        // Storing the searched word
        localStorage.setItem("storedHistory", JSON.stringify(storedHistory));
        wordHistory(wordSearch);
  
      }
      
      $("#searched-word").empty();
    
    var giffy = response.data;

    for (var i = 0; i < giffy.length; i++) {

        var gifPoster = $('<img>').attr('src', giffy[i].images.downsized_large.url);
        gifPoster.addClass("img-fluid gif");
        $('#meme-display').append(gifPoster);
    };

});
fetch(queryURL);
};

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


$("#search-button").on("click", function (event) {
    event.preventDefault();
    $("#meme-display").empty();
    $("#words-display").empty();
    $("#searched-word").empty();

    // Getting the value in
    var wordSearch = $("#search-query").val().trim();
  
    // Empty input field
    $("#search-query").val("");
    
    $("#memes").hide();
    $("#words").hide();
    $("#about").hide();
    $(".results-gifs").show();
    $(".header-history").show();
    $('html,body').animate({scrollTop: $("#result").offset().top}, 500);
    
  renderGif(wordSearch);
  wordDefinition(wordSearch);
  });
