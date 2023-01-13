var firstTotalScore = 0;
var secondTotalScore = 0;
function startGame() {
    var firstPlayerName = document.getElementById("firstRed").value;
    if (firstPlayerName == "") {
        alert("Please fill out this field(Red Player)");
        return;
    }
    var secondtPlayerName = document.getElementById("secondBlue").value;
    if (secondtPlayerName == "") {
        alert("Please fill out this field(Blue Player)");
        return;
    }

    document.getElementById("firstRed").value = "";
    document.getElementById("secondBlue").value = "";

    document.getElementById("formDiv").style.display = "none";
    document.getElementById("bigContainer").style.display = "flex";

    nameShow(firstPlayerName , secondtPlayerName);
    
    totalScoreShow(firstTotalScore , secondTotalScore);
    load();
}

function nameShow(f , s) {
    document.getElementById("firstName").innerHTML = f;
    document.getElementById("secondName").innerHTML = s;
}

function totalScoreShow(f , s) {
    document.getElementById("firstTotalScore").innerHTML = f;
    document.getElementById("secondTotalScore").innerHTML = s;
}


function load() {
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let newDiv = document.createElement("div");
            newDiv.id = "r" + row + "c" + column;
            if (discs[row][column] == 1) {
                newDiv.style.backgroundColor = "red";
                newDiv.style.borderRadius = "50%";
            }
            if (discs[row][column] == 2) {
                newDiv.style.backgroundColor = "blue";
                newDiv.style.borderRadius = "50%";
            }
            newDiv.setAttribute("onclick" , "clickedSquare("+row+","+column+")");
            document.getElementById("gameBoard").appendChild(newDiv);        
        }    
    }
    suggests();
}

var turn = 1;
var gameOver = false;
var discs = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
];

function clickedSquare(row , column) {
    
    if (gameOver) {
        return;
    }
    if (discs[row][column] != 0) {
        return;
    }
    if (canClick(turn , row , column) == true) {

        const affected = getAffected(turn ,row , column);
        flipDiscs(affected);

        discs[row][column] = turn;
        if (turn == 1 && canMove(2)) {
            turn = 2;
            changeTurn();
            suggests();
        }
        else if (turn == 2 && canMove(1)) {
            turn = 1;
            changeTurn();
            suggests();
        }

    }

    updateBoard();
    updateScore();
    finished();

}

function suggests() {
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let value = discs[row][column];
            if (value == 0 && canClick(turn , row , column)) {
                let sug = document.getElementById("r"+row+"c"+column);
                sug.style.borderRadius = "50%";
                if (turn == 1) {
                    sug.style.border = "5px solid hotpink";
                }
                else{
                    sug.style.border = "5px solid aqua";
                }
            }            
        }
    }
}

function canClick(id , row , column) {
    const affected = getAffected(id ,row , column);
    if(affected.length == 0) return false;
    return true;
}

function getAffected(id , row , column) {

    let affected = [];

    //right
    let canAffectRight = [];
    let columncounterRight = column;
    while (columncounterRight < 7) {
        columncounterRight += 1;
        let value = discs[row][columncounterRight];
        if (value == 0 || value == id) {
            if (value == id) {
                affected = affected.concat(canAffectRight);
            }
            break;
        }
        else{
            let diskLoc = {row:row , column:columncounterRight};
            canAffectRight.push(diskLoc);
        }
    }

    //left
    let canAffectLeft = [];
    let columncounterLeft = column;
    while (columncounterLeft > 0) {
        columncounterLeft -= 1;
        let value = discs[row][columncounterLeft];
        if (value == 0 || value == id) {
            if (value == id) {
                affected = affected.concat(canAffectLeft);
            }
            break;
        }
        else{
            let diskLoc = {row:row , column:columncounterLeft};
            canAffectLeft.push(diskLoc);
        }
    }

    //above
    let canAffectUp = [];
    let rowcounterUp = row;
    while (rowcounterUp > 0) {
        rowcounterUp -= 1;
        let value = discs[rowcounterUp][column];
        if (value == 0 || value == id) {
            if (value == id) {
                affected = affected.concat(canAffectUp);
            }
            break;
        }
        else{
            let diskLoc = {row:rowcounterUp , column:column};
            canAffectUp.push(diskLoc);
        }
    }

    //below
    let canAffectDown = [];
    let rowcounterDown = row;
    while (rowcounterDown < 7) {
        rowcounterDown += 1;
        let value = discs[rowcounterDown][column];
        if (value == 0 || value == id) {
            if (value == id) {
                affected = affected.concat(canAffectDown);
            }
            break;
        }
        else{
            let diskLoc = {row:rowcounterDown , column:column};
            canAffectDown.push(diskLoc);
        }
    }

    //up-right
    let canAffectUpRight = [];
    let rowcounterUpRight = row;
    let colcounterUpRight = column;
    while (colcounterUpRight < 7 && rowcounterUpRight > 0) {
        colcounterUpRight += 1;
        rowcounterUpRight -= 1;
        let value = discs[rowcounterUpRight][colcounterUpRight];
        if (value == 0 || value == id) {
            if (value == id) {
                affected = affected.concat(canAffectUpRight);
            }
            break;
        }
        else{
            let diskLoc = {row:rowcounterUpRight , column:colcounterUpRight};
            canAffectUpRight.push(diskLoc);
        }
    }

    //up-left
    let canAffectUpLeft = [];
    let rowcounterUpLeft = row;
    let colcounterUpLeft = column;
    while (colcounterUpLeft > 0 && rowcounterUpLeft > 0) {
        colcounterUpLeft -= 1;
        rowcounterUpLeft -= 1;
        let value = discs[rowcounterUpLeft][colcounterUpLeft];
        if (value == 0 || value == id) {
            if (value == id) {
                affected = affected.concat(canAffectUpLeft);
            }
            break;
        }
        else{
            let diskLoc = {row:rowcounterUpLeft , column:colcounterUpLeft};
            canAffectUpLeft.push(diskLoc);
        }
    }

    //down-left
    let canAffectDownLeft = [];
    let rowcounterDownLeft = row;
    let colcounterDownLeft = column;
    while (colcounterDownLeft > 0 && rowcounterDownLeft < 7) {
        colcounterDownLeft -= 1;
        rowcounterDownLeft += 1;
        let value = discs[rowcounterDownLeft][colcounterDownLeft];
        if (value == 0 || value == id) {
            if (value == id) {
                affected = affected.concat(canAffectDownLeft);
            }
            break;
        }
        else{
            let diskLoc = {row:rowcounterDownLeft , column:colcounterDownLeft};
            canAffectDownLeft.push(diskLoc);
        }
    }

    //down-right
    let canAffectDownRight = [];
    let rowcounterDownRight = row;
    let colcounterDownRight = column;
    while (colcounterDownRight < 7 && rowcounterDownRight < 7) {
        colcounterDownRight += 1;
        rowcounterDownRight += 1;
        let value = discs[rowcounterDownRight][colcounterDownRight];
        if (value == 0 || value == id) {
            if (value == id) {
                affected = affected.concat(canAffectDownRight);
            }
            break;
        }
        else{
            let diskLoc = {row:rowcounterDownRight , column:colcounterDownRight};
            canAffectDownRight.push(diskLoc);
        }
    }

    return affected;

}

