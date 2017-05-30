// jshint esversion: 6

$(document).ready(function() {

    function getQA() {
        $.ajax({
            type: "GET",
            url: "https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple",
            success: function(data) {
                console.log(data.results[0])
                let results = data.results[0];
                $("#question").html("<h1>" + results.question + "</h1>");
                let answers = $(".answer");
                answers.sort(function() { return 0.5 - Math.random();});
                for (var i = 0; i < answers.length; i++) {
                    var element = $(answers[i]);
                    if (i === 3) {
                        console.log(results.correct_answer);
                        element.html(results.correct_answer);
                    } else {
                        element.html(results.incorrect_answers[i]);
                    }
                }
            }
        });
    }

    $(".btn").on("click", getQA);



});