let img;
let attForce = 0.08;
let repForce = 0.05;

let particles = [];
let numParticle = 12000;

function preload() {
	img = loadImage('img.jpg');
}

function setup() {
  
  createCanvas(windowWidth,windowHeight)
	img.resize(width,2/3*width);
	strokeWeight(2);
	
	
	for (let i = 0; i < numParticle; i++) {
		particles.push(new Particle(random(width), random(height)));
	}
}

function draw() {
    blendMode(SCREEN)
	fill(0, 20);
	noStroke();
	rect(0, 0, width, height);
	
	for (let p of particles) {
		p.move();
		p.display();
	}
}

class Particle {
	constructor(_x, _y) {
		this.pos = createVector(_x, _y);
		this.target = this.pos.copy();
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.color = img.get(_x, _y);
	}
	
	move() {
		let attraction = p5.Vector.sub(this.target, this.pos);
		attraction.mult(attForce);
		let tmpForce = p5.Vector.sub(createVector(mouseX, mouseY), this.pos).limit(20);
		let repulsion = tmpForce.copy().normalize().mult(-30).sub(tmpForce);
		repulsion.mult(repForce);
		
		this.acc = p5.Vector.add(attraction, repulsion);
		this.vel.mult(0.97);
		this.vel.add(this.acc);
		this.vel.limit(1);
		this.pos.add(this.vel);
	}
	
	display() {
		stroke(this.color);
		point(this.pos.x, this.pos.y);
	}
	
}