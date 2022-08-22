//require dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

//mysql connection
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3001,
  user: "root",
  password: "p@ssword",
  database: "employee_tracker",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  searchPrompt();
});

//Run function
function searchPrompt() {
  inquirer
    .prompt({
      name: "selection",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    })
    .then(function (answer) {
      console.log(answer);

      if (answer.selection === "View all departments") {
        viewDepts();
      } else if (answer.selection === "View all roles") {
        viewRole();
      } else if (answer.selection === "View all employees") {
        viewEmployee();
      } else if (answer.selection === "Add a department") {
        addDept();
      } else if (answer.selection === "Add a role") {
        addRole();
      } else if (answer.selection === "Add an employee") {
        addEmployee();
      } else if (answer.selection === "Update an employee role") {
        updateRole();
      } else {
        connection.end();
      }
    });
}

//View all departments function
function viewDepts() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    searchPrompt();
  });
}

//View all roles function
function viewRole() {
  connection.query(
    "SELECT role.title, role.id, role.salary, role.department_id, department.id, department.name FROM role LEFT JOIN department on role.department_id = department.id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      searchPrompt();
    }
  );
}

//View all employees function
function viewEmployee() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, department.name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      searchPrompt();
    }
  );
}
