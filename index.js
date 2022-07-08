//require dependencies
const inquirer = require("inquirer");
const mysql = require('mysql2');
require("console.table");

//mysql connection
const connection = mysql.createConnection({

  });  
  
  connection.connect((err) => {
    if (err) throw err;
  
    runSearch();
  });