var hoverid = "";
var mousedown = false;
var color = "pink";
var border = "";
$(document).on('mouseover', function(e) {
    if(!($(e.target).attr('id') == null) && $(e.target).attr('id').includes(":"))
        hoverid = $(e.target).attr('id');
    else
        hoverid = "null";   
    changebox();
});

$(document).on('mousedown', function(e) {
    if(e.button == 0)
    {
        mousedown = true;
        var cell = document.getElementById(hoverid);
        if(hoverid.includes(":") && cell.style.backgroundColor == "white")
        {
            color = "black";
            border = "1px solid white";
        }
        else if(hoverid.includes(":") && cell.style.backgroundColor == "black")
        {
            color = "#e74c3c";
            border = "1px solid black";
        }
        else
        {
            color = "white";
            border = "1px solid black";
        }
        changebox();
    }
});

$(document).on('mouseup', function(e) {
    if(e.button == 0)
    {
        mousedown = false;
        color = "pink";
    }
});

function changebox(){
    if(hoverid.includes(":") && mousedown)
    {//is a cell
        var cell = document.getElementById(hoverid);
        cell.style.backgroundColor = color;
        //cell.style.border = border;
    }
}
