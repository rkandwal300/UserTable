var { mysqlDatabase } = require("../mysql/mysql");
const {Readable} = require ('stream')


module.exports.FetchData = async (request, response) => {
  response.setHeader("Content-Type", "application/json ");

  if (request.method == "POST") {
    response.end("post resquest is not allowed in this route ");
  } else {
    try {
      const results = await mysqlDatabase("SELECT * FROM User_data ;");
      const mysql_data = JSON.parse(JSON.stringify(results));
      const JSON_mysql_Data = JSON.stringify(mysql_data);

      const json_stream = new Readable () ;
      json_stream.push(JSON_mysql_Data) ;
      json_stream.push(null) ;

      json_stream.pipe(response ) ;

    } catch (e) {
      response.end("Database Error ");
    }
  }
};
