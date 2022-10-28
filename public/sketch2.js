
let r = 1;
let g = 1;
let b = 1;

let xp = 1;
let yp = 1;
let cnv = null;
let cnv2 = null;
let radi, sqr_size;

//function to position canvas
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  
  cnv.position(x + 150 , y + 80 );
}


function setup() {
  cnv = createCanvas(1000, 600 );
  centerCanvas();
  let button = createButton('save');
  button.style('margin', '3em');
  button.style('padding', '1em');
  button.style('background-color', '#F8D800');
  button.style('border-radius', '2em');
  button.style('width', '10em');
  button.style('height', '4em');
  button.style('color', 'black');
  button.style('font', "normal 1em 'Poppins', sans-serif");
  button.mousePressed(saveImage);
  button.position(70, 350);

  let button2 = createButton("Pause Sketch");
  button2.style('margin', '3em');
  button2.style('padding', '1em');
  button2.style('background-color', 'black');
  button2.style('border-radius', '2em');
  button2.style('width', '10em');
  button2.style('height', '4em');
  button2.style('color', 'white');
  button2.style('font', "normal 1em 'Poppins', sans-serif");
  button2.mousePressed(stopSketch);
  button2.position(70, 150);

  let button3 = createButton("Resume Sketch");
  button3.style('margin', '3em');
  button3.style('padding', '1em');
  button3.style('background-color', 'white');
  button3.style('border-radius', '2em');
  button3.style('width', '10em');
  button3.style('height', '4em');
  button3.style('color', 'black');
  button3.style('font', "normal 1em 'Poppins', sans-serif");
  button3.mousePressed(resumeSketch);
  button3.position(70, 250);
  
  frameRate(30);
  rectMode(CENTER);
  noStroke();
  background("white");

  function stopSketch(){
    noLoop();
  }
  function resumeSketch(){
    loop();
  }

  
}

function draw() {
  
  noStroke();
  
  let colorIt1 = color(255,255,255); 
  let colorIt2 = color(0,0,0); 
  let warp = lerpColor(colorIt2, colorIt1, random(0.60));
  let warp2 = lerpColor(colorIt1, colorIt2, random(0.20));
  
  push();
  fill(warp);
  square(50 * xp, 50 * yp, 100);
  pop();
  
  push();
  fill(warp2);
  circle (50 * xp, 50 * yp, 95);
  pop();
  
  xp = xp + 2; 
  if(xp > 19) {
   yp = yp + 2;
   xp = 1;
  }

  /////////////////color triangle///////////////////////
  cnv2 = createGraphics(width, height);
  ctx1 = cnv2.canvas.getContext("2d");
  cnv2.rectMode(CENTER);
  cnv2.noStroke();
  cnv2.background(0, 0, 0, 0.1);
  cnv2.fill("black");
  cnv2.triangle(0 , 0 , 0, 600, 500,300);  
  ctx1.clip();

  let lattice = 30;
  for(i = 0 ; i < width + 50 ; i+=lattice) {
    for(j = 0 ; j < height + 50 ; j+=lattice) {

      r = random(0, 255);
      g = random(0, 255);
      b = random(0, 255);
      cnv2.fill(r,g,b);
      cnv2.square( random(i) , random(j) + random(300), random(20 + 1));

      r = random(0, 255);
      g = random(0, 255);
      b = random(0, 255);
      cnv2.fill(r,g,b,);
      cnv2.circle( random(i) + random(200) , random(j) + random(200), random(35 + 1));

    }
  }
  
  image(cnv2, 0, 0); 

  /////////////////////////end of color triangle/////////////

  //////////////////color strip//////////////////////////

  cnv3 = createGraphics(width, height);
    ctx2 = cnv3.canvas.getContext("2d");
    cnv3.rectMode(CENTER);
    cnv3.noStroke();
    cnv3.background(0, 0, 0, 0.1);
    cnv3.fill("black");
    cnv3.triangle(1000 , 0 , 1000, 600, 500, 300);  
    ctx2.clip();

  let lattice2 = 30;
  for(i = 0 ; i < width + 50 ; i+=lattice2) {
    for(j = 0 ; j < height + 50 ; j+=lattice2) {
      
      r = random(0, 255);
      g = random(0, 255);
      b = random(0, 255);
      cnv3.fill(r,g,b);
      cnv3.triangle( i + 1000, j , i + 1000, 600, 500, 300);  
      //cnv3.square( i , j, random(20 + 1));

      r = random(0, 255);
      g = random(0, 255);
      b = random(0, 255);
      cnv3.fill(r,g,b,);
      //cnv3.circle( i , j, random(30 + 1));

    }
  }
 
  image(cnv3, 0, 0); 

  ////////////////////////end of strip///////////////


}

function saveImage(){
  save("mysketch.png");
}

function windowResized() {
  centerCanvas();
}
