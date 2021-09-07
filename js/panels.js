var hash = "";
$(document).ready(function(){
    hash = window.location.hash;
    if(hash == "#puzzles"){
        document.getElementById("puzzles_div").style.display = "grid";
        document.getElementById("stats_div").style.display = "none";
        document.getElementById("create_div").style.display = "none";
        //document.getElementById("nav3").style.display = "grid";
        $('.active').removeClass("active");
        $('#puzzles_span').addClass("active");
    }
    else if(hash == "#stats"){
        document.getElementById("puzzles_div").style.display = "none";
        document.getElementById("stats_div").style.display = "block";
        document.getElementById("create_div").style.display = "none";
        //document.getElementById("nav3").style.display = "none";
        $('.active').removeClass("active");
        $('#stats_span').addClass("active");
    }
    else if(hash == "#create"){
        document.getElementById("puzzles_div").style.display = "none";
        document.getElementById("stats_div").style.display = "none";
        document.getElementById("create_div").style.display = "grid";
        //document.getElementById("nav3").style.display = "grid";
        $('.active').removeClass("active");
        $('#create_span').addClass("active");

        let height = $("#plus").css("width").replace("px", "");
            $('.puzz').css("height", height / 2);
            $('.set').css("height", height / 2);
            $('#plus').css("height", height / 2);
    }
    else{
        document.getElementById("puzzles_div").style.display = "grid";
        document.getElementById("stats_div").style.display = "none";
        document.getElementById("create_div").style.display = "none";
        //document.getElementById("nav3").style.display = "grid";
    }


    $("#puzzles_span").click(function(){
        cover();
        setTimeout(() => {
            document.getElementById("puzzles_div").style.display = "grid";
            document.getElementById("stats_div").style.display = "none";
            document.getElementById("create_div").style.display = "none";
            //document.getElementById("nav3").style.display = "grid";
            $('.active').removeClass("active");
            $('#puzzles_span').addClass("active");

            if($(".set").css("width") != null){
                let height = $(".set").css("width").replace("px", "");
                    $('.puzz').css("height", height / 2);
                    $('.set').css("height", height / 2);
                    $('#plus').css("height", height / 2);
            }
        }, 400);
        
    });
    $("#stats_span").click(function(){
        cover();
        setTimeout(() => {
            document.getElementById("puzzles_div").style.display = "none";
            document.getElementById("stats_div").style.display = "block";
            document.getElementById("create_div").style.display = "none";
            //document.getElementById("nav3").style.display = "none";
            $('.active').removeClass("active");
            $('#stats_span').addClass("active");
        }, 400);
    });
    $("#create_span").click(function(){
        cover();
        setTimeout(() => {
            document.getElementById("puzzles_div").style.display = "none";
            document.getElementById("stats_div").style.display = "none";
            document.getElementById("create_div").style.display = "grid";
            //document.getElementById("nav3").style.display = "none";
            $('.active').removeClass("active");
            $('#create_span').addClass("active");

            let height = $("#plus").css("width").replace("px", "");
            $('.puzz').css("height", height / 2);
            $('.set').css("height", height / 2);
            $('#plus').css("height", height / 2);
        }, 400);
    });
});