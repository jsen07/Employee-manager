

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

module.exports = {
    viewAllDepartment,
    viewAllRoles,
    viewAllEmployee,
    addDepartment 
};