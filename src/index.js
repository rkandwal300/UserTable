const http = require("http");
const {add_user} = require('./Routes/add.js');
const {home} = require('./Routes/home.js');
const {FetchData} = require('./Routes/Fetch.js');
const {delete_user} = require('./Routes/delete.js');
const { update_user } = require("./Routes/Update.js");




const server = http.createServer((request, response) => {
  headers={
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'POST, GET, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials':false,
    'Access-Control-Max-Age':'86400', // 24 hours
    'Access-Control-Allow-Headers':'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  }
    // response.setHeader("Content-Type", "application/json ,'text/html' , 'image/x-icon' ");
    // response.setHeader("Content-Type", "application/json ,'text/html' , 'image/x-icon' ");

    if (request.url === "/") {
   home(request , response)
        
    } else if (request.url === "/add") {

      add_user( request , response )
      
    } else if (request.url === "/fetch") {
   
      FetchData( request , response )
     
    
    } else if (request.url === "/delete") {
      delete_user( request , response )
     
    } else if (request.url === "/update") {

      update_user( request , response )
     
    }

    
    else {
      response.end("<h1> 404 errorpage home page </h1> ");
    }
  });
  
  server.listen(2023);
  
  console.log("http://localhost:2023/");
