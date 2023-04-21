

function viewAllDepartment(db, init) {
    db.query('Select * from department', function (err, results) {
        console.table(results);  
        init();
    });
}

function viewAllRoles(db, init) {
    db.query('Select * from employee_role', function (err, results) {
        console.table(results);  
        init();
    });
}

function viewAllEmployee(db, init) {
    db.query('Select * from employee', function (err, results) {
        console.table(results);  
        init();
    });
}

function addDepartment(db, data) {
    db.query('INSERT into department (department_name) VALUES (?)', data);
}

function addRole(db, data) {
    db.query(`INSERT into employee_role (title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE department_name = ?))`, [data.roleName, data.roleSalary, data.roleDepartment]);
}

module.exports = {
    viewAllDepartment,
    viewAllRoles,
    viewAllEmployee,
    addDepartment,
    addRole 
};