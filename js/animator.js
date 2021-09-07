function correct()
{
    //document.body.style.overflowY = "hidden";
    var panel = document.getElementById("cover");
    panel.style.backgroundColor = "#2ecc71";
    TweenMax.to("#cover", 0.5, {top:'0px'});
    TweenMax.to("#cover", 0.5, {top:'-1000px', delay:0.5});
    TweenMax.to("#cover", 0, {top:'1000px', delay:1});
    if(checkIfLoggedIn()){
        let _email = getEmail();

        setTimeout(() => {
            create();
            data = {action: 'get_score', email: _email};
            $.ajax({
                url:ajaxurl,
                type:"POST",
                dataType:'json',
                data:data,
                success: function(data){
                    //console.log(data);
                    document.getElementById("score").innerHTML = data;
                },
                error: function(xhr, status, error){
                    console.warn("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
                }
            });
        }, 500);

        var size;
        var score;
        var multi;

        var data = {action: 'get_size', email: _email};
        $.ajax({
            url:ajaxurl,
            type:"POST",
            dataType:'json',
            data:data,
            async:false,
            success: function(data){
                //console.log(data);
                size = data;
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
                if(data == "easy")
                    multi = 1;
                else if(data == "medium")
                    multi = 2;
                else if(data == "hard")
                    multi = 3;
                else if(data == "extreme")
                    multi = 4;
            },
            error: function(xhr, status, error){
                console.warn("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
            }
        });
        size = size.split("x");
        score = size[0] * size[1] * multi;
        data = {action: 'set_score', email: _email, score: score};
        $.ajax({
            url:ajaxurl,
            type:"POST",
            dataType:'json',
            data:data,
            async:false,
            success: function(data){
                //console.log(data);
                //console.log("puzzle completed")
            },
            error: function(xhr, status, error){
                console.warn("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
            }
        });
        if(check_puzzle()){
            let id = get_current_puzzle();
            //reset the session storage
            set_current_puzzle(0);
            //remove puzzle from database
            data = {action: 'delete_puzzle', puzzle_id: id};
            $.ajax({
                url:ajaxurl,
                type:"POST",
                dataType:'json',
                data:data,
                async:true,
                success: function(data){
                    //console.log("puzzle deleted")
                },
                error: function(xhr, status, error){
                    console.warn("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
                }
            });
        }
    }else{
        setTimeout(() => {
            create();
            var score = getCookie("score");
            document.getElementById("score").innerHTML = score;
        }, 500);
    
        var size = getCookie("size").split("x");
        var difficulty = getCookie("difficulty");
        var score = parseInt(getCookie("score"));
        var mult = 0;
        if(difficulty == "easy")
            mult = 1;
        else if(difficulty == "medium")
            mult = 2;
        else if(difficulty == "hard")
            mult = 3;
        else if(difficulty == "extreme")
            mult = 4;
        score += size[0] * size[1] * mult;
        setCookie("score", score, 10 * 24);
    }
}

function incorrect()
{
    //document.body.style.overflowY = "hidden";
    var panel = document.getElementById("cover");
    panel.style.backgroundColor = "#e74c3c";
    TweenMax.to("#cover", 0.3, {top:'0px'});
    TweenMax.to("#cover", 0.3, {top:'-1000px', delay:0.3});
    TweenMax.to("#cover", 0, {top:'1000px', delay:.8});

    if(checkIfLoggedIn()){
        let _email = getEmail();
        data = {action: 'get_difficulty', email: _email};
        $.ajax({
            url:ajaxurl,
            type:"POST",
            dataType:'json',
            data:data,
            success: function(data){
                //console.log(data);
                if(data == "extreme")
                {
                    setTimeout(() => {
                        //wipe board
                        var cells = document.getElementsByClassName("cell");
                        for(var i = 0; i < cells.length; i++)
                        {
                            cells[i].style.backgroundColor = "white";
                            cells[i].style.border = "1px solid black";
                        }
                    }, 300);
                }
            },
            error: function(xhr, status, error){
                console.warn("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
            }
        });
    }else{
        var dif = getCookie("difficulty");
        if(dif == "extreme")
        {
            setTimeout(() => {
                //wipe board
                var cells = document.getElementsByClassName("cell");
                for(var i = 0; i < cells.length; i++)
                {
                    cells[i].style.backgroundColor = "white";
                    cells[i].style.border = "1px solid black";
                }
            }, 300);
        }
    }
}

function newPuzzle()
{
    //document.body.style.overflowY = "hidden";
    var panel = document.getElementById("cover");
    panel.style.backgroundColor = "rgb(" + rnd(255) + ", " + rnd(255) + ", " + rnd(255) + ")";
    TweenMax.to("#cover", 0.5, {top:'0px'});
    TweenMax.to("#cover", 0.5, {top:'-1000px', delay:0.5});
    TweenMax.to("#cover", 0, {top:'1000px', delay:1});
    setTimeout(() => {
        create();
        if(checkIfLoggedIn()){
            let _email = getEmail();
            data = {action: 'get_score', email: _email};
            $.ajax({
                url:ajaxurl,
                type:"POST",
                dataType:'json',
                data:data,
                success: function(data){
                    //console.log(data);
                    document.getElementById("score").innerHTML = data;
                },
                error: function(xhr, status, error){
                    console.warn("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
                }
            });
        }else{
            var score = getCookie("score");
            document.getElementById("score").innerHTML = score;
        }
    }, 500);
}

function cover(){
    var panel = document.getElementById("cover");
    panel.style.backgroundColor = "rgb(" + rnd(255) + ", " + rnd(255) + ", " + rnd(255) + ")";
    TweenMax.to("#cover", 0.5, {top:'0px'});
    TweenMax.to("#cover", 0.5, {top:'-1000px', delay:0.5});
    TweenMax.to("#cover", 0, {top:'1000px', delay:1});
}

function covergreen(){
    var panel = document.getElementById("cover");
    panel.style.backgroundColor = "#2ecc71";
    TweenMax.to("#cover", 0.5, {top:'0px'});
    TweenMax.to("#cover", 0.5, {top:'-1000px', delay:0.5});
    TweenMax.to("#cover", 0, {top:'1000px', delay:1});
}

function coverred(){
    var panel = document.getElementById("cover");
    panel.style.backgroundColor = "#e74c3c";
    TweenMax.to("#cover", 0.5, {top:'0px'});
    TweenMax.to("#cover", 0.5, {top:'-1000px', delay:0.5});
    TweenMax.to("#cover", 0, {top:'1000px', delay:1});
}

function rnd(to)
{
    return Math.floor(Math.random() * to);
}