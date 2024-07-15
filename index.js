const path = require("path");
const express = require("express");
const multer  = require('multer');

const PORT = 3001;
const app = express();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "./uploads")
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({storage: storage});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

app.get("/", (req, res)=>{
  return res.render("home");
});

app.post("/upload", upload.single("profileImage"), (req, res)=>{
   return res.redirect("/")
})

app.listen(PORT, console.log("File Uploader server started"));