

import express from "express"
import path from "path"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "back",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const User = mongoose.model("User",userSchema)
const app = express();
const PORT = 5000;


//using middlewares
app.use(express.static(path.join(path.resolve(),"public"))); //used to access public folder which are static in nature
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())



//setting up view engine
app.set("view engine","ejs") //this will set the engine so that we do not have to write .ejs extension


const isAuthenticated =async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
      const decoded = jwt.verify(token, "sdasdasdasdasdas");
  
      req.user = await User.findById(decoded._id);  //find user by id
  
      next();
    } else {
      res.redirect("/login");
    }
  };


app.get("/",isAuthenticated,(req,res)=>{

//console.log(req.cookies.token); // this is how we can access cookies which will help us to check if we are login on the page

res.render("logout",{name:req.user.name});

    
});

app.get("/login", (req, res) => {
    res.render("login");
  });

app.get("/register",(req,res)=>{
    res.render("register");

    });



app.post("/login",async(req,res)=>{

    const {email,password} = req.body;
let user = await User.findOne({email});

if(!user) return res.redirect("/register") // to check if the email is registered

    const isMatch = await bcrypt.compare(password,user.password); // this compares the user password with database password

    if (!isMatch) // to check the password is correct
        return res.render("login", { email,message: "Incorrect Password" });
    
      const token = jwt.sign({ _id: user._id }, "sdasdasdasdasdas");
    
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
      });
      res.redirect("/");
})



app.post("/register",async(req,res)=>{


    const {name,email,password}= req.body

let user = await User.findOne({email})

if(user){

    return res.redirect("/login")
    
}

const hashedPassword = await bcrypt.hash(password,10)

     user = await User.create({
        name,
        email,
        password:hashedPassword,
    });

    const token = jwt.sign({
        _id:user._id},
        "sdasdasdasdasdas",
    ) //this creates a token 

    res.cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now() + 60 * 100)
    });
        res.redirect("/")
    
})

app.get("/logout",(req,res)=>{
    res.cookie("token",null,{
        httpOnly:true,
        expires:new Date(Date.now()),
    });
        res.redirect("/")
    
})



app.listen(5000,()=>{
    console.log(`Server is Working at port ${PORT}`); 
})