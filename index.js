const inquirer = require('inquirer');
const db = require('./db/connection.js');
const { viewAllDepartment, viewAllRoles, viewAllEmployee, addDepartment, addRole, viewEmployees, viewRoles, addEmployee, updateEmployee } = require('./db/queryHandler.js');
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
        viewEmployees(db);
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
            case 'Add a role':
                inquirer.prompt([{
                    type: 'input',
                    message: 'What is the title of the role?',
                    name: 'roleName'
                },
                {
                    type: 'input',
                    message: 'What is the salary of the role?',
                    name: 'roleSalary'
                },
                {
                    type: 'input',
                    message: 'What department does this role belong to?',
                    name: 'roleDepartment'
                }]).then(function (data) {
                    addRole(db, data);
                    viewAllRoles(db, init);
                }); 
                break;
                case 'Add an employee':
                    inquirer.prompt([{
                        type: 'input',
                        message: 'What is the first name of the employee?',
                        name: 'first'
                    },
                    {
                        type: 'input',
                        message: 'What is the last name of the employee?',
                        name: 'last'
                    },
                    {
                        type: 'list',
                        message: 'What is the role of the employee?',
                        name: 'employeeRole',
                        choices: viewRoles(db)
                    },
                    {
                        type: 'list',
                        message: 'Who is the manager of the employee?',
                        name: 'employeeManager',
                        choices: viewEmployees(db)
                    }]).then(function (data) {
                        addEmployee(db, data, init);
                    });
                    break;                                      
                    case 'Update an employee role':
                        let eArr = [];
                        db.query('SELECT * FROM employee', function (err, results) {
                        for(let i = 0; i < results.length; i++) {
                        eArr.push(results[i].first_name + ' ' + results[i].last_name);
                        }
                        
                        
                    inquirer.prompt([
                    {
                        type: 'list', 
                        message: 'What is the name you would like to update?',
                        name: 'name',
                        choices: eArr
                    },
                    {
                        type: 'list',
                        message: 'Which role do you want to assign the selected employee?',
                        name: 'newRole',
                        choices: viewRoles(db)
                    }]).then(function (data) {
                        updateEmployee(db, data, init); 
              
                    })
                })
                    break;             

            }
        }
function init() {
    inquirer.prompt(questions).then(function(data) {
        promptHandler(data);
    });
};
module.exports = init;