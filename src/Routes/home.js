const path = require("path");
const fs = require("node:fs/promises");


module.exports.home= async (request , response )=>{
  response.setHeader("Content-Type", 'text/html');
       let data = await readHtmlPage('../html_document/index.html') ;
  
       try{
        response.writeHead(200, {'Content-Type': 'text/html'});
        //  response.writeHead(200, headers) ;
           response.end(`${data}`);
         }
         catch(e)  {
           response.end("cannot load page " + e);
         }
 
}


  
async function readHtmlPage(props) {
    let pathpage = path.resolve(__dirname, props);
  
    let data = await fs.readFile(pathpage, "utf-8");
    return data;
  }
  