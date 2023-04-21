const inquirer = require('inquirer');
const db = require('./db/connection.js');
const { viewAllDepartment, viewAllRoles, viewAllEmployee, addDepartment } = require('./db/queryHandler.js');
const questions = [
    {
        type: "list",
        message: "Choose an action:",
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee','Update an employee role'],
        name: "option"
    }
]

db.connect((erorr) => {
        init();
});

function promptHandler(data) {

    switch(data.option) {
        case 'View all departments':
            viewAllDepartment(db, init);
            break;
        case 'View all roles':
            viewAllRoles(db, init);
            break;
        case 'View all employees':
            viewAllEmployee(db, init);
            break;
        case 'Add a department':
            inquirer.prompt({
                type: 'input',
                message: 'What is the name of the department?',
                name: 'dpName'
            }).then(function (data) {
                let department = data.dpName;
                addDepartment(db, department);
                viewAllDepartment(db, init);
            });     
            break;
    }


}
function init() {
    inquirer.prompt(questions).then(function(data) {
        promptHandler(data);
    });
};
module.exports = init;