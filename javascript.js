var topics = ["Aragorn", "Gimli", "Gandalf", "Boromir", "Legolas", "Frodo", "Merry", "Pippen", "Samwise"];
console.log(topics);


function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");
        // Adding a class
        a.addClass("topic");
        // Added a data-attribute
        a.attr("data-name", topics[i]);
        a.attr("class", "button");
        // Provided the initial button text
        a.text(topics[i]);
        // Added the button to the HTML
        $("#buttons-view").append(a);
      }
    }

renderButtons();

$("#add-topic").on("click", function(event) {
  event.preventDefault();

  var topic = $("#topic-input").val().trim();

  topics.push(topic);

  renderButtons();
});

  $(document).on("click", ".gif", function() {


      var state = $(this).attr("data-state");

      if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else if(state === "animate"){
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

  });

  $(document).on("click", ".button", function() {
    var name = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      name + "&api_key=i7OkWTd9B2y6s0k2dV1N0qhxIzvOTMfP&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
     console.log(response);

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var nameDiv = $("<div>");
        var p = $("<p>");
        p.text("Rating: " + results[i].rating);
        var nameImage = $("<img>");
        nameImage.attr("src", results[i].images.fixed_height_still.url);
        nameImage.attr("data-still", results[i].images.fixed_height_still.url);
        nameImage.attr("data-animate", results[i].images.fixed_height.url);
        nameImage.attr("data-state", "still");
        nameImage.attr("class", "gif");
        nameDiv.append(p);
        nameDiv.append(nameImage);
        $("#gifs-appear-here").prepend(nameDiv);
       }

    });
  });

