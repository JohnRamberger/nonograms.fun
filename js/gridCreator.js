const create = () => {
    set_current_puzzle(0);
    let rows = document.getElementById("rows");
    let cols = document.getElementById("cols");
    let selector = document.getElementById("difficulty");
    let difficulty = selector.options[selector.selectedIndex].text;
    //update cookies
    if(checkIfLoggedIn()){
        var _email = getEmail();
        var data = {action: 'set_size', email: _email, size: (rows.value + "x" + cols.value)};
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
        data = {action: 'set_difficulty', email: _email, difficulty: difficulty};
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
    }else{
        setCookie("size", rows.value + "x" + cols.value, 10 * 24);
        setCookie("difficulty", difficulty, 10 * 24);
    }

    const container = document.getElementById('container');
    container.innerHTML = "";
    document.getElementById("row-clues").innerHTML = "";
    document.getElementById("col-clues").innerHTML = "";

    layoutRow(rows.value);
    layoutCol(cols.value);
    fill(1, "white", parseInt(cols.value), parseInt(rows.value));

    layoutGrid(rows.value, cols.value);
    fillGrid(1, rows.value *1, cols.value*1, "white");
    document.getElementById("loader").style.display = "none";
}
function createfromid(id){
    var data = {action: 'get_puzzle', puzzle_id: id};
    $.ajax({
        url:ajaxurl,
        type:"POST",
        dataType:'json',
        data: data,
        async:false,
        success: function(data){ //data[0] = difficulty, data[1] = fill
            var fill = data[1];
            var rows = getRows(fill);
            var cols = getCols(fill);
            //console.log(rows + ":" + cols);

            document.getElementById("rows").value = rows;
            document.getElementById("cols").value = cols;

            let selector = document.getElementById("difficulty");
            if(data[0] == "easy")
                    selector.selectedIndex = 0;
                else if(data[0] == "medium")
                    selector.selectedIndex = 1;
                else if(data[0] == "hard")
                    selector.selectedIndex = 2;
                else if(data[0] == "extreme")
                    selector.selectedIndex = 3;

            const container = document.getElementById('container');
            container.innerHTML = "";
            document.getElementById("row-clues").innerHTML = "";
            document.getElementById("col-clues").innerHTML = "";

            layoutRow(rows);
            layoutCol(cols);
            var rowclues = data[3];
            var colclues = data[4];


            var _email = getEmail();
            var data = {action: 'set_size', email: _email, size: (rows + "x" + cols)};
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
            data = {action: 'set_difficulty', email: _email, difficulty: data[0]};
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
            
            //console.log(rowclues);
            //console.log(colclues);
            fillclues(rows, cols, rowclues, colclues);
            //fill(1, "white", parseInt(cols.value), parseInt(rows.value));

            layoutGrid(rows, cols);
            fillfill(rows, cols, fill);
            //fillGrid(1, rows.value *1, cols.value*1, "white");

            document.getElementById("loader").style.display = "none";
        },
        error: function(xhr, status, error){
            console.error(error);
        }
    });
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
const layoutGrid = (height, width) => {
    const container = document.getElementById('container')
    container.style.gridTemplateColumns = `repeat(${width}, 1fr)`
    container.style.gridTemplateRows = `repeat(${height}, 1fr)`
}

const layoutRow = (height) => {
    const clues = document.getElementById("row-clues");
    clues.style.gridTemplateRows = `repeat(${height}, 1fr)`
}

const layoutCol = (width) => {
    const clues = document.getElementById("col-clues");
    clues.style.gridTemplateColumns = `repeat(${width}, 1fr)`
}

const fill = (blockSize, color, cols, rows) => {
    const e = document.getElementById("difficulty");
    var diff = e.options[e.selectedIndex].value;
    const rclues = document.getElementById('row-clues');
    var rhint = "";

    var matrix = [];
    for(let i = 0; i < rows; i++)
    {
        matrix[i] = [];
        for(let j = 0; j < cols; j++)
        {
            //define random number from 0 to 1
            
            var rand = rnd((rows + cols) * 4);
                if(rand < Math.abs(diff / 1.25) * (Math.floor((rows + cols))))//difficulty
                    matrix[i][j] = "1";
                else
                    matrix[i][j] = "0";
        }
    }


    for(let i = 0; i < rows; i++)//each row
    {
        var x = "";
        for(let j = 0; j < cols; j++)
        {
            x += matrix[i][j];
        }
        while(x.includes("00"))
        {
            x = x.replace("00", "0");
        }
        x = x.substring(x.indexOf("1"), x.lastIndexOf("1")+1);
        var z = x.split("0");
        var res = "";
        for(let j = 0; j < z.length; j++)
        {
            var sum = 0;
            for(let k = 0; k < z[j].length; k++)
            {
                sum += parseInt(z[j].charAt(k));
            }
            res += sum + " ";
        }
        res = res.substring(0, res.length-1);
        x = res;
        rhint += x + ";";
    }
    var rlist = rhint.split(";");
    const rtest = Array(rows).keys()
            for (var i of rtest){
                let markup = `<div id="row ${i}" class="row" 
                                   style="grid-column: 0 / span ${blockSize}; 
                                          grid-row: 0 / span ${blockSize};
                                          display:grid;
                                          min-height:25px;
                                          border-top:1px solid black;
                                          text-align:center;">
                                          <span id="row${i}" style="margin:auto;letter-spacing:2px;padding:0 3px;
                                          ">${rlist[i]}</span>
                                          </div>`
                rclues.innerHTML += markup
            }
            //////////////////////////////////////////////////////
    const cclues = document.getElementById('col-clues');
    var chint = "";
    for(let i = 0; i < cols; i++)//each col
    {
        var x = "";
        for(let j = 0; j < rows; j++)
        {
            x += matrix[j][i];
        }
        while(x.includes("00"))
        {
            x = x.replace("00", "0");
        }
        x = x.substring(x.indexOf("1"), x.lastIndexOf("1")+1);
        var z = x.split("0");
        var res = "";
        for(let j = 0; j < z.length; j++)
        {
            var sum = 0;
            for(let k = 0; k < z[j].length; k++)
            {
                sum += parseInt(z[j].charAt(k));
            }
            res += sum + " ";
        }
        res = res.substring(0, res.length-1);
        x = res;
        chint += x + ";";
    }
    var clist = chint.split(";");
    const test = Array(cols).keys();
            for (var i of test){
                let markup = `<div id="col ${i}" class="col"
                                   style="grid-column: 0 / span ${blockSize}; 
                                          grid-row: 0 / span ${blockSize};
                                          display:grid;
                                          min-width:25px;
                                          border-left:1px solid black;
                                          text-align:center;">
                                          <span id="col${i}" style="margin:auto; width:5px; padding:2px 0;line-height:19px;
                                          ">${clist[i]}</span>
                                          </div>`;
                cclues.innerHTML += markup;
            }
}

function fillclues(rows, cols, rowclues, colclues){
    //rows
    const rclues = document.getElementById('row-clues');

    rowclues = rowclues.split(",").join(" ");
    rowclues = rowclues.split(";");

    const trow = Array(rows).keys();
    for(var i of trow){
        let markup = `<div id="row ${i}" class="row" 
                        style="grid-column: 0 / span 1; 
                            grid-row: 0 / span 1;
                            display:grid;
                            min-height:25px;
                            border-top:1px solid black;
                            text-align:center;">
                            <span id="row${i}" style="margin:auto;letter-spacing:2px;padding:0 3px;
                            ">${rowclues[i]}</span>
                            </div>`;
        rclues.innerHTML += markup;
    }
    //cols
    const cclues = document.getElementById('col-clues');

    colclues = colclues.split(",").join(" ");
    colclues = colclues.split(";");

    const tcol = Array(cols).keys();
    for(var i of tcol){
        let markup = `<div id="col ${i}" class="col"
                        style="grid-column: 0 / span 1; 
                            grid-row: 0 / span 1;
                            display:grid;
                            min-width:25px;
                            border-left:1px solid black;
                            text-align:center;">
                            <span id="col${i}" style="margin:auto; width:5px; padding:2px 0;line-height:19px;
                            ">${colclues[i]}</span>
                            </div>`;
        cclues.innerHTML += markup;
    }
}
function fillfill(rows, cols, fill){
    const container = document.getElementById('container');
    const rowclues = document.getElementById('row-clues');
    const colclues = document.getElementById('col-clues');
    const trash = document.getElementById('trash');
    trash.style.display = "grid";
    trash.style.width = rowclues.clientWidth + 1 + "px";
    trash.style.height = colclues.clientHeight + 2 + "px";
    colclues.style.marginLeft = rowclues.clientWidth + 1 + "px";
    container.style.marginLeft = rowclues.clientWidth + 1 + "px";
    container.style.width = colclues.clientWidth + 1 + "px";
    container.style.height = rowclues.clientHeight + 1 + "px";
    var row = fill.split(";");
    row.forEach(function(item, index1){
        let col = item.split(",");
        col.forEach(function(i, index2){
            var index = (index1) * cols + index2;
            //console.log(index);
            let color = "white";
            if(i == 1){
                color = "black";
            } else if(i == -1){
                color = "#e74c3c";
            }
            let column1 = (index % (cols*2)) % cols;
            let row1 = Math.floor(index / cols);
            //console.log(column1 + ":" + row1);
            var borderright = "1";
            var borderbottom = "1";
            if((column1 + 1) % 5 == 0){
                borderright = "2";
            }
            if((row1 + 1) % 5 == 0){
                borderbottom = "2";
            }
            let markup = `<div id="${column1}:${row1}" class="cell" 
                                style="grid-column: 0 / span 1; 
                                        grid-row: 0 / span 1;
                                        display:grid;
                                        background:${color};
                                        cursor:pointer;
                                        border-right:${borderright}px solid black;
                                        border-bottom:${borderbottom}px solid black;
                                        user-select:none;">
                                        </div>`;
            container.innerHTML += markup;
        });
    });
}

const fillGrid = (blockSize, row, col, color) => {
    const container = document.getElementById('container');
    const rowclues = document.getElementById('row-clues');
    const colclues = document.getElementById('col-clues');
    const trash = document.getElementById('trash');
    trash.style.width = rowclues.clientWidth + 1 + "px";
    trash.style.height = colclues.clientHeight + 2 + "px";
    colclues.style.marginLeft = rowclues.clientWidth + 1 + "px";
    container.style.marginLeft = rowclues.clientWidth + 1 + "px";
    container.style.width = colclues.clientWidth + 1 + "px";
    container.style.height = rowclues.clientHeight + 1 + "px";
    //container.style.top = colclues.clientHeight + "px";
    const test = Array(row * col).keys()
            for (var i of test){
                let column1 = (i % (col*2)) % col;
                let row1 = Math.floor(i / col);
                //console.log(column1 + ":" + row1);
                var borderright = "1";
                var borderbottom = "1";
                if((column1 + 1) % 5 == 0){
                    borderright = "2";
                }
                if((row1 + 1) % 5 == 0){
                    borderbottom = "2";
                }
                let markup = `<div id="${column1}:${row1}" class="cell" 
                                   style="grid-column: 0 / span ${blockSize}; 
                                          grid-row: 0 / span ${blockSize};
                                          display:grid;
                                          background:white;
                                          cursor:pointer;
                                          border-right:${borderright}px solid black;
                                          border-bottom:${borderbottom}px solid black;
                                          user-select:none;">
                                          </div>`
                container.innerHTML += markup
            };
}

const checkSol = () => {
    var rows = document.getElementById("rows").value;
    var cols = document.getElementById("cols").value;

    var matches = 0;

    //check rows
    let final = "";

    for(let i = 0; i < rows; i++)
    {
        //go through each row
        const clue = document.getElementById("row" + i.toString()).innerHTML;
        let clues = clue.split(" ");
        let result = "";
        for(let j = 0; j < cols; j++)
        {
            //go through each cell in row
            var x = document.getElementById(j.toString() + ":" + i.toString());
            if(x.style.backgroundColor == "black")
                result += "1";
            else
                result += "0";
        }
        //get all possible combinations
        var val = clues.reduce(getSum, 0);
        var spaces = clues.length - 1;
        var total = val + spaces;
        if(total == cols)
        {
            let sol = "";
            for(let j = 0; j < clues.length; j++)
            {
                for(let k = 0; k < clues[j]; k++)
                {
                    sol += "1";
                }
                sol += "0";
            }
            sol = sol.substring(0, sol.length - 1);
            if(result == sol)
            {
                result = "match";
                matches++;
            }
        }
        else
        {
            var possiblesol = 0;
            var shift = (cols - total) + 1;
            var stretch = 0;
            var gap = (cols - val);
            var count = 1;
            for(let m = shift-1; m > 0; m-=1)
            {
                stretch += count;
                count++;
            }
            stretch *= spaces;
            if(spaces == 0)
                stretch = 0;
            possiblesol = shift + stretch;
            //console.log("row:"+i+";gap:"+gap+";shift:"+ shift+";stretch:"+stretch+";possol:"+possiblesol);

            while(result.includes("00"))
            {
                result = result.replace("00", "0");
            }
            while(result.length < cols)
            {
                result += "0";
            }

            var sols = [];
            let buffer = "";
            for(let j = 0; j < shift; j++)//add all shifts
            {
                let sol = buffer;
                for(let k = 0; k < clues.length; k++)
                {
                    for(let l = 0; l < clues[k]; l++)
                    {
                        sol += "1";
                    }
                    sol += "0";
                }
                buffer += "0";
                while(sol.length <= cols)
                    sol += "0";
                sol = sol.substring(0, sol.length - 1);
                if(i == -1)//only log row
                    console.log(sol);
                sols.push(sol);
            }

            for(let j = 0; j < sols.length; j++)
            {
                if(result == sols[j])
                {
                    result = "match";
                    matches++;
                }
            }
        }
        
        final += result + " ";
    }
    //console.log("row: " + final);
    final = "";
    //check cols
    for(let i = 0; i < cols; i++)
    {
        //go through each col
        const clue = document.getElementById("col" + i.toString()).innerHTML;
        let clues = clue.split(" ");
        let result = "";
        for(let j = 0; j < rows; j++)
        {
            //go through each cell in row
            var x = document.getElementById(i.toString() + ":" + j.toString());
            if(x.style.backgroundColor == "black")
                result += "1";
            else
                result += "0";
        }
        //get all possible combinations
        var val = clues.reduce(getSum, 0);
        var spaces = clues.length - 1;
        var total = val + spaces;
        if(total == rows)
        {
            let sol = "";
            for(let j = 0; j < clues.length; j++)
            {
                for(let k = 0; k < clues[j]; k++)
                {
                    sol += "1";
                }
                sol += "0";
            }
            sol = sol.substring(0, sol.length - 1);
            if(result == sol)
            {
                result = "match";
                matches++;
            }
        }
        else
        {
            var possiblesol = 0;
            var shift = (rows - total) + 1;
            var stretch = 0;
            var gap = (rows - val);
            var count = 1;
            for(let m = shift-1; m > 0; m-=1)
            {
                stretch += count;
                count++;
            }
            stretch *= spaces;
            if(spaces == 0)
                stretch = 0;
            possiblesol = shift + stretch;
            //console.log("col:"+i+";gap:"+gap+";shift:"+ shift+";stretch:"+stretch+";possol:"+possiblesol);

            while(result.includes("00"))
            {
                result = result.replace("00", "0");
            }
            while(result.length < rows)
            {
                result += "0";
            }

            var sols = [];
            let buffer = "";
            for(let j = 0; j < shift; j++)//add all shifts
            {
                let sol = buffer;
                for(let k = 0; k < clues.length; k++)
                {
                    for(let l = 0; l < clues[k]; l++)
                    {
                        sol += "1";
                    }
                    sol += "0";
                }
                buffer += "0";
                while(sol.length <= rows)
                    sol += "0";
                sol = sol.substring(0, sol.length - 1);
                if(i == -1)//only log rowi
                    console.log(sol);
                sols.push(sol);
            }

            for(let j = 0; j < sols.length; j++)
            {
                if(result == sols[j])
                {
                    result = "match";
                    matches++;
                }
            }
        }
        
        final += result + " ";
    }
    //console.log("col: " + final);
    if(matches == (parseInt(rows) + parseInt(cols)))
        correct();
    else
        incorrect();
}

function getSum(total, num){
    return total + Math.round(num);
}

