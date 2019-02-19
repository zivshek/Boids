class Boid {

    constructor(p5, x, y){
        this.p5 = p5;
        this.pos = this.p5.createVector(x, y);
        this.maxSpeed = 10;
        this.maxForce = 10;
        this.r = 3;
        let angle = this.p5.random(Math.PI * 2);
        this.velocity = this.p5.createVector(Math.cos(angle), Math.sin(angle));
        this.acceleration = this.p5.createVector(0, 0);
    }

    sim(flock, color, boundaries) {
        this.update();
        this.boundaryCheck(boundaries);
        this.draw(color);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.pos.add(this.velocity);
        this.acceleration.set(0, 0);
    }

    steer() {

    }

    avoid() {

    }

    boundaryCheck(boundaries) {
        if (this.pos.x + this.r < boundaries.lx) this.pos.x = boundaries.rx - this.r;
        if (this.pos.x - this.r > boundaries.rx) this.pos.x = boundaries.lx + this.r;
        if (this.pos.y + this.r < boundaries.ty) this.pos.y = boundaries.by - this.r;
        if (this.pos.y - this.r > boundaries.by) this.pos.y = boundaries.ty + this.r;
    }

    draw(color) {        
        let rot = this.velocity.heading();
        this.p5.push();
        this.p5.noStroke();
        this.p5.fill(color);
        this.p5.translate(this.pos.x, this.pos.y);
        this.p5.rotate(rot);
        // facing right when it gets created, like this '►', so it's rot is 0 
        this.p5.triangle(this.r*2, 0, -this.r, this.r, -this.r, -this.r);
        this.p5.pop();
    }
}