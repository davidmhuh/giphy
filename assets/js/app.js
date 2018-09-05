//var topics thingy = alcohol for me :)//
var boozes = ["rum", "beer", "gin", "whiskey", "sake", "bourbon", "tequila"];

//get this shit working//
function displayBoozeInfo() {

    var booze = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=aQvv3A6mv1DUC1AfAJq1WyrrcWAcNw9P&q=" + booze + " &limit=10&offset=0&rating=G&lang=en";

    //good ole ajax part//
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);


        // loop to grab data from api//
        for (var i = 0; i < response.data.length; i++) {
            var boozeDiv = $("<div class='booze'>");
            var rating = response.data[i].rating;
            var pOne = $("<p>").text("Rating: " + rating);
            var gif = $("<img class = 'gif-img'>").attr("src", response.data[i].images.fixed_height_still.url);
            gif.attr("data-animate", response.data[i].images.fixed_height.url);
            gif.attr("data-still", response.data[i].images.fixed_height_still.url);
            gif.attr("data-state", "still");
            boozeDiv.append(pOne, gif);
            $("#booze-view").prepend(boozeDiv);
        }

        // this part gets gif to work //
        $(".gif-img").on("click", function () {

            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }


        });

    });

}
// buttons // 
function renderButtons() {


    $("#buttons-view").empty();

    for (var i = 0; i < boozes.length; i++) {

        var a = $("<button>");
        a.addClass("booze-btn");
        a.attr("data-name", boozes[i]);
        a.text(boozes[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-booze").on("click", function (event) {
    event.preventDefault();
    var booze = $("#booze-input").val().trim();
    boozes.push(booze);

    renderButtons();
});

$(document).on("click", ".booze-btn", displayBoozeInfo);

renderButtons();
