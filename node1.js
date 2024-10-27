
//this is for node js 
import http from "http" 
import fs from "fs" //to import files
import { generateLovePercent } from "./features.js" // we can import methods like this in node js


const server = http.createServer((req,res)=>{
   
    if(req.url === "/"){
        res.end("<h1>Home Page</h1>")
        
    }
    else if(req.url === "/love"){ //to read import js file
        res.end(`<h1> your love percent is ${generateLovePercent()}<h1>`)
    }

    else if(req.url === "/file"){ //to read file
        fs.readFile("./index.html",(err,data)=>{
            res.end(data)
        })
    }
    else{
        res.end("<h1>Page Not Found</h1>")
    }
    
    
})

server.listen(5000,()=>{
    console.log("Server is working");
}) 

