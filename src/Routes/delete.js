var {mysqlDatabase } = require('../mysql/mysql')


module.exports.delete_user = async (request, response) => {
    if (request.method == "DELETE") {

        
        const chunks = [];
        request.on("data", (chunk, err) => {
          if(err) throw err; 
          chunks.push(chunk);
        });
        request.on("end", async () => {
          // console.log("all parts/chunks have arrived");
          const data = Buffer.concat(chunks);
          // console.log('data 1 =',data );
          temp = JSON.parse(data.toString());

          try{

          let mysql_data = await mysqlDatabase(`delete from User_data where id = ${temp}` ) 
          if(mysql_data){
            response.end('just delete user ')
          }else{
            response.end( "database error ")
          }
          
        }
        catch(e){
        
          response.end("database error"+e);
        }

        
        })
    }
}
  
  
  
  