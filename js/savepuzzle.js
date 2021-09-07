function savePuzzle(){
    if(checkIfLoggedIn()){
        //get all data needed
        let _email = getEmail();

        var size;
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
        var _difficulty;
        data = {action: 'get_difficulty', email: _email};
        $.ajax({
            url:ajaxurl,
            type:"POST",
            dataType:'json',
            data:data,
            async:false,
            success: function(data){
                //console.log(data);
                _difficulty = data;
            },
            error: function(xhr, status, error){
                console.warn("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
            }
        });
        let rows = size.split("x")[0];
        let cols = size.split("x")[1];
        var colclues = "";
        for (let i = 0; i < cols; i++) {
            var text = document.getElementById("col" + i).innerHTML;
            while(text.includes(" ")){
                text = text.replace(' ', ",");
            }
            colclues += text + ";";
        }
        var rowclues = "";
        for (let i = 0; i < rows; i++) {
            var text = document.getElementById("row" + i).innerHTML;
            while(text.includes(" ")){
                text = text.replace(' ', ",");
            }
            rowclues += text + ";";
        }
        colclues = colclues.slice(0, -1);
        rowclues = rowclues.slice(0, -1);
        
        var fill = "";
        for(let i =0; i < rows; i++){
            var row = [];
            for (let j = 0; j < cols; j++) {
                //console.log(j + ":" + i);
                let cell = document.getElementById(j+":"+i);
                let bg = cell.style.background;
                var col = "";
                if(bg == "white"){
                    col = 0;
                }else if(bg == "black"){
                    col = 1;
                }else{
                    col = -1;
                }
                row.push(col);
            }
            fill += row.join(',') + ";";
        }
        fill = fill.slice(0, -1);

        if(check_puzzle()){
            //working on an already saved puzzle
            // -- update existing --
            let id = get_current_puzzle();
            data = {action: 'update_puzzle', puzzle_id: id, fill: fill};
            $.ajax({
                url:ajaxurl,
                type:"POST",
                dataType:'json',
                data:data,
                async:false,
                success: function(data){
                    //console.log(data);
                    console.log("updated");
                },
                error: function(xhr, status, error){
                    console.warn("error - " + xhr.status + ":" + xhr.statusText + " : " + error);
                }
            });
        }else{
            //not working on a saved puzzle
            // -- insert new --
            data = {action: 'insert_puzzle', email: _email, difficulty: _difficulty, row_clues: rowclues, col_clues: colclues, fill: fill};
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
            var data = {action: 'gupi', email: _email};
            $.ajax({
                url:ajaxurl,
                type:"POST",
                dataType:'json',
                data: data,
                success: function(data){
                    //console.log(data);
                    set_current_puzzle(data[0][0]);
                },
                error: function(xhr, status, error){
                    console.error(error);
                }
            }); 
            console.log("inserted");
        }
        covergreen();
    }
    else{
        console.error("could not save the puzzle (not logged in)");
        coverred();
    }
}