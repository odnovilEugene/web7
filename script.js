var canvas, ctx;

var freeCells = [];

class Square {
    constructor(posX, posY, nominal){
        this.nominal = nominal;
        this.posX = posX;
        this.posY = posY;
        // this.color = 
    }

    draw(ctx) {
        // ctx.strokeStyle = "black";
        // ctx.strokeRect(this.poX, this.posY, 50, 50);
        ctx.fillStyle = "blue";
        let diag = 50 * sqrt(2);
        ctx.beginPath();
        ctx.moveTo(50 - diag / 2, 50 - diag / 2);
        ctx.lineTo(50 + diag / 2, 50 - diag / 2);
        ctx.lineTo(50 + diag / 2, 50 + diag / 2)
        ctx.lineTo(50 - diag / 2, 50 + diag / 2)
        ctx.lineTo(50 - diag / 2, 50 - diag / 2)
        ctx.closePath();
        ctx.fill();
    }

    borderCrossing() {
        if (this.posX + 27 >= canvas.width || this.posY + 27 >= canvas.height || this.posX - 27 <= 0 || this.posY - 27 <= 0){return 1;}
        else {return 0;};
    }
    
}

function drawBack(ctx){
    ctx.save();
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    ctx.restore();
}

function init() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
    }
    drawBack(ctx);

    let defaultPosX = 27;
    let defaultPosY = 27;
    let tempPosX = defaultPosX;

    for (let i = 0; i < 5; i++){
        for (let j = 0; j < 5; j++){
            // let randomCells = Math.round(Math.random())
            let random = Math.round(Math.random() * 9) + 1;
            if (random <= 9){
                let square = new Square(defaultPosX, defaultPosY, 2);
                square.draw(ctx);
                freeCells.push(square);
                tempPosX += 52;
            }

            else {
                let square = new Square(defaultPosX, defaultPosY, 4);
                square.draw(ctx);
                freeCells.push(square);
                tempPosX += 52;
            }
        }
        defaultPosY += 52;
        tempPosX = defaultPosX;
    }
}

// function randomGen() {
//     let random = Math.round(Math.random() * 9) + 1;
//     if (random <= 9){
//         let square = new Square(PosX, posY, 2, i);
//         square.draw(ctx);
//         freeCells.push(square);
//     }
//     else {
//         let square = new Square(posX, posY, 4, i)
//         square.draw(ctx);
//         freeCells.push(square);
//     }
// }

function collision() {
}

var busyCells = [];

function newStep() {
    freeCells.forEach(square => {
        if (busyCells(indexOf(square))){
            
        }
    })
}

function moveUp(){
    freeCells.forEach(square => {
        if(!square.borderCrossing()) {
            
        }
    });
}