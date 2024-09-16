$(".fp").fadeIn(5000).css("display", "flex");
    $(".fp-btn").click(function () {

        $(".fp").css({
            "top": "-100vh"
        });
        
        $(".chatWidget").fadeIn(5000).css("visibility", "visible");
        

    });