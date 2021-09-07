$(document).ready(function(){
    //get all unfinished puzzles and information from database
    var _email = "";
    if(checkIfLoggedIn()){
        _email = getEmail();
        //console.log(_email);
        var username = getUsername();
        let markup = `<span id="plane" alt="sign out" class="fa fa-plane"></span>`;
        document.getElementsByClassName("name")[0].innerHTML = username + markup;
    }
    else{
        alert("not logged in!");
        window.location.href = "index.html";
    }
    document.getElementById("loader").style.display = "block";
    var data = {action: 'gupi', email: _email};
    $.ajax({
        url:ajaxurl,
        type:"POST",
        dataType:'json',
        data: data,
        success: function(data){
            //console.log(data);
            data.forEach(function(item, index){
                var data = {action: 'get_puzzle', puzzle_id: item[0]};
                $.ajax({
                    url:ajaxurl,
                    type:"POST",
                    dataType:'json',
                    data: data,
                    async:false,
                    success: function(data){
                        var puzzle = data[1];
                        var rows = getRows(puzzle);
                        var cols = getCols(puzzle);
                        //console.log("rows:"+ rows + " cols:" + cols);
                        draw(rows, cols, puzzle, data[0], data[2], item[0], index); 
                    },
                    error: function(xhr, status, error){
                        console.error(error);
                    }
                });
                
            });
            finish();
        },
        error: function(xhr, status, error){
            console.error(error);
        }
    });   
})

function draw(rows, cols, fill, difficulty, datestr, id, index){
    let cellmarkup = ``;
    let row = fill.split(";");
    row.forEach(function(item, index){
        let col = item.split(",");
        col.forEach(function(i){
            let color = "white";
            if(i == 1){
                color = "black";
            } else if(i == -1){
                color = "#e74c3c";
            }
            cellmarkup += `<div class="puzzcell" style="background:${color};
                                                     display:grid;
                                                     position:relative;
                                                     z-index:1;
                                                     border:1px solid black;
                                                     cursor:pointer;"></div>`;
        });
    });
    var d = new Date(datestr);
    //console.log(datestr);
    let month = getmonth(d.getMonth());
    month = month.charAt(0).toString().toUpperCase() + month.slice(1);
    let day = d.getDate();
    //console.log(day);
    let year = d.getFullYear();
    //console.log(date);
    let min = d.getMinutes();

    var n = d.getTimezoneOffset() / 60;
    let hour = d.getHours() - n;
    if(hour < 0){
        day--;
        hour += 12;
    }else if(hour > 23){
        day++;
        hour -= 12;
    }
    let date = month + " " + day + ", " + year;
    let time = gettime(hour, min);
    //console.log(time);
    let datetime = date + " " + time;
    //console.log(datetime);

    let infomarkup = `<div><span>size: ${rows}x${cols}</span><br><br>
                      <span>difficulty: ${difficulty}</span><br><br>
                      <span>last edited: ${datetime}</span></div>`;
        
    
    let boxmarkup = `  <div class="set" style="order:${index}">
                        <div id="${id}"  class="puzz" style="grid-template-columns:repeat(${cols}, 1fr);
                                                 grid-template-rows:repeat(${rows}, 1fr);">${cellmarkup}</div>
                        <div class="puzzinfo">${infomarkup}</div>
                    </div>`;
    document.getElementById("puzzles_div").innerHTML += boxmarkup;
}

function getRows(fill){
    let rows = fill.split(";");
    return rows.length;
}
function getCols(fill){
    let rows = fill.split(";");
    let cols = rows[0].split(",");
    return cols.length;
}
function finish(){
    if($(".set").css("width") != null){
        let height = $(".set").css("width").replace("px", "");
            $('.puzz').css("height", height / 2);
            $('.set').css("height", height / 2);
    }
    document.getElementById("loader").style.display = "none";
    $('.puzzcell').click(function(event){
        set_current_puzzle(event.target.offsetParent.id);
        window.location.href = "index.html";
    });
    $('#plane').click(function(event){
        signOut();
    });
}

function getmonth(m){
    switch(m){
        case 0:
            return "january";
            break;
        case 1:
            return "february";
            break;
        case 2:
            return "march";
            break;
        case 3:
            return "april";
            break;
        case 4:
            return "may";
            break;
        case 5:
            return "june";
            break;
        case 6:
            return "july";
            break;
        case 7:
            return "august";
            break;
        case 8:
            return "september";
            break;
        case 9:
            return "october";
            break;
        case 10:
            return "november";
            break;
        case 11:
            return "december";
            break;
    }
}
function getday(d){
    d+=1;
    switch(d){
        case 1:
            return "1st";
            break;
        case 2:
            return "2nd";
            break;
        case 3:
            return "3rd";
            break;
        default:
            return d + "th";
    }
}
function gettime(h, m){
    if(m < 10){
        m = "0" + m;
    }
    if(h > 12){
        h -= 12;
        return h + ":" + m + " PM";
    }else{
        return h + ":" + m + " AM";
    }
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}