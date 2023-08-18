var { mysqlDatabase } = require('../mysql/mysql');

module.exports.update_user = async (request, response) => {
  if (request.method == 'PUT') {
    let req_data = [];

    request.on('data', (chunk) => {
      req_data.push(chunk);
    });

    request.on('end',async () => {
      updated_data = JSON.parse(req_data.toString());
      if (
        updated_data.name.length > 0 &&
        updated_data.email.length > 0 &&
        updated_data.phone.length > 0 
      ) {
        console.log(' client side data = ', updated_data);
        const query =`UPDATE User_data SET  fullname = '${updated_data?.name}',  phone = '${updated_data?.phone}' , email = '${updated_data?.email}' WHERE id = ${updated_data?.id};`
        const mysql_updated = await  mysqlDatabase(query);
        try {
          response.end('update request successful');
        } catch (e) {
          response.end(' data cannot be updated');
        }
      } else {
        response.end('please enter some data ');
      }
    });

    request.on('error', (e) => {
      response.end(` error occured in fetching data ${e}`);
    });
  } else {
    response.end(' Update api  only supports put method');
  }
};
