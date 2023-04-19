const inquirer = require('inquirer');


const questions = [
    {
        type: "list",
        message: "Enter text (can enter up to three characters):",
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee','Update an employee role'],
        name: "option"
    }
]

function init() {
    inquirer.prompt(questions);
};

module.exports = { init };