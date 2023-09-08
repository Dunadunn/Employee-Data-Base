const inquirer = require('inquirer');
const connection = require('../db/connection');

const addDepartment = async () => {
    const { deptName } = await inquirer.prompt({
        type: 'input',
        name: 'deptName',
        message: 'Enter the name of the new department:',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter the department name!');
                return false;
            }
        }
    });

    const query = 'INSERT INTO department (name) VALUES (?)';
    connection.query(query, deptName, (err, res) => {
        if (err) throw err;
        console.log(`${deptName} added to Departments!`);
    });
};

const addRole = async () => {
    // Fetch the list of departments
    const departmentQuery = 'SELECT id, name FROM department';
    connection.query(departmentQuery, async (err, departments) => {
        if (err) throw err;

        // Map department data to be used in inquirer prompt
        const departmentChoices = departments.map(department => ({
            name: department.name,
            value: department.id
        }));

        // Prompt user for role details
        const { title, salary, departmentId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the new role:'
                // Add validation if needed
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for this role:'
                // Add validation if needed
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Choose the department for this role:',
                choices: departmentChoices
            }
        ]);

        // Insert the new role into the database
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        connection.query(query, [title, salary, departmentId], (err, res) => {
            if (err) throw err;
            console.log(`Role ${title} added successfully!`);
        });
    });
};

module.exports = { addDepartment, addRole };
