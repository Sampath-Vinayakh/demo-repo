/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
const PORT = 3000;


app.get("/files", (req,res)=>{
  fs.readdir(path.join(__dirname,"/files"),(err,data)=>{
    if(err){
      return res.json({message:err});
    } else {
      return res.json({message:"Found the files",data:data});
    }
  })
})

app.get("/file/:fileName",(req,res)=>{
  const fileName = path.join(__dirname,"/files/",req.params.fileName);
  console.log(fileName);
  fs.readFile(fileName,"utf-8",(err,data)=>{
    if(err){
      return res.status(404).json({message:"File not found"});
    } else {
      return res.status(200).json({message:"File found sucessfully!",data:data});
    }
  })

})

app.all("/*",(req,res)=>{
  res.sendStatus(404);
})


app.listen(PORT,()=>{
  console.log(`server listenig on PORT ${PORT}`)
})


module.exports = app;