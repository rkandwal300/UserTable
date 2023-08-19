const fs = require("fs/promises");
const path = require("path");

module.exports.delete_user = async (request, response) => {
  if (request.method == "DELETE") {
    const chunks = [];
    request.on("data", (chunk, err) => {
      if (err) throw err;
      chunks.push(chunk);
    });
    request.on("end", async () => {
      // console.log("all parts/chunks have arrived");
      const data = Buffer.concat(chunks);
      // console.log('data 1 =',data );
      id = JSON.parse(data.toString());

      try {
        const temp_data_address = path.join(__dirname, "../data/data.json");
        const temp_data = await fs.readFile(temp_data_address, "utf-8");
        const data_json = JSON.parse(temp_data);
        let temp_database_data = data_json.users;
        data_json.users.map((val, index) => {
          if (val.id == id) {
            // console.log(val);
            temp_database_data.splice(index, 1);
          }
        });
        // console.log('data temp json = ',temp_database_data) ;
        data_json.users = temp_database_data;
        try {
          fs.writeFile(temp_data_address, JSON.stringify(data_json));
          response.end("user delete successfully ");
        } catch (e) {
          response.writeHead(200, { "content-type": "text/plain" });

          response.end("error cannot delete user" + e);
        }
      } catch (e) {
        response.end("database error" + e);
      }
    });
  }
};
