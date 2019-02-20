class Boid {

    constructor(p5, x, y){
        this.p5 = p5;
        this.pos = this.p5.createVector(x, y);
        this.maxSpeed = 2;
        this.maxForce = 0.01;
        this.r = 3;
        this.velocity = this.p5.createVector(Math.random(), Math.random());
        this.acceleration = this.p5.createVector(0, 0);
        this.perceiveRadius = 0;
        this.sepa = 5;
        this.sight = 50;
    }

    sim(flock, color, boundaries) {
        this.acceleration.add(this.separation(flock));
        this.acceleration.add(this.alignment(flock));
        this.acceleration.add(this.cohesion(flock));

        this.move();
        this.boundaryCheck(boundaries);
        this.draw(color);
    }

    move() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.pos.add(this.velocity);
        this.acceleration.set(0, 0);
    }

    avoidance() {

    }

    separation(flock) {
        let sep = this.p5.createVector(0, 0);
        let neighbourCount = 0;
        for (let b of flock) {
            let dis = this.pos.dist(b.pos);
            if (dis > 0 && dis < this.sepa){
                let diff = this.pos.sub(b.pos);
                diff.normalize();
                diff.div(dis);
                sep.add(diff);
                neighbourCount++;
            }
        }
        
        if (neighbourCount > 0){
            sep.div(neighbourCount);
        }

        if (sep.mag() > 0){
            sep.setMag(this.maxSpeed);
            sep.sub(this.velocity);
            sep.limit(this.maxForce);
        }
        return sep;
    }

    alignment(flock) {
        let align = this.p5.createVector(0, 0);
        let neighbourCount = 0;
        for (let b of flock) {
            let dis = this.pos.dist(b.pos);
            if (dis > 0 && dis < this.sight){
                align.add(b.velocity);
                neighbourCount++;
            }
        }
        if (neighbourCount > 0){
            align.div(neighbourCount);
            align.setMag(this.maxSpeed);
            align.sub(this.velocity);
            align.limit(this.maxForce);
        }
        return align;
    }

    cohesion(flock) {
        let target = this.p5.createVector(0, 0);
        let neighbourCount = 0;
        for (let b of flock) {
            let dis = this.pos.dist(b.pos);
            if (dis > 0 && dis < this.sight){
                target.add(b.pos);
                neighbourCount++;
            }
        }
        if (neighbourCount > 0){
            let desired = target.sub(this.pos);
            desired.setMag(this.maxSpeed);
            let steer = desired.sub(this.velocity);
            steer.limit(this.maxForce);
            return steer;
        }
        return this.p5.createVector(0, 0);
    }

    boundaryCheck(boundaries) {
        if (this.pos.x + this.r < boundaries.lx) this.pos.x = boundaries.rx + this.r;
        if (this.pos.x - this.r > boundaries.rx) this.pos.x = boundaries.lx - this.r;
        if (this.pos.y + this.r < boundaries.ty) this.pos.y = boundaries.by + this.r;
        if (this.pos.y - this.r > boundaries.by) this.pos.y = boundaries.ty - this.r;
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