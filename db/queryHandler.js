

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

function addEmployee(db, data, init) {
    let roleID =[];
    db.query('SELECT id from employee_role WHERE title = ?', [data.employeeRole], function(err, results) {
        roleID.push(results[0])
    })
 
        db.query('SELECT * FROM employee', function(err, results) {
            let arr = [];
            // let fulln = data.employeeManager.split(' ');
            for(let i = 0; i < results.length; i++) {
                let fullname = results[i].first_name + ' ' + results[i].last_name;
                if(fullname == data.employeeManager && data.employeeManager != 'No manager') {
                    
                    
            arr.push(
                {
                    first_name: data.first, 
                    last_name: data.last,
                    role_id: roleID[0].id,
                    manager_id: results[i].id
                }
                );
                db.query('INSERT INTO employee set ?', arr);
            }
        }
        if (data.employeeManager === 'No manager') {
            arr.push(
                {
                    first_name: data.first, 
                    last_name: data.last,
                    role_id: roleID[0].id,
                    manager_id: null
                }
                );
                db.query('INSERT INTO employee set ?', arr);
        }
        console.log(data.first + ' ' + data.last + ' ' + 'has been added.')
    })
    init();
}


function viewEmployees(db){
    let employees = [];
    db.query('Select first_name, last_name from employee', function (err, results) {
        for (i = 0; i < results.length; i++) {
            employees.push(results[i].first_name + " " + results[i].last_name);
        }  
        employees.push('No manager');
    });
    return employees;
}
function viewRoles(db){
    let roles = [];
    db.query('Select title from employee_role', function (err, results) {
        for (i = 0; i < results.length; i++) {
            roles.push(results[i].title);
        }  
    });
    return roles;
}

function updateEmployee(db, data) {

    db.query('SELECT * FROM emplpoyee', function(err, results) {
        for(let i = 0; i < results.length; i++) {
            if(results[i].first_name + ' ' + results[i].lastname === data.name) {

            }
        }
    })

    db.query("UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?", data.newRole,  )
}
module.exports = {
    viewAllDepartment,
    viewAllRoles,
    viewAllEmployee,
    addDepartment,
    addRole,
    viewEmployees,
    viewRoles,
    addEmployee,
    updateEmployee 
};