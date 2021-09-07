$(document).ready(function(){

});

function create_from_image(){
    console.log("image");
    if($("#scratch").css("display") != "none"){
        $("#scratch").css("display", "none");
        $("#image").css("width", document.getElementById("image").clientWidth);
        $("#image").css("height", document.getElementById("image").clientHeight);
        $("#image").css("position", "fixed");
        $("#image").css("left", (document.body.clientWidth / 2) - (document.getElementById("image").clientWidth / 2));
        $("#image").css("background-color", "rgba(177, 227, 225, 0.5)");
        $("#image").css("transform", "scale(1)");

        setTimeout(() => {
            $("#image").css("width", "100%");
            $("#image").css("left", "0");
            //$("#image").children().css("transform", "scale(1.2)");
            setTimeout(() => {
                cover();
                setTimeout(() => {
                    $("#split").css("display", "none");
                    $("#create").css("display", "block");
                }, 500);
            }, 800);
        }, 300);
    }
}

function create_from_scratch(){
    console.log("scratch");
    if($("#image").css("display") != "none"){
        $("#image").css("display", "none");
        $("#scratch").css("width", document.getElementById("scratch").clientWidth);
        $("#scratch").css("height", document.getElementById("scratch").clientHeight);
        $("#scratch").css("position", "fixed");
        $("#scratch").css("right", (document.body.clientWidth / 2) - (document.getElementById("scratch").clientWidth / 2));
        $("#scratch").css("background-color", "rgba(177, 227, 225, 0.5)");
        $("#scratch").css("transform", "scale(1)");

        setTimeout(() => {
            $("#scratch").css("width", "100%");
            $("#scratch").css("right", "0");
            //$("#scratch").children().css("transform", "scale(1.2)");
            setTimeout(() => {
                cover();
                setTimeout(() => {
                    $("#split").css("display", "none");
                    $("#create").css("display", "block");
                }, 500);
            }, 800);
        }, 300);
    }
}