let treeMe = [];
let treeYou = [];
let R;
let B;
let G;
let branchWeight;
let circleTransparency;
let circleValue;

function setup() {
  createCanvas(400, 400);
  let a = createVector(width / 4, height);
  let b = createVector(width / 4, height - 80);
  let c = createVector(3 * width / 4, height);
  let d = createVector(3 * width / 4, height - 90);
  let rootMe = new Branch(a, b);
  let rootYou = new Branch(c, d);
  
  treeMe[0] = rootMe;
  treeYou[0] = rootYou;
  R = 255;
  B = 229;
  G = 204;
  branchWeight = 2.15;
  circleTransparency = 0;
}

function mousePressed() {
  for (let i = treeMe.length - 1; i >= 0; i--) {
    if (!treeMe[i].finished) {
      treeMe.push(treeMe[i].branchA());
      treeMe.push(treeMe[i].branchB());
    }
    
    treeMe[i].finished = true;
    
  }
  
  for (let u = treeYou.length - 1; u >= 0; u--) {
    if (!treeYou[u].finished) {
      treeYou.push(treeYou[u].branchC());
      treeYou.push(treeYou[u].branchD());
    }
    treeYou[u].finished = true;
  }
  
  R = R - 16;
  G = G - 20;
  B = B - 30;
  
  branchWeight = branchWeight - 0.16;
  circleTransparency = circleTransparency + 20;
}

function draw() {
  background(R, G, B);
  
  for (var i = 0; i < treeMe.length; i++) {
    treeMe[i].show();
    treeMe[i].jitter();
  }
  
  for (var u = 0; u < treeYou.length; u++) {
    treeYou[u].show();
    treeYou[u].jitter();
  }
  
  noStroke();
  fill(255, circleTransparency);
  circle(width / 2, height/ 2, 10);
  
  
}

class Branch {
  
  constructor(begin, end) {
    this.begin= begin;
    this.end = end;
    this.finished = false;
  }
  
  jitter(){
    this.end.x += random(-1.5, 1.5);
    this.end.y += random(-1.5, 1.5);
  }
  
  show() {
    strokeWeight(branchWeight);
    stroke(255-B);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }
  
  branchA() {
    let dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(PI / 6);
    dir.mult(0.67);
    let newEnd = p5.Vector.add(this.end, dir);
    let b = new Branch(this.end, newEnd);
    return b;
  }
  
  branchB() {
    let dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(- PI / 6);
    dir.mult(0.67);
    let newEnd = p5.Vector.add(this.end, dir);
    let b = new Branch(this.end, newEnd);
    return b;
  }
  
  branchC() {
    let dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(PI / 6);
    dir.mult(0.67);
    let newEnd = p5.Vector.add(this.end, dir);
    let d = new Branch(this.end, newEnd);
    return d;
  }
  
  branchD() {
    let dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(- PI / 6);
    dir.mult(0.67);
    let newEnd = p5.Vector.add(this.end, dir);
    let d = new Branch(this.end, newEnd);
    return d;
  }
}