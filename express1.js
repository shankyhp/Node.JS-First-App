



import express from "express"
import path from "path"


const app = express();

const PORT = 5000;

app.get("/",(req,res)=>{
    //res.status(404).send("Error")  // sends status code not found

    // res.json({
    //     success:true,
    //     products:[]
    //});  // sends json 

    //res.sendStatus(500).send("This is Chaining Method")  //used to chain diff res methods


    const pathLocation = path.resolve();

    // res.sendFile(path.join(pathLocation,"./index.html") );

    

});


app.listen(5000,()=>{
    console.log(`Server is Working at port ${PORT}`);
    
    
})