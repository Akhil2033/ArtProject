
let x_pos, y_pos, xc_pos, yc_pos, noc, distance_circle, cirw_size, cirh_size, cir_opa, xs_pos, ys_pos, nos, sqr_size, distance_square, sqr_opa ;
let cx_pos, cy_pos, xl_pos, yl_pos, nol, line_size, distance_line, xt_pos, yt_pos, not, tri_size, distance_triangle, tri_opa ;
let can_pos;
let cnv = null;

let offsetX = 0;
let offsetY = 0;

//function to position canvas
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x + 100 , y + 450);
}


function setup() {
  cnv = createCanvas(windowWidth * 0.80, windowHeight * 1.5 );
  centerCanvas();
  button = createButton('save');
  button.style('margin', '3em');
  button.style('padding', '1em');
  button.style('background-color', '#A4193D');
  button.style('border-radius', '2em');
  button.style('width', '8em');
  button.style('height', '4em');
  button.style('color', 'white');
  button.style('font', "normal 1em 'Poppins', sans-serif");

  button.mousePressed(saveImage);


  //model
  
  createP("Horizontal Position");
  x_pos = createSlider(-width, width, width/2);
  x_pos.addClass("mySliders1");
  createP("Vertical Position");
  y_pos = createSlider(-height, height, height/2);
  y_pos.addClass("mySliders1");

  // circle
  createP("Circle Horizontal Position");
  xc_pos = createSlider(-width, width, width/width);
  xc_pos.addClass("mySliders1");

  createP("Circle Vertical Position");
  yc_pos = createSlider(-height, height, height/height);
  yc_pos.addClass("mySliders1");

  createP("Circle gap");
  distance_circle = createSlider(-400, 400, 280, 5);
  distance_circle.addClass("mySliders1");

  createP("Circle count");
  noc = createSlider(0, 50, 10, 2);
  noc.addClass("mySliders1");

  createP("ellipse width size");
  cirw_size = createSlider(10, 200, 65, 5);
  cirw_size.addClass("mySliders1");

  createP("ellipse height size");
  cirh_size = createSlider(10, 200, 65, 5);
  cirh_size.addClass("mySliders1");

  createP("Circle opacity");
  cir_opa = createSlider(0, 200, 100, 10);
  cir_opa.addClass("mySliders1");


  //square
  createP("Square Horizontal Position");
  xs_pos = createSlider(-width, width, width/width);
  xs_pos.addClass("mySliders1");


  createP("Square Vertical Position");
  ys_pos = createSlider(-height, height, height/height);
  ys_pos.addClass("mySliders1");


  createP("Square gap");
  distance_square = createSlider(-800, 800, 350, 10);
  distance_square.addClass("mySliders1");


  createP("square size");
  sqr_size = createSlider(10, 100, 80, 5);
  sqr_size.addClass("mySliders1");


  createP("Square count");
  nos = createSlider(0, 50, 7, 2);
  nos.addClass("mySliders1");

  createP("Square opacity");
  sqr_opa = createSlider(0, 200, 100, 10);
  sqr_opa.addClass("mySliders1");


  //line

  createP("Line Horizontal position");
  xl_pos = createSlider(-width, width, width/width);
  xl_pos.addClass("mySliders1");

  createP("Line Vertical Position");
  yl_pos = createSlider(-height, height, height/height);
  yl_pos.addClass("mySliders1");

  createP("Line gap");
  distance_line = createSlider(-800, 800, 100, 20);
  distance_line.addClass("mySliders1");

  createP("Line size");
  line_size = createSlider(10, 500, 120, 5);
  line_size.addClass("mySliders1");

  createP("Line count");
  nol = createSlider(0, 500, 30, 2);
  nol.addClass("mySliders1");

  //triangle
  createP("Triangle Horizontal Position");
  xt_pos = createSlider(-width, width, width/width);
  xt_pos.addClass("mySliders1");

  createP("Triangle Vertical Position");
  yt_pos = createSlider(-height, height, height/height);
  yt_pos.addClass("mySliders1");

  createP("Triangle gap");
  distance_triangle = createSlider(-800, 800, 150, 10);
  distance_triangle.addClass("mySliders1");

  createP("Triangle size");
  tri_size = createSlider(10, 100, 30, 5);
  tri_size.addClass("mySliders1");

  createP("Triangle count");
  not = createSlider(0, 50, 10, 2);
  not.addClass("mySliders1");

  createP("Triangle opacity");
  tri_opa = createSlider(0, 200, 150, 10);
  tri_opa.addClass("mySliders1");

  
}

function draw() {

  //base settings

  setCenter( x_pos.value(), y_pos.value());
  background("wheat");

  //circle settings
  
  let distance = distance_circle.value();
  let circle_opa = cir_opa.value();
  push();
  let xcpo = xc_pos.value();
  let ycpo = yc_pos.value();
  setCenter( xcpo, ycpo );
  fill (255, 0, 150, circle_opa);
  noStroke();
  polarEllipses( noc.value(), cirw_size.value(), cirh_size.value(), distance );
  pop();

  //square
  push();
  let xspo = xs_pos.value();
  let yspo = ys_pos.value();
  setCenter(xspo, yspo);
  fill(0, 0, 255, sqr_opa.value());
  noStroke();
  polarSquares( nos.value(), sqr_size.value(), distance_square.value());
  pop();


  // line
  push();
  let xlpo = xl_pos.value();
  let ylpo = yl_pos.value();
  setCenter(xlpo, ylpo);
  strokeWeight(1);
  polarLines(nol.value(), line_size.value(), distance_line.value());
  pop();

  //triangle

  push();
  let xtpo = xt_pos.value();
  let ytpo = yt_pos.value();
  setCenter(xtpo, ytpo);
  fill(120, 125, 51, tri_opa.value());
  noStroke();
  polarTriangles( not.value(), tri_size.value(), distance_triangle.value());
  pop();

  

}

function saveImage(){
  save("mysketch.png");
}

function windowResized() {
  centerCanvas();
}

// function mouseReleased() {

//   // print to console current mouse position and offset
//   console.log("mouse", mouseX, mouseY, "offset", offsetX, offsetY);
  
//   // move canvas to the new position of the mouse
//   // origin of system is always on upper left corner of canvas
//   // so new position is mouse position + offset
//   cnv.position(mouseX + offsetX, mouseY + offsetY);
  
//   // update the offset
//   offsetX = offsetX + mouseX;
//   offsetY = offsetY + mouseY;
  
// }