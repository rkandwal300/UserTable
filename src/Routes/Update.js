const fs = require("fs/promises");
const path = require("path");

module.exports.update_user = async (request, response) => {
  if (request.method == "PUT") {
    let req_data = [];

    request.on("data", (chunk) => {
      req_data.push(chunk);
    });

    request.on("end", async () => {
      updated_data = JSON.parse(req_data.toString());
      if (
        updated_data?.id &&
        updated_data?.name.length > 0 &&
        updated_data?.email.length > 0 &&
        updated_data?.phone.length > 0
      ) {
        // const query = `UPDATE User_data SET  fullname = '${updated_data?.name}',  phone = '${updated_data?.phone}' , email = '${updated_data?.email}' WHERE id = ${updated_data?.id};`;
        try {
          const temp_data_address = path.join(__dirname, "../data/data.json");

          const temp_data = await fs.readFile(temp_data_address, "utf-8");
          const data_json = JSON.parse(temp_data);
          let temp_database_data = data_json.users;
          let Temprary_Updated_data = {
            id: updated_data?.id,
            fullname: updated_data?.name,
            email: updated_data?.email,
            phone: updated_data?.phone,
          };

          data_json.users.map((val, index) => {
            if (val?.id == Temprary_Updated_data?.id) {
              // console.log(val);
              temp_database_data.splice(index, 1);
              temp_database_data.push(Temprary_Updated_data);
            }
          });
          // console.log('data temp json = ',temp_database_data) ;
          data_json.users = temp_database_data;
       
          try {
            fs.writeFile(temp_data_address, JSON.stringify(data_json));
            response.end("user updated  successfully ");
          } catch (e) {
            response.writeHead(200, { "content-type": "text/plain" });

            response.end("error cannot update user Details" + e);
          }
        } catch (e) {
          response.end(" data cannot be updated" + e);
        }
      } else {
        response.end("please enter some data ");
      }
    });

    request.on("error", (e) => {
      response.end(` error occured in fetching data ${e}`);
    });
  } else {
    response.end(" Update api  only supports put method");
  }
};
