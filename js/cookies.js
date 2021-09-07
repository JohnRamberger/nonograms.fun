
function setCookie(cname, cvalue, exhours) {
    var d = new Date();
    d.setTime(d.getTime() + (exhours*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function deleteCookie(cname){
    document.cookie = cname + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
}

var one = false, two = false, three = false;

function startup(){
    if(checkIfLoggedIn()){
        //logged in - delete cookies
        let _email = getEmail();

        var data = {action: 'set_score', email: _email, score: getCookie("score")};
        $.ajax({
            url:ajaxurl,
            type:"POST",
            dataType:'json',
            data:data,
            success: function(data){
                //console.log(data);
            },
            error: function(xhr, status, error){
                console.warn("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
            }
        });

        deleteCookie("size");
        deleteCookie("score");
        deleteCookie("difficulty");

        data = {action: 'get_size', email: _email};
        $.ajax({
            url:ajaxurl,
            type:"POST",
            dataType:'json',
            data:data,
            async:false,
            success: function(data){
                //console.log(data);
                var rows = document.getElementById("rows");
                var cols = document.getElementById("cols");
                var sizes = data.split("x");
                rows.value = sizes[0];
                cols.value = sizes[1];
                //console.log("one");
                one = true;
            },
            error: function(xhr, status, error){
                console.warn("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
            }
        });
        data = {action: 'get_difficulty', email: _email};
        $.ajax({
            url:ajaxurl,
            type:"POST",
            dataType:'json',
            data:data,
            async:false,
            success: function(data){
                //console.log(data);
                var selector = document.getElementById("difficulty");
                if(data == "easy")
                    selector.selectedIndex = 0;
                else if(data == "medium")
                    selector.selectedIndex = 1;
                else if(data == "hard")
                    selector.selectedIndex = 2;
                else if(data == "extreme")
                    selector.selectedIndex = 3;
                    //console.log("two");
                    two = true;
            },
            error: function(xhr, status, error){
                console.warn("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
            }
        });
        data = {action: 'get_score', email: _email};
        $.ajax({
            url:ajaxurl,
            type:"POST",
            dataType:'json',
            data:data,
            async:false,
            success: function(data){
                //console.log(data);
                document.getElementById("score").innerHTML = data;
                //console.log("three");
                three = true;
            },
            error: function(xhr, status, error){
                console.warn("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
            }
        });
        if(check_puzzle()){
            //generate current puzzle
            console.log("load puzzle - puid: " + get_current_puzzle());
            createfromid(get_current_puzzle());
        } else{
            //generate new puzzle
            console.log("generate new puzzle");
            create();
        }
    }else{
        //not logged in - setup cookies
        if(getCookie("size") == "" || getCookie("size") == "x")
        setCookie("size", "5x5", 10 * 24);
        //set the size of the puzzle
        var rows = document.getElementById("rows");
        var cols = document.getElementById("cols");
        var size = getCookie("size");
        var sizes = size.split("x");
        rows.value = sizes[0];
        cols.value = sizes[1];

        if(getCookie("difficulty") == "")
            setCookie("difficulty", "easy", 10 * 24)
        var difficuly = getCookie("difficulty");
        var selector = document.getElementById("difficulty");
        if(difficuly == "easy")
            selector.selectedIndex = 0;
        else if(difficuly == "medium")
            selector.selectedIndex = 1;
        else if(difficuly == "hard")
            selector.selectedIndex = 2;
        else if(difficuly == "extreme")
            selector.selectedIndex = 3;

        if(getCookie("score") == "")
            setCookie("score", "0", 10 * 24)
        var score = getCookie("score");
        document.getElementById("score").innerHTML = score;
        create();
    }    
}
var count = 0;
var gap = 50;
function waitfor(){
    if(one && two && three){
        if(check_puzzle()){
            //generate current puzzle
            console.log("load puzzle - puid: " + get_current_puzzle());
            create(); // define later
        } else{
            //generate new puzzle
            create();
        }
    }
    else if(count > 60){ //3 seconds
        alert("failed to load account information.\ntry logging out and back in.");
    }
    else{
        count++;
        console.log("waiting...");
        setTimeout(() => {
            waitfor();
        }, gap);
    }
}