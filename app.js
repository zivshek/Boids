
let boids = function (p) {
    let mycanvas;
    let canvasW = 800;
    let canvasH = 600;

    let marginXL = 250;
    let marginXR = 50;
    let marginY = 50;

    let gameCanvasX = marginXL + (canvasW - marginXL - marginXR)/2;
    let gameCanvasY = canvasH/2;
    let gameCanvasW = canvasW - marginXL - marginXR;
    let gameCanvasH = canvasH - 2 * marginY;
    let boundaries = {
        lx: gameCanvasX - gameCanvasW/2,  //left x
        rx: gameCanvasX + gameCanvasW/2,  //right x
        by: gameCanvasY + gameCanvasH/2,  //bottom y
        ty: gameCanvasY - gameCanvasH/2   //top y
    };

    let flock = [];
    let maxBoids = 200;

    let boidsColorPicker, bkgColorPicker, clearButton, spawnButton;
    let spacing = 5;

    let boidsColor = p.color('black');
    let bkgColor = p.color('white');

    p.setup = function() {
        
        mycanvas = p.createCanvas(canvasW, canvasH);
        mycanvas.mousePressed(p.mouseHandler);
        boidsColorPicker = p.createColorPicker(boidsColor);
        boidsColorPicker.position(marginXR, marginY + boidsColorPicker.height / 2);
        boidsColorPicker.input(p.setBoidsColor);

        bkgColorPicker = p.createColorPicker(bkgColor);
        bkgColorPicker.position(marginXR, marginY + bkgColorPicker.height / 2 + spacing + boidsColorPicker.height);
        bkgColorPicker.input(p.setBkgColor);

        clearButton = p.createButton('Clear');
        clearButton.position(marginXR, marginY + bkgColorPicker.height + spacing * 10 + boidsColorPicker.height);
        clearButton.mousePressed(p.clearFlock);

        spawnButton = p.createButton('Spawn');
        spawnButton.position(marginXR, marginY + bkgColorPicker.height + spacing * 20 + boidsColorPicker.height);
        spawnButton.mousePressed(p.spawn);

        p.textSize(15);
        //p.spawn();
    };

    p.draw = function() {
        p.background(200);
        p.gameCanvas();
        for (let b of flock) {
            b.sim(flock, boidsColor, boundaries);
        }
        p.boarderCover();
    };

    p.mouseHandler = function() {
        // make sure it's clicked within the game canvas
        if (p.mouseX < boundaries.lx || p.mouseX > boundaries.rx || p.mouseY > boundaries.by || p.mouseY < boundaries.ty) {
            return;
        }


    };

    p.clearFlock = function() {
        flock = [];
    };

    p.spawn = function() {
        if (flock.length >= maxBoids) {
            console.log('Too many boids');
            return;
        }
        // trying some ES6 features
        let temp = Array(50).fill().map(x => new Boid(p, p.myRandom(boundaries.lx, boundaries.rx), p.myRandom(boundaries.ty, boundaries.by)));
        flock = flock.concat(temp);
    };

    p.myRandom = function(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    p.setBoidsColor = function() {
        boidsColor = boidsColorPicker.color();
    };

    p.setBkgColor = function() {
        bkgColor = bkgColorPicker.color();
    };

    p.gameCanvas = function() {
        p.fill(bkgColor);
        p.stroke(1);
        p.rectMode(p.CENTER);
        p.rect(gameCanvasX, gameCanvasY, gameCanvasW, gameCanvasH);
        
        p.noStroke();
        p.fill(0, 102, 153);
        p.text('Boids Color', marginXR + boidsColorPicker.width + spacing, marginY + boidsColorPicker.height);
        p.text('Background Color', marginXR + boidsColorPicker.width + spacing, marginY + boidsColorPicker.height + spacing + bkgColorPicker.height);
    };

    p.boarderCover = function() {
        p.fill(200);
        p.noStroke();
        let m = 4;
        p.rect(gameCanvasX, boundaries.ty - m, gameCanvasW + m, 2 * m); //top
        p.rect(gameCanvasX, boundaries.by + m + 1, gameCanvasW + m, 2 * m); //bottom
        p.rect(boundaries.lx - m, gameCanvasY, 2 * m, gameCanvasH + 4 * m); //left
        p.rect(boundaries.rx + m + 1, gameCanvasY, 2 * m, gameCanvasH + 4 * m); //right
    };
};

let boidsp5 = new p5(boids, window.document.getElementById('boids'));
