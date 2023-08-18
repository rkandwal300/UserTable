const formidable = require("formidable");
var fs = require("fs");
var path = require("path");
var { mysqlDatabase } = require("../mysql/mysql");

module.exports.add_user = async (request, response) => {
  if (request.method == "POST") {


    const chunks = [];
    request.on("data", (chunk, err) => {
      if (err) throw err;
      chunks.push(chunk);
    });
    request.on("end", async () => {
      // console.log("all parts/chunks have arrived");
      const data = Buffer.concat(chunks);
      // console.log('data 1 =',data );
      temp = JSON.parse(data.toString());
      if (
        temp.name.length > 0 &&
        temp.email.length > 0 &&
        temp.phone.length > 0 &&
        temp.password.length > 0
      ) {
        if (temp.phone.length > 13) {
          return response.end(
            "phone number should not more than 10 digits" + temp.phone.length
          );
        }

        try {
          let mysql_data = await mysqlDatabase(
            `Insert INTO User_data  (fullname , phone , email , password ) VALUES ( '${temp.name}'  , '${temp.phone}' , '${temp.email}' , '${temp.password}' ) ;`
          ); // data is sent  to mysql function
          // let mysql_data = await mysqlDatabase("select * from User_data ;" , temp ,response ) // data is sent  to mysql function
          if (mysql_data) {
            response.end("data Recieved");
          } else {
            response.end("database error ");
          }
        } catch (e) {

          response.end("database error"+e);
        }
      } else {
        response.end(" name field is empty ");
      }
    });

    request.on("error", (err) => {
      response.end("error happened by  client ");
    });
  } else {
    response.end(" get req accepted ");
  }
};
