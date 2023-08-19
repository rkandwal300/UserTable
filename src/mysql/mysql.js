var mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Registration",
});

module.exports.mysqlDatabase = async (query  ) => {
  
  
try{
    const mysql_data = await  query_Mysql(query)
    // console.log(' myswl data = ',mysql_data)
    return mysql_data ;
} 
catch(e){
    return e ;
}
   
};

// "select * from User_data ;"


function query_Mysql ( query  ){
 return ( new Promise( (reject , resolve ) =>{


        conn.query( query , (   error, result) => {
            if (error) {
                return reject(error); 
            }
          
                resolve(JSON.parse(JSON.stringify(result)));
                // conn.end((error) => {
                //     if (error) {
                //       console.error('Error closing MySQL connection:');
                //       return;
                //     }
                
                //     // console.log('MySQL connection closed.');
                // });
            }) ;

})  )
}