var hoverid = "";
$(document).on('mouseover', function(e) {
    hoverid = $(e.target).attr('id');
    document.getElementById("hoverid").innerHTML = $(e.target).prop("tagName").toLowerCase() + " #" + $(e.target).attr("id") + " ." + $(e.target).attr("class");
});
$(document).ready(function(e){
    const container = document.getElementById('body');
    let markup = `<div id="hoverid" style="position:fixed;
                                           z-index:100;
                                           background-color:rgba(255, 255, 255, 0.6);
                                           left:2em;
                                           bottom:2em;
                                           border-radius:3px;
                                           color:black;
                                           padding:1em;
                                           font-size:15px;"</div>`;
    container.innerHTML += markup;
});