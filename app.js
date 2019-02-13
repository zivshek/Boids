
let boids = function (p) {

    let canvasW = 800;
    let canvasH = 600;

    let marginX = 50;
    let marginY = 60;

    p.setup = function() {
        
        p.createCanvas(canvasW, canvasH);
    };

    p.draw = function() {
        p.background(200);
    };
};

let boidsp5 = new p5(boids, window.document.getElementById('boids'));