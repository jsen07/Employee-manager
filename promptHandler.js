const inquirer = require('inquirer');
const viewAllDepartment = require('./db/connection.js');
const db = require('./db/connection.js');



function promptHandler(data) {
    if(data.option === 'View all departments') {
        viewAllDepartment();
    }

}


module.exports = promptHandler;