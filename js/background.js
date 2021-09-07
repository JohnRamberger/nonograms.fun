function setbackgroundimage(url){
    
    document.body.style.background = "url(" + url + ")";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
}

function setbackgroundcolor(color){
    document.body.style.background = color;
    document.getElementById("colpick").style.backgroundColor = color;
    setCookie("body_color", color, 10 * 24);
}

function readCOLOR(color){
    document.body.style.background = color.value.toString();
    document.getElementById("colpick").style.backgroundColor = color.value.toString();
    setCookie("body_color", color.value, 10 * 24);
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.body.style.background = "url(" + e.target.result + ")";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "cover";

            setCookie("body_color", document.body.style.background.toString(), 10 * 24);
        };
        reader.readAsDataURL(input.files[0]);
      }
}

function setnavcolor(color){
    document.getElementById("nav").style.backgroundColor = color;
    document.getElementById("navpick").style.backgroundColor = color;
    setCookie("nav_color", color, 10 * 24);
}

function readNAVCOLOR(color){
    document.getElementById("nav").style.backgroundColor = color.value.toString();
    document.getElementById("navpick").style.backgroundColor = color.value.toString();
    setCookie("nav_color", color.value, 10 * 24);
}

function opennavcolorpicker(){
    document.querySelector("#navpick").click();
}
function opencolorpicker(){
    document.querySelector("#colpick").click();
}
function openimagepicker(){
    document.querySelector("#imgpick").click();
}
