
let date2 = new Date ;

console.log("hello",date2 )


var date = new Date();
var timestamp = `${date.getDate()}${date.getMonth()+1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()  * 12}`

console.log("data = ",timestamp);