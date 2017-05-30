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
                        element.attr("data", "correct-answer");
                    } else {
                        element.html(results.incorrect_answers[i]);
                    }
                }
            }
        });
    }

    function timer() {
        let progressbar = $(".progress-bar");
        width = progressbar.attr("data");
        if (width >= 0) {
                width -= 5;
                progressbar.attr("data", width);
                progressbar.css("width", width + "%");
        }
    }

    function timesup() {
        clearInterval();
        let CA = $("li[data=correct-answer]");
        CA.css({ 'background-color':'rgba(240, 247, 238, 1)', 'color':'rgba(46, 40, 49, 1)'});
    }

    function reset() {
        let CA = $("li[data=correct-answer]");
        CA.css({ 'background-color':'rgba(46, 40, 49, 1)', 'color':'rgba(240, 247, 238, 1)'});
        CA.removeAttr("data");
    }


    function init() {
        getQA();
        setInterval(timer, 1000);
        setTimeout(timesup, 1000 * 20);
        setTimeout(reset, 1000 * 25);
    }

    init();
    
    $(".btn").on("click", init);
    $("li").on("click", function(e) {
        if ($(e.target).attr("data") !== "undefined") {
            
        };
    });
    


});