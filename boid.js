class Boid {

    constructor(p5, x, y){
        this.p5 = p5;
        this.pos = this.p5.createVector(x, y);
        this.size = 20;
        this.moveSpeed = 10;
        this.velocity = this.p5.createVector(Math.random() * 2 - 1, Math.random() * 2 - 1);

    }

    draw(color){
        this.pos.add(this.velocity);

        this.p5.noStroke();
        this.p5.fill(color);
        this.p5.triangle(this.pos.x, this.pos.y - 5, this.pos.x - 2, this.pos.y + 2, this.pos.x + 2, this.pos.y + 2);
    }
}