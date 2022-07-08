//require dependencies
const inquirer = require("inquirer");
const mysql = require('mysql2');
require("console.table");

//mysql connection
const connection = mysql.createConnection({
  });  

const PORT = process.env.PORT || 3001;
  
  connection.connect((err) => {
    if (err) throw err;
  
    searchEmployee();
  });

//Run function
function searchEmployee() {
  inquirer
    .prompt({
      name: "selection",
      type: "list",
      message: "What would you like to do?",
      choices: 
        [
            "View all departments",
            "View all roles",
            "View all employees", 
            "Add a department",
            "Add a role",
            "Add an employee", 
            "Update an employee role",
        ]
    })
    .then(function(answer) {
        console.log(answer);
      
      if (answer.selection === "View all departments") {
        viewAll();
      }
      else if(answer.selection === "View all roles") {
        viewRole();
  
      } 
      else if(answer.selection === "View all employees") {
        viewEmployee();
  
      }
      else if(answer.selection === "Add a department") {
        addDept();
        
  
      }
      else if(answer.selection === "Add a role") {
        addRole();
        
      }
      else if(answer.selection === "Add an employee") {
        addEmployee();
  
      }
      else if(answer.selection === "Update an employee role") {
        updateRole();
  
      }else{
        connection.end();
      }
    });
  }
  