const fs= require ('fs/promises')
const path= require ('path')
const {Readable} = require ('stream')


module.exports.FetchData = async (request, response) => {
  response.setHeader("Content-Type", "application/json ");

  if (request.method == "POST") {
    response.end("post resquest is not allowed in this route ");
  } else {

    const temp_data_address = path.join( __dirname ,'../data/data.json')
    const temp_data = await fs.readFile( temp_data_address , "utf-8") 

    const {users} = JSON.parse(temp_data) 
    
    
    const response_data = JSON.stringify(users) ; 
  
   

   
      
      const json_stream = new Readable () ;
      json_stream.push( response_data) ;
      json_stream.push(null) ;

      json_stream.pipe(response ) ;

  }
};
