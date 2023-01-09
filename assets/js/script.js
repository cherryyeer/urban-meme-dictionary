console.log("hello world");

// function pageRedirect() {
//     window.location.href = 'results.html';
// }

// $("#search-button").on("click", pageRedirect);

var APIKEY = "AnkeJ6kP7leayWobbEzmORtUfHAcK1xi";
//Creating a function to generate the gifs section and display the gif
$("#searchgifs").on("click", function () {
  //Creating a var to store the user input
  var input = $("#search").val();
  $.get(
    "https://api.giphy.com/v1/gifs/search?q=" +
      input +
      "&api_key=AnkeJ6kP7leayWobbEzmORtUfHAcK1xi&limit=20",
    function (response) {
      // Creating a div to get the section displayed
      var displayGif = $("<div class='display-content'>");

      // Creating an element to have the h2 displayed
      var h2 = $("<h2>").text("Here's a GIF to go with your word");

      // Displaying the h2
      displayGif.append(h2);
  // Creating an element to have the p displayed
      var p = $("<p class='p-meme'>").text(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. At iusto totam ratione numquam eos impedit nisi consectetur neque aspernatur incidunt, quos deserunt asperiores harum possimus ea esse cupiditate temporibus ad."
      );

      // Displaying the p
      displayGif.append(p);

      // Retrieving the URL for the GIF
      var imgURL = response.data[0].images.downsized_large.url;

      // Creating an element to hold the image
      var image = $("<img class='gif'>").attr("src", imgURL);

      // Appending the GIf
      displayGif.append(image);

      // Display the requested GIF
      $("#display-gifs").prepend(displayGif);
    }
  );
});
