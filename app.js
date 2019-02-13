
let boids = function (p) {

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

    let lol;

    let colorPicker;

    p.setup = function() {
        
        p.createCanvas(canvasW, canvasH);
        colorPicker = p.createColorPicker('#ffffff');
        colorPicker.position(marginXR, marginY);
        //boids = Array(100)
    };

    p.draw = function() {
        p.background(200);
        p.gameCanvas();
        
    };

    p.gameCanvas = function() {
        p.rectMode(p.CENTER);
        p.rect(gameCanvasX, gameCanvasY, gameCanvasW, gameCanvasH);
    }
};

let boidsp5 = new p5(boids, window.document.getElementById('boids'));
