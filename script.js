var canvas, ctx, move = false, idTimer, localDir = false, chaosDir = false;

var move_direction = {
    x: 0, y: 0
};

class Figure {
    constructor(posX, posY, color) {
        this.points = [{x:0, y:0}];
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.direction_x = 0;
        this.direction_y = 0;
    }

    static getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    moveFigure() {
        if(localDir) {
            this.posX += this.direction_x;
            this.posY += this.direction_y;
        } else {
            this.posX += move_direction.x;
            this.posY += move_direction.y; 
        }

        if(this instanceof Circle) {
            this.radius += 0.3;
            if(this.radius < this.max_size) {
                this.draw(ctx);
                this.borersCrossing();
                this.collisionsCrossing();
            } else {
                figures.splice(figures.indexOf(this), 1);
            }
        }

        if(this instanceof Rect) {
            this.diagonal += 1.5;
            if(this.diagonal < this.max_size) {
                this.draw(ctx);
                this.borersCrossing();
                this.collisionsCrossing();
            } else {
                figures.splice(figures.indexOf(this), 1);
            }
        }

        if(this instanceof Triangle) {
            if(this.height < this.max_size) {
                this.draw(ctx);
                this.borersCrossing();
                this.collisionsCrossing();
            } else {
                figures.splice(figures.indexOf(this), 1);   
            }
        }
    }

    collisionsCrossing() {
        for(let i = 0; i < figures.length; i++) {
            if(this != figures[i]) {
                if(this instanceof Circle && figures[i] instanceof Circle) {
                    if(this.distance(this.posX, this.posY, figures[i].posX, figures[i].posY) <= this.radius + figures[i].radius) {
                        figures.splice(i, 1);
                        figures.splice(figures.indexOf(this), 1);
                        return;
                    }
                } else if(!(this instanceof Circle) && !(this instanceof Circle)) {
                    for(let pt = 0; pt < this.points.length; pt++) {

                        var x = this.points[pt][0], y = this.points[pt][1];
                        var inside = false;

                        for (var z = 0, j = figures[i].points.length - 1; z < figures[i].points.length; j = z++) {
                            var xi = figures[i].points[z][0], yi = figures[i].points[z][1];
                            var xj = figures[i].points[j][0], yj = figures[i].points[j][1];
                    
                            var intersect = ((yi > y) != (yj > y))
                                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                            if (intersect) { 
                                inside = !inside;
                            } 
                        }
                        if(inside) {
                            figures.splice(i, 1);
                            figures.splice(figures.indexOf(this), 1);
                            return;
                        }
                    }
                } else {
                    let circle_center;
                    let _figure;
                    let _radius;

                    if(this instanceof Circle) {
                        _radius = this.radius;
                        circle_center = [this.posX, this.posY];
                        _figure = figures[i];
                    } else {
                        _radius = figures[i].radius;
                        circle_center = [figures[i].posX, figures[i].posY];
                        _figure = this;
                    }

                    let nearset_point= [1000,1000];
                    
                    for(let i = 0; i < _figure.points.length; i++) {
                        if(this.distance(_figure.points[i][0], _figure.points[i][1], circle_center[0], circle_center[1]) < 
                            this.distance(nearset_point[0], nearset_point[1], circle_center[0], circle_center[1])) {
                            nearset_point = [_figure.points[i][0], _figure.points[i][1]];
                        }
                    }
                    
                    if(this.distance(nearset_point[0], nearset_point[1], circle_center[0], circle_center[1]) < _radius 
                    || this.distance(circle_center[0], circle_center[1], _figure.posX, _figure.posY) < (_figure.radius + _radius)) {
                        figures.splice(i, 1);
                        figures.splice(figures.indexOf(this), 1);
                        return;
                    }
                }
            }
        }
    } 

    distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
};

var figures = [];

class Circle extends Figure {
    constructor(posX, posY, radius, color, max_size) {
        super(posX, posY, color);
        this.radius = radius;
        this.max_size = max_size;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2*Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }

    borersCrossing() {
        if(this.posX - this.radius <= 0 || this.posX + this.radius >= canvas.width
            || this.posY - this.radius <= 0 || this.posY + this.radius >= canvas.height) {
                figures.splice(figures.indexOf(this), 1);   
        }
    }
}

class Rect extends Figure {
    constructor(posX, posY, diagonal, color, max_size) {
        // this.points = [];
        super(posX, posY, color);
        this.diagonal = diagonal;
        this.direction_x = 0;
        this.direction_y = 0;
        this.max_size = max_size;
        this.radius = this.calculateSide() / 2;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.posX, this.posY, this.calculateSide(), this.calculateSide());
        ctx.closePath();
        ctx.fill();
        this.points = [
            [this.posX, this.posY],
            [this.posX + this.calculateSide(), this.posY],
            [this.posX + this.calculateSide(), this.posY+ this.calculateSide()],
            [this.posX, this.posY + this.calculateSide()]
        ];
    }

    calculateSide() {
        let side = this.diagonal / Math.sqrt(3);
        return side;
    }

    borersCrossing() {
        if(this.posX <= 0 || this.posX + this.calculateSide() >= canvas.width 
        || this.posY <= 0 || this.posY + this.calculateSide() >= canvas.height) {
            figures.splice(figures.indexOf(this), 1);
        }
    }
}

class Triangle extends Figure {
    constructor(posX, posY, height, color, max_size) {
        // this.points = [];
        super(posX, posY, color);
        this.height = height;
        this.direction_x = 0;
        this.direction_y = 0;
        this.max_size = max_size;
        this.radius = height / 3;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.posX + this.height / 2, this.posY + this.height / 2);
        ctx.lineTo(this.posX - this.height / 2, this.posY + this.height / 2);
        ctx.lineTo(this.posX, this.posY - this.height / 2);
        ctx.closePath();
        ctx.fill();
        this.points = [
            [this.posX + this.height / 2, this.posY + this.height / 2],
            [this.posX - this.height / 2, this.posY + this.height / 2],
            [this.posX, this.posY - this.height / 2]
        ]
    }

    borersCrossing() {
        if(this.posX - this.height / 2 <= 0 || this.posX + this.height / 2 >= canvas.width 
        || this.posY - this.height / 2 <= 0 || this.posY + this.height / 2 >= canvas.height) {
            figures.splice(figures.indexOf(this), 1);       
        }
    }
}

function drawBack(ctx){
    ctx.save();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 6;
    ctx.fillRect(0, 0,canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

function init() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
    }
    drawBack(ctx);

    for(let i = 0; i < 10; i++) {
        var item = new Circle(10+Math.random()*(canvas.width-30),
        10+Math.random()*(canvas.height-30), 20 + Math.random() * 20, Figure.getRandomColor(), 100);
        figures.push(item);
        item.draw(ctx);
    }
}

function moveUp() {
    move_direction.x = 0;
    move_direction.y = -2;
    if(!move) {
        idTimer = setInterval('moveFigures();',50);
        move = true;
    }    
    chaosDir = false;
    localDir = false;
}

function moveDown() {
    move_direction.x = 0;
    move_direction.y = 2;
    if(!move) {
        idTimer = setInterval('moveFigures();',50);
        move = true;
    }    
    chaosDir = false;
    localDir = false;
}

function moveRight() {
    move_direction.x = 2;
    move_direction.y = 0;
    if(!move) {
        idTimer = setInterval('moveFigures();',50);
        move = true;
    }   
    localDir = false;
    chaosDir = false; 
}

function moveLeft() {
    move_direction.x = -2;
    move_direction.y = 0;
    if(!move) {
        idTimer = setInterval('moveFigures();',50);
        move = true;
    }    
    localDir = false;
    chaosDir = false;
}


function randomDirection(){
    figures.forEach(element => {
        element.direction_x = 2 * Math.pow(-1 , Math.floor(Math.random() * 100));
        element.direction_y = 2 * Math.pow(-1 , Math.floor(Math.random() * 100));
    });
    if(!move ) {
        move = true;
        idTimer = setInterval('moveFigures();',50);
    }
    chaosDir = false;
    localDir = true;
}

function chaos(){
    if(!move) {
        idTimer = setInterval('moveFigures();',50);
        move = true;
    }
    localDir = true;
    chaosDir = true;
}

function stopMove() {
    move = false;
    localDir = false;
    chaosDir = false;
    clearInterval(idTimer);
}

function moveFigures() {
    if(chaosDir) {
        figures.forEach(element => {
            element.direction_x = Math.floor(Math.random() * 100 % 5) * Math.pow(-1 , Math.floor(Math.random() * 100));
            element.direction_y = Math.floor(Math.random() * 100 % 5) * Math.pow(-1 , Math.floor(Math.random() * 100));
        });
    }
    drawBack(ctx,'#ffffff','#aaa',canvas.width,canvas.height);
    for(let i = 0; i < figures.length; i++) {
        figures[i].moveFigure(ctx);
    }
}

function goInput(x, y) {
    figure_num = Math.floor(Math.random() * 100 % 3);
    switch(figure_num) {
        case 0:
            let ball = new Circle(x, y, 20 + Math.random() * 20, Figure.getRandomColor(), 100);
            if(localDir) {
                ball.direction_x = 2 * Math.pow(-1 , Math.floor(Math.random() * 100));
                ball.direction_y = 2 * Math.pow(-1 , Math.floor(Math.random() * 100));
            }
            ball.draw(ctx);
            figures.push(ball);
            break;
        case 1:
            let rect = new Rect(x, y, 50 + Math.random() * 100, Figure.getRandomColor(), 300);
            if(localDir) {
                rect.direction_x = 2 * Math.pow(-1 , Math.floor(Math.random() * 100));
                rect.direction_y = 2 * Math.pow(-1 , Math.floor(Math.random() * 100));
            }
            rect.draw(ctx);
            figures.push(rect);
            break;
        case 2:
            let triangle = new Triangle(x, y, 50 + Math.random() * 100 % 50, Figure.getRandomColor(), 100);
            if(localDir) {
                triangle.direction_x = 2 * Math.pow(-1 , Math.floor(Math.random() * 100));
                triangle.direction_y = 2 * Math.pow(-1 , Math.floor(Math.random() * 100));
            }
            triangle.draw(ctx);
            figures.push(triangle);
            break;
        default:
            break;
    }
}

function increaseSpeed() {
    if (move_direction.x > 0) {
        move_direction.x++;
    } else if (move_direction.x != 0){
        move_direction.x--;
    }

    if (move_direction.y > 0) {
        move_direction.y++;
    } else if (move_direction.y != 0){
        move_direction.y--;
    }

    if(localDir) {
        figures.forEach(element => {
            if (element.direction_x > 0) {
                element.direction_x++;
            } else if (element.direction_x != 0) {
                element.direction_x--;
            }

            if (element.direction_y > 0) {
                element.direction_y++;
            } else if (element.direction_y != 0) {
                element.direction_y--;
            }
        })
    }
}
