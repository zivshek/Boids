class Boid {

    constructor(p5){
        this.p5 = p5;
    }

    draw(color){
        this.p5.rectMode(this.p5.CORNER);
        this.p5.stroke(0);
        this.p5.fill(color);
        this.p5.rect(this.x, this.y, this.size, this.size);
    }
}