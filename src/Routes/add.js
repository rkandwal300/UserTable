const fs = require("fs/promises");
const path = require("path");
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

        const temp_data_address = path.join(__dirname, "../data/data.json");
        try {
          const temp_data = await fs.readFile(temp_data_address, "utf-8");
          const data_json = JSON.parse(temp_data);

          var date = new Date();
          var timestamp = `${date.getDate()}${
            date.getMonth() + 1
          }${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${
            date.getMilliseconds() * 12
          }`;

          let request_data = {
            id: `${timestamp}`,
            fullname: temp.name,
            phone: temp.phone,
            email: temp.phone,
            password: temp.phone,
          };

          data_json.users.push(request_data);
          try {
            fs.writeFile(temp_data_address, JSON.stringify(data_json));

            response.end(" user  data saved  in database");
          } catch (e) {
            response.end(" data cannot be saved " + e);
          }
        } catch (e) {
          response.end("database error" + e);
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
