// jshint esversion: 6

$(document).ready(function() {

    let setTimer;
    let score = 0;
    let count = 0;

    $("#score").hide();

    function getQA() {
        $.ajax({
            type: "GET",
            url: "https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple",
            success: function(data) {
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
        if (width >= 5) {
                width -= 5;
                progressbar.attr("data", width);
                progressbar.css("width", width + "%");
        } else {
            timesup();
        }
    }

    function timesup() {
        clearInterval(timer);
        showAnswer();
    }

    function reset() {
        // reset list items
        let CA = $("li");
        CA.css({ 'background-color':'rgba(46, 40, 49, 1)', 'color':'rgba(240, 247, 238, 1)'});
        CA.removeAttr("data");
        // reset progress bar
        let progressbar = $(".progress-bar");
        progressbar.attr("data", "100");
        progressbar.css("width", 100 + "%");
    }


    function init() {
        // reset variables
        count = 0;
        score = 0;
        // reset styling
        reset();
        // show/hide correct elements
        $("#score").hide();
        $("#game").show();
        if ($("#start").css("display") !== "none") {
            $("#start").hide();
            $("#stop").show();
        }
        // get Question and Answer
        getQA();
        // set timer
        setTimer = setInterval(timer, 1000);
    }

    function showAnswer(e=null) {
        clearInterval(setTimer);
        let CA = $("li[data=correct-answer]");
        CA.css({ 'background-color':'rgba(240, 247, 238, 1)', 'color':'rgba(46, 40, 49, 1)'});
        setTimeout(reset, 1000 * 5);
        setTimeout(getQA, 1000 * 5);
        setTimeout(function(){
            setTimer = setInterval(timer, 1000);
        }, 1000 * 5);
        if (e !== null) {
            if ($(e.target).attr("data") !== undefined) {
                score += 1;
                count += 1;
                console.log(score, count);
            } else {
                $(e.target).css({ 'background-color': 'red'});
                count += 1;
                console.log(score, count);
            }
        } else {
            count += 1;
            console.log(score, count);
        }

    }

    function getScore() {
        clearInterval(setTimer);
        $("#stop").hide();
        $("#start").show();
        $("#game").hide();
        $("#score").show();
        $("#score").html("<h1>You got " + score + " out of " + count + " questions right!</h1>");
    }
    
    $("#start").on("click", init);
    $("li").on("click", function(e){showAnswer(e);});
    $("#stop").on("click", getScore);
    


});