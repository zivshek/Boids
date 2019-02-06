
let boids = function (p) {

    p.setup = function() {
        p.createCanvas(800, 600, p.WEBGL);
        p.noStroke();
        p.fill(50);
        p.push();
        p.translate(-275, 175);
        p.rotateY(1.25);
        p.rotateX(-0.9);
        p.box(100);
        p.pop();
        p.noFill();
        p.stroke(255);
        p.push();
        p.translate(500, 600*0.35, -200);
        p.sphere(300);
        p.pop();
    }
};

let boidsp5 = new p5(boids, window.document.getElementById('container'));