var Plus = function(){
    this.x = 0;
    this.y = 0;

    this.left = 0;
    this.top = 0;

    this.width = 0;
    this.height = 0;

    this.scale = 1;var Plus = function() {
        this.x = 0;
        this.y = 0;

        this.left = 0;
        this.top = 0;

        this.width = 0;
        this.height = 0;

        this.scale = 1;
    };

    Plus.prototype.draw = function(context) {
        context.setTransform(
            this.scale,
            0,
            0,
            this.scale,
            this.left + this.x,
            this.top + this.y
        );

        context.moveTo(0, -this.height / 2);
        context.lineTo(0, this.height / 2);

        context.moveTo(-this.width / 2, 0);
        context.lineTo(this.width / 2, 0);
    };

    var c = document.getElementById("c");
    var context = c.getContext("2d");

    var signs = [];
    var mouse = { x: 0, y: 0 };
    var gridLength = 9;

    var mouseMoved = false;
    var mouseOver = false;

    for (var i = 0; i < gridLength; i++) {
        signs[i] = [];

        for (var j = 0; j < gridLength; j++) {
            var sign = new Plus();

            sign.left = c.width / (gridLength + 1) * (i + 1);
            sign.top = c.height / (gridLength + 1) * (j + 1);

            sign.width = 10;
            sign.height = 10;

            signs[i][j] = sign;
        }
    }

    TweenLite.ticker.addEventListener("tick", draw);

    function draw() {
        if (mouseOver && mouseMoved) {
            calculateIconPosition();
            mouseMoved = false;
        }

        context.clearRect(0, 0, c.width, c.height);
        context.save();
        context.beginPath();
        for (var i = 0; i < gridLength; i++) {
            for (var j = 0; j < gridLength; j++) {
                var sign = signs[i][j];

                sign.draw(context);
            }
        }
        context.closePath();
        context.restore();
        context.stroke();
    }

    function calculateIconPosition() {
        for (var i = 0; i < gridLength; i++) {
            for (var j = 0; j < gridLength; j++) {
                var sign = signs[i][j];
                var radius = 20;
                var dx = mouse.x - sign.left;
                var dy = mouse.y - sign.top;
                var dist = Math.sqrt(dx * dx + dy * dy) || 1;

                var angle = Math.atan2(dy, dx);

                if (dist < radius) {
                    radius = dist;
                    TweenMax.to(sign, 0.3, { scale: 2 });
                } else {
                    TweenMax.to(sign, 0.3, { scale: 1 });
                }

                TweenMax.to(sign, 0.3, {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius
                });
            }
        }
    }

    c.addEventListener("mousemove", mouseMove);

    function mouseMove(e) {
        var rect = c.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;

        mouseMoved = true;
    }

    c.addEventListener("mouseenter", function() {
        mouseOver = true;
    });

    c.addEventListener("mouseleave", function() {
        mouseOver = false;
        for (var i = 0; i < gridLength; i++) {
            for (var j = 0; j < gridLength; j++) {
                var sign = signs[i][j];
                TweenMax.to(sign, 0.3, { x: 0, y: 0, scale: 1 });
            }
        }
    });

}

Plus.prototype.draw = function(context){
    context.setTransform(this.scale, 0, 0, this.scale,
        this.left + this.x, this.top + this.y);

    context.moveTo(0, -this.height/2);
    context.lineTo(0, this.height/2);

    context.moveTo(-this.width/2, 0);
    context.lineTo(this.width/2, 0);
}

var c = document.getElementById('c');
var context = c.getContext('2d');

var signs = [];
var mouse = {x: 0, y: 0};
var gridLength = 9;

var mouseMoved = false;
var mouseOver = false;

for(var i = 0; i < gridLength; i++){
    signs[i] = [];

    for(var j = 0; j < gridLength; j++){
        var sign = new Plus();

        sign.left = c.width/(gridLength + 1)  * (i + 1);
        sign.top = c.height/(gridLength + 1) * (j + 1);

        sign.width = 10;
        sign.height = 10;

        signs[i][j] = sign;
    }
}

TweenLite.ticker.addEventListener('tick', draw);

function draw(){
    if(mouseOver && mouseMoved){
        calculateIconPosition();
        mouseMoved = false;
    }


    context.clearRect(0, 0, c.width, c.height);
    context.save();
    context.beginPath();
    for(var i = 0; i < gridLength; i++){
        for(var j = 0; j <gridLength; j++){
            var sign = signs[i][j];

            sign.draw(context);
        }
    }
    context.closePath();
    context.restore();
    context.stroke();
}

function calculateIconPosition(){
    for(var i = 0; i < gridLength; i++){
        for(var j = 0; j < gridLength; j++){
            var sign = signs[i][j];
            var radius = 20;
            var dx = mouse.x - sign.left;
            var dy = mouse.y - sign.top;
            var dist = Math.sqrt(dx * dx + dy * dy) || 1;

            var angle = Math.atan2(dy, dx);

            if(dist < radius){
                radius = dist;
                TweenMax.to(sign, 0.3, {scale: 2});
            } else{
                TweenMax.to(sign, 0.3, {scale: 1});
            }

            TweenMax.to(sign, 0.3,{
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius
            })
        }
    }
}

c.addEventListener('mousemove', mouseMove);

function mouseMove(e){
    var rect = c.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    mouseMoved = true;
}

c.addEventListener('mouseenter', function(){
    mouseOver = true;
});

c.addEventListener('mouseleave', function(){
    mouseOver = false;
    for(var i = 0; i < gridLength; i++){
        for(var j = 0; j < gridLength; j++){
            var sign = signs[i][j];
            TweenMax.to(sign, 0.3, {x: 0, y: 0, scale: 1});
        }
    }
})
