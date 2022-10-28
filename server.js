const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./db");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

var imgModel = require('./model/image.js');



const { adminAuth, userAuth } = require("./middleware/auth.js");

const PORT = process.env.PORT || 3000;



app.set("view engine", "ejs");

connectDB();

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./Auth/route"));
app.get("/", (req,res) => res.render("home"));
app.get("/register", (req,res) => res.render("register"));
app.get("/login", (req,res) => res.render("login"));
app.get("/art1", (req,res) => res.render("art1"));
app.get("/art2", (req,res) => res.render("art2"));

app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.redirect("/");
});
app.get("/admin", adminAuth, (req, res) => res.render("admin"));
app.get("/user", userAuth, (req, res) => res.render("user"));


const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});



// Image upload
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads")
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now())
  }
});

var upload = multer({ storage: storage});

app.get("/imagesPage", (req,res) => {
  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occured', err);
    }
    else {
      res.render('imagesPage', { items: items });
    }
  });
});

app.post("/imagesPage", upload.single('image'), (req, res, next) => {

  var obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: 'image/png'
    }
  }
  imgModel.create(obj, (err, item) => {
    if(err) {
      console.log(err);
    }
    else {
      //item.save();
      res.redirect("/imagesPage");
    }
  });
});