function flipDiscs(params) {
    for (let i = 0; i < params.length; i++) {
        let spot = params[i];
        if (discs[spot.row][spot.column] == 1) {
            discs[spot.row][spot.column] = 2;
        }        
        else{
            discs[spot.row][spot.column] = 1;
        }
    }
}

function canMove(id) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (canClick(id , i , j)) {
                return true;
            }            
        }        
    }
    return false;
}

function updateBoard() {

    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let block = document.getElementById('r'+row+'c'+column);
            if (block.style.border == "5px solid hotpink" || block.style.border == "5px solid aqua") {
                block.style.border = "none"
                block.style.borderRadius = "0%";
            }
            if (discs[row][column] == 1) {
                block.style.backgroundColor = "red";
                block.style.borderRadius = "50%";
            }
            else if (discs[row][column] == 2) {
                block.style.backgroundColor = "blue";
                block.style.borderRadius = "50%";
            }
            else continue;
        }    
    }
    suggests();

}

function changeTurn() {
    let top = document.getElementById("top");
    if (turn == 1) {
        top.style.backgroundColor = "hotpink";
    }
    else{
        top.style.backgroundColor = "aqua";
    }
}



function updateScore() {
    let redScore = 0;
    let blueScore = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (discs[i][j] == 1) {
                redScore++;
            }
            else if (discs[i][j] == 2) {
                blueScore++;
            }
        }        
    }
    document.getElementById("redBlock").innerHTML = redScore;
    document.getElementById("blueBlock").innerHTML = blueScore;
}

function finished() {
    let redScore = 0;
    let blueScore = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (discs[i][j] == 1) {
                redScore++;
            }
            else if (discs[i][j] == 2) {
                blueScore++;
            }
        }        
    }
    if (redScore + blueScore == 64 || (canMove(1) == false && canMove(2) == false)) {
        // gameOver = true;
        if (redScore > blueScore) {
            firstTotalScore++;
            turn = 1;
            changeTurn();
            discs = [
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,2,1,0,0,0],
                [0,0,0,1,2,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]
            ];
            totalScoreShow(firstTotalScore , secondTotalScore);
            document.getElementById("redBlock").innerHTML = 2;
            document.getElementById("blueBlock").innerHTML = 2;
            againGame();
            load();
        }
        else if (blueScore > redScore) {
            secondTotalScore++;
            turn = 2;
            changeTurn();
            discs = [
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,1,2,0,0,0],
                [0,0,0,2,1,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]
            ];
            totalScoreShow(firstTotalScore , secondTotalScore);
            document.getElementById("redBlock").innerHTML = 2;
            document.getElementById("blueBlock").innerHTML = 2;
            againGame();
            load();
        } else{
            turn = 1;
            changeTurn();
            discs = [
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,2,1,0,0,0],
                [0,0,0,1,2,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]
            ];
            document.getElementById("redBlock").innerHTML = 2;
            document.getElementById("blueBlock").innerHTML = 2;
            againGame();
            load();
        }
    }
}

function againGame() {
    for (let i =0 ;  i < 8; i++){
        for (let j = 0; j < 8; j++) {
            document.getElementById("r"+i+"c"+j).remove();
        }      
    }
}