
//this is how we connect basic mongo db compass

import express from "express"
import path from "path"
import mongoose from "mongoose"

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "back",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

const messageSchema = new mongoose.Schema({
    name:String,
    email:String,
})

const Message = mongoose.model("Message",messageSchema)

const app = express();

const PORT = 5000;

// const users=[]

//using middlewares
app.use(express.static(path.join(path.resolve(),"public"))); //used to access public folder which are static in nature
app.use(express.urlencoded({extended: true}))



//setting up view engine
app.set("view engine","ejs") //this will set the engine so that we do not have to write .ejs extension

app.get("/",(req,res)=>{

    res.render("index")
});



app.get("/success",(req,res)=>{

    res.render("success")
});


app.post("/",async(req,res)=>{

const { name,email } = req.body

    await Message.create({name,email});
    res.redirect("/success")
})

app.get("/users",(req,res)=>{

    res.json({
        users,
    })
})



app.listen(5000,()=>{
    console.log(`Server is Working at port ${PORT}`);
    
    
})