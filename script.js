var canvas, ctx;

var cells = [];

class Square {
    constructor(posX, posY, nominal, busyOrFree){
        this.nominal = nominal;
        this.posX = posX;
        this.posY = posY;
        this.busyOrFree = busyOrFree; // free - 0, busy - 1;
    }

    draw(ctx) {
        ctx.fillStyle="Orange"
        ctx.fillRect(this.posX, this.posY, 50, 50);
        ctx.strokeStyle = "Black";
        ctx.font="22px Verdana";
        ctx.fillStyle="Black"
        ctx.textAlign="Center";
        if (this.nominal == 0){ctx.fillText(' ', this.posX + 17.5, this.posY + 32.5);}
        else {ctx.fillText(this.nominal, this.posX + 17.5, this.posY + 32.5);}
        ctx.strokeRect(this.posX, this.posY, 50, 50);
    }

    // borderCrossing() {
    //     if (this.posX + 680 >= canvas.width || this.posY + 330 >= canvas.height || this.posX - 520 <= 0 || this.posY - 265 <= 0){return 1;}
    //     else {return 0;};
    // }
    
}

function init() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext){ctx = canvas.getContext('2d');}

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.closePath();

    let defaultPosX = 500;
    let defaultPosY = 250;
    let tempPosX = defaultPosX;
    for (let i = 0; i < 5; i++){
        for (let j = 0; j < 5; j++){
            let square = new Square(tempPosX, defaultPosY, 0, 0);
            square.draw(ctx);
            cells.push(square);
            tempPosX += 52;
        }
        defaultPosY += 52;
        tempPosX = defaultPosX;
    }
}


function start(){
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.closePath();

    let defaultPosX = 500;
    let defaultPosY = 250;
    let tempPosX = defaultPosX;
    for (let i = 0; i < 5; i++){
        for (let j = 0; j < 5; j++){
            let square = new Square(tempPosX, defaultPosY, 0, 0);
            square.draw(ctx);
            cells.push(square);
            tempPosX += 52;
        }
        defaultPosY += 52;
        tempPosX = defaultPosX;
    }

    let firstRandom = Math.round(Math.random() * 25);
    let secondRandom = firstRandom;

    while (secondRandom == firstRandom) {
        secondRandom = Math.round(Math.random() * 25);
    }

    cells[firstRandom].nominal = 2;
    cells[firstRandom].busyOrFree = 1;
    cells[firstRandom].draw(ctx);
    cells[secondRandom].nominal = 2;
    cells[secondRandom].busyOrFree = 1;
    cells[secondRandom].draw(ctx);
    document.onkeydown = keyDown;
}

function keyDown(key) {
    switch (key.keyCode) {
        case 87:    // W
            moveUp();
            break;
    
        case 83:    // S
            moveDown();
            break;
        
        case 65:    // A
            moveLeft();
            break;
        
        case 68:    // D
            moveRight();
            break;
    }
}

function moveUp() {
    // for (let i = 5; i < 25; i++) {
    //     let j = i - 5;
    //     if (cells[i].busyOrFree == 1) {
    //         while (cells[j].busyOrFree == 0 && j >= 5) {
    //             if (cells[j].busyOrFree == 1) {
    //                 if (cells[j].nominal == cells[i].nominal) {
    //                     cells[j].nominal *= 2;
    //                     cells[i].nominal = 0;
    //                     cells[i].busyOrFree = 0;
    //                     cells[i].draw(ctx);
    //                     cells[j].draw(ctx)
    //                 }
    //             }
    //             else if (cells[j].posY - 300 > 0) {
    //                 cells[j].nominal = cells[i].nominal;
    //                 cells[j].busyOrFree = 1;
    //                 cells[i].nominal = 0;
    //                 cells[i].busyOrFree = 0;
    //                 cells[i].draw(ctx);
    //                 cells[j].draw(ctx);
    //             }
    //             else {
    //                 j -= 5;
    //             }
    //         }
    //     }
        
        if (cells[i].busyOrFree == 1) {
            // if (cells[i].posY - 300 > 0) {
                if (cells[i - 5].busyOrFree == 0){
                    cells[i - 5].busyOrFree = 1;
                    cells[i - 5].nominal = cells[i].nominal;
                    cells[i].nominal = 0;
                    cells[i].busyOrFree = 0;
                    cells[i].draw(ctx);
                    cells[i - 5].draw(ctx);
                }
                else if (cells[i - 5].nominal == cells[i].nominal){
                    cells[i - 5].nominal *= 2;
                    cells[i].nominal = 0;
                    cells[i].busyOrFree = 0;
                    cells[i].draw(ctx);
                    cells[i - 5].draw(ctx)
                // }
            }
        }
    

    if (!checkForGameOver) {
        let random = Math.round(Math.random() * 25);
        while (cells[random].busyOrFree == 1){
            random = Math.round(Math.random() * 25);
        }
        cells[random].nominal = 2;
        cells[random].busyOrFree = 1;
        cells[random].draw(ctx);

    }
    else {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
    }
}

function moveDown() {
    for (let i = 0; i < 20; i++) {
        if (cells[i].busyOrFree == 1) {
            // if (cells[i].posY + 470 < canvas.height) {
                if (cells[i + 5].busyOrFree == 0){
                    cells[i + 5].busyOrFree = 1;
                    cells[i + 5].nominal = cells[i].nominal;
                    cells[i].nominal = 0;
                    cells[i].busyOrFree = 0;
                    cells[i].draw(ctx);
                    cells[i + 5].draw(ctx);
                }
                else if (cells[i + 5].nominal == cells[i].nominal){
                    cells[i + 5].nominal *= 2;
                    cells[i].nominal = 0;
                    cells[i].busyOrFree = 0;
                    cells[i].draw(ctx);
                    cells[i + 5].draw(ctx)
                // }
            }
        }
    }
    // for (let k = 0; k < 25; k++){}
        // for (let i = 1; i < 6; i++) {
        // let j = 1;
        // let step = 0;
        //     if (cells[k].busyOrFree == 1){
        //         while (cells[i*j - 1 + step] == 0 && j < 6 && i < 6) {
        //             if (cells[i*j - 1 + step] == 1) {
        //                 if (cells[i*j - 1 + step].nominal == cells[i].nominal) {
        //                     cells[i * j - 1 + step].nominal *= 2;
        //                     cells[i].nominal = 0;
        //                     cells[i].busyOrFree = 0;
        //                     cells[i].draw(ctx);
        //                     cells[i * j - 1 + step].draw(ctx);
        //                 }
        //             }
        //             else if (cells[i*j - 1 + step].posY - 390 > 0) {
        //                 cells[i*j - 1 + step].nominal = cells[i].nominal;
        //                 cells[i*j - 1 + step].busyOrFree = 1;
        //                 cells[i].nominal = 0;
        //                 cells[i].busyOrFree = 0;
        //                 cells[i].draw(ctx);
        //                 cells[i*j - 1 + step].draw(ctx);
        //             }
        //             else {
        //                 step += 5;
        //                 j += 1;
        //             }
        //         }
        //     }
        //     // else 
    
        
        // if (cells[i].busyOrFree == 1) {
        //     while (cells[j].busyOrFree == 0 && j < 1) {
        //         if (cells[j].busyOrFree == 1) {
        //             if (cells[j].nominal == cells[i].nominal) {
        //                 cells[j].nominal *= 2;
        //                 cells[i].nominal = 0;
        //                 cells[i].busyOrFree = 0;
        //                 cells[i].draw(ctx);
        //                 cells[j].draw(ctx);
        //             }
        //         }
        //         else if (cells[j].posY + 470 < canvas.height) {
        //             cells[j].nominal = cells[i].nominal;
        //             cells[j].busyOrFree = 1;
        //             cells[i].nominal = 0;
        //             cells[i].busyOrFree = 0;
        //             cells[i].draw(ctx);
        //             cells[j].draw(ctx);
        //         }
        //         else {
        //             j += 5;
        //         }
        //     }
        // }
    
    if (!checkForGameOver) {
        let random = Math.round(Math.random() * 25);
        while (cells[random].busyOrFree == 1){
            random = Math.round(Math.random() * 25);
        }
        cells[random].nominal = 2;
        cells[random].busyOrFree = 1;
        cells[random].draw(ctx);

    }
    else {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
    }
}

function moveLeft() {
    for (let i = 1; i < 26; i++) {
        if (cells[i].busyOrFree == 1) {
            // if (cells[i].posX - 525 > 0) {
                if (cells[i - 1].busyOrFree == 0){
                    cells[i - 1].busyOrFree = 1;
                    cells[i - 1].nominal = cells[i].nominal;
                    cells[i].nominal = 0;
                    cells[i].busyOrFree = 0;
                    cells[i].draw(ctx);
                    cells[i - 1].draw(ctx);
                }
                else if (cells[i - 1].nominal == cells[i].nominal){
                    cells[i - 1].nominal *= 2;
                    cells[i].nominal = 0;
                    cells[i].busyOrFree = 0;
                    cells[i].draw(ctx);
                    cells[i - 1].draw(ctx)
                // }
            }
        }
    }
    // for (let i = 1; i < 25; i++) {
    //     let j = i - 1;
    //     if (cells[i].busyOrFree == 1) {
    //         while (cells[j].busyOrFree == 0 && j > i) {
    //             if (cells[j].busyOrFree == 1) {
    //                 if (cells[j].nominal == cells[i].nominal) {
    //                     cells[j].nominal *= 2;
    //                     cells[i].nominal = 0;
    //                     cells[i].busyOrFree = 0;
    //                     cells[i].draw(ctx);
    //                     cells[j].draw(ctx);
    //                 }
    //             }
    //             else if (cells[j].posX - 525 > 0) {
    //                 cells[j].nominal = cells[i].nominal;
    //                 cells[j].busyOrFree = 1;
    //                 cells[i].nominal = 0;
    //                 cells[i].busyOrFree = 0;
    //                 cells[i].draw(ctx);
    //                 cells[j].draw(ctx);
    //             }
    //             else {
    //                 j -= 1;
    //             }
    //         }
    //     }
// }
    if (!checkForGameOver) {
        let random = Math.round(Math.random() * 25);
        while (cells[random].busyOrFree == 1){
            random = Math.round(Math.random() * 25);
        }
        cells[random].nominal = 2;
        cells[random].busyOrFree = 1;
        cells[random].draw(ctx);

    }
    else {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
    }
}

function moveRight() {
    for (let i = 0; i < 24; i++) {
        if (cells[i].busyOrFree == 1) {
            if (cells[i].posX + 770 < canvas.width) {
                if (cells[i + 1].busyOrFree == 0){
                    cells[i + 1].busyOrFree = 1;
                    cells[i + 1].nominal = cells[i].nominal;
                    cells[i].nominal = 0;
                    cells[i].busyOrFree = 0;
                    cells[i].draw(ctx);
                    cells[i + 1].draw(ctx);
                }
                else if (cells[i + 1].nominal == cells[i].nominal){
                    cells[i + 1].nominal *= 2;
                    cells[i].nominal = 0;
                    cells[i].busyOrFree = 0;
                    cells[i].draw(ctx);
                    cells[i + 1].draw(ctx)
                }
            }
        }
    }
    // for (let i = 0; i < 25; i++) {
    //     let j = i + 1;
    //     if (cells[i].busyOrFree == 1) {
    //         while (cells[j].busyOrFree == 0 && j < i) {
    //             if (cells[j].busyOrFree == 1) {
    //                 if (cells[j].nominal == cells[i].nominal) {
    //                     cells[j].nominal *= 2;
    //                     cells[i].nominal = 0;
    //                     cells[i].busyOrFree = 0;
    //                     cells[i].draw(ctx);
    //                     cells[j].draw(ctx);
    //                 }
    //             }
    //             else if (cells[j].posX + 770 < canvas.width) {
    //                 cells[j].nominal = cells[i].nominal;
    //                 cells[j].busyOrFree = 1;
    //                 cells[i].nominal = 0;
    //                 cells[i].busyOrFree = 0;
    //                 cells[i].draw(ctx);
    //                 cells[j].draw(ctx);
    //             }
    //             else {
    //                 j += 1;
    //             }
    //         }
    //     }
    // }
    if (!checkForGameOver) {
        let random = Math.round(Math.random() * 25);
        while (cells[random].busyOrFree == 1){
            random = Math.round(Math.random() * 25);
        }
        cells[random].nominal = 2;
        cells[random].busyOrFree = 1;
        cells[random].draw(ctx);
    }
    else {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
    }
}


function checkForGameOver() {
    let countOfBusyCells = 0;
    for (let k = 0; k < 25; k++){
        if (cells[k].nominal == 1){
            countOfBusyCells++;
        }
    }
    if (countOfBusyCells == 25) {
        return 1;
    }
    else {
        return 0;
    }
}