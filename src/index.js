const inquirer = require('inquirer');
const { viewAllDepartments } = require('./viewFunctions');
const { addDepartment, addRole } = require('./addFunctions');
const connection = require('../db/connection');  // Import the connection object

const startApp = async () => {
  const { choice } = await inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'Add Department', 'View All Roles', 'Add Role', /*...other choices...*/, 'Exit']
  });

  switch (choice) {  // Switch on choice directly, not choice.action
    case 'View All Departments':
        // Your logic to view all departments
        startApp();
        break;
    case 'View All Roles':
        // Your logic to view all roles
        startApp();
        break;
    case 'View All Employees':
        // Your logic to view all employees
        startApp();
        break;
    case 'Add Department':
        addDepartment();
        startApp();
        break;
    case 'Add Role':
        addRole();
        startApp();
        break;
    case 'Add Employee':
        // Your logic to add an employee
        startApp();
        break;
    case 'Update Employee Role':
        // Your logic to update an employee's role
        startApp();
        break;
    default:
        connection.end();
  }
};

startApp();
