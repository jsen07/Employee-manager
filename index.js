const inquirer = require('inquirer');
const promptHandler = require('./promptHandler.js');

const questions = [
    {
        type: "list",
        message: "Enter text (can enter up to three characters):",
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee','Update an employee role'],
        name: "option"
    }
]

function init() {
    inquirer.prompt(questions).then(function(data) {
        promptHandler(data);
    });
};

module.exports = { init };