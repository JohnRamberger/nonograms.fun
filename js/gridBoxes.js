function clickGrid(e)
{
    var box = document.getElementById(e.target.id);
    if(box.style.backgroundColor == "white")
    {
        box.style.backgroundColor = "black";
        box.style.border = "1px solid white";
    }
    else if(box.style.backgroundColor == "black")
    {
        box.style.backgroundColor = "#e74c3c";
        box.style.border = "1px solid black";
    }
    else
    {
        box.style.backgroundColor = "white";
    }
}