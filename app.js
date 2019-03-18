

var topics = ["science","animation","candy","indiegames","dnd"]

var queryStart = "https://api.giphy.com/v1/gifs/search?api_key=ZuM1Ftq8Mj2UZ4uXo0UE5iYV1nZVJgrp&q=";

var queryEnd = "&limit=10&offset=0&rating=PG&lang=en"


function updateTopics(){
    $("#button-list").html("");

    for(i = 0; i < topics.length; i++){
        nextButton = $("<button class= 'topic'>")

        nextButton.text(topics[i]);

        nextButton.attr("data-topic",topics[i]);

        $("#button-list").append(nextButton);
    }
}

updateTopics();

$("#enter-topic").on("click",function(){

    topics.push($("#topic-input").val().trim());

    $("#topic-input").val("");

    updateTopics();
});

$(document).on("click",".topic",function(){
    var queryURL = queryStart + $(this).attr("data-topic") + queryEnd;

    $.ajax({

        url: queryURL,
        method: "GET"

    }).then(function(response){

        console.log(response);
        $("#gif-list").html("");

        for (i = 0; i < response.data.length; i++){
            var nextGif = response.data[i];

            var newImg = $("<img class = 'gif'>");

            newImg.attr("src",nextGif.images.fixed_height_still.url);

            newImg.attr("data-still-url",nextGif.images.fixed_height_still.url);

            newImg.attr("data-ani-url",nextGif.images.fixed_height.url);

            newImg.attr("data-is-ani","no");

            newImg.attr("alt","image")

            $("#gif-list").append(newImg)

            $("#gif-list").append("<p>" + nextGif.rating + "</p>")
        }
    })
})

$(document).on("click","img",function(){

    console.log("I've been clicked!")

    if($(this).attr("data-is-ani") === "no"){
        $(this).attr("src",$(this).attr("data-ani-url"));

        $(this).attr("data-is-ani","yes");

    }
    else{
        $(this).attr("src",$(this).attr("data-still-url"));

        $(this).attr("data-is-ani","no");

    }
})