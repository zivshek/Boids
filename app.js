
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

    let boids;
    let totalBoids = 100;

    let boidsColorPicker, bkgColorPicker;
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
        p.textSize(15);
        boids = Array(100).fill().map(x => new Boid(p, gameCanvasX, gameCanvasY));
    };

    p.draw = function() {
        p.background(200);
        p.gameCanvas();
        for (let b of boids) {
            b.draw(boidsColor);
        }
    };

    p.mouseHandler = function() {

    };

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
    }
};

let boidsp5 = new p5(boids, window.document.getElementById('boids'));
