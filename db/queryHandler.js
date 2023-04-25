
// VIEW ALL DEPARTMENTS IN DATABASE
function viewAllDepartment(db, init) {
    db.query('Select * from department', function (err, results) {
        console.table(results);  
        init();
    });
}
// VIEW ALL ROLES IN DATABASE
function viewAllRoles(db, init) {
    db.query('Select * from employee_role', function (err, results) {
        console.table(results);  
        init();
    });
}
//VIEW ALL EMPLOYEES IN DATABASE
function viewAllEmployee(db, init) {
    db.query('Select * from employee', function (err, results) {
        console.table(results);  
        init();
    });
}
// ADD DEPARTMENT
function addDepartment(db, data, init) {
    db.query('INSERT into department (department_name) VALUES (?)', data);
    init();
}
// ADD ROLE
function addRole(db, data, init) {
    db.query(`INSERT into employee_role (title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE department_name = ?))`, [data.roleName, data.roleSalary, data.roleDepartment]);

    init();
}

// ADD EMPLOYEE
function addEmployee(db, data, init) {
    let roleID =[];
    db.query('SELECT id from employee_role WHERE title = ?', [data.employeeRole], function(err, results) {
        roleID.push(results[0])
    })
 
        db.query('SELECT * FROM employee', function(err, results) {
            let arr = [];
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

// EMPLOYEE CHOICES FOR PROMPT
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

// DEPARTMENT CHOICES FOR PROMPT
function viewDepartment(db) {
    let dp = [];
    db.query('Select department_name from department', function (err, results) {
        for (i = 0; i < results.length; i++) {
            dp.push(results[i].department_name);
        }  
    });
    return dp;
}

// ROLE CHOICES FOR PROMPT
function viewRoles(db){
    let roles = [];
    db.query('Select title from employee_role', function (err, results) {
        for (i = 0; i < results.length; i++) {
            roles.push(results[i].title);
        }  
    });
    return roles;
}

// UPDATE AN EMPLOYEE ROLE 
function updateEmployee(db, data, init) {
    let roleID = [];
    db.query('SELECT * FROM employee_role', function (err, results) {
        for(let i = 0; i < results.length; i++) {
            if(data.newRole === results[i].title) {
                roleID.push(results[i].id)
            }
        }
    })
    
    db.query('SELECT * FROM employee', function (err, results) {
        for(let i = 1; i < results.length; i++) {
            let fullname = results[i].first_name + ' ' + results[i].last_name
            if(fullname === data.name) {
                db.query("UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?", [roleID[0], results[i].first_name, results[i].last_name]) 
                }
            }

            })
        
init();
        }

//EXPORT FUNCTIONS
module.exports = {
    viewAllDepartment,
    viewAllRoles,
    viewAllEmployee,
    addDepartment,
    viewDepartment,
    addRole,
    viewEmployees,
    viewRoles,
    addEmployee,
    updateEmployee 
};