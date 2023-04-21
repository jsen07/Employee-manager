INSERT INTO department (department_name) VALUES 
("University of Birmingham"),
("Bootcamp"),
("Zoom");


INSERT INTO employee_role (title, salary, department_id) VALUES
('Head', 15.00, 1),
('Teacher', 15.00, 2),
('Student', 0.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Thembiswa', 'Zwane', 1, NULL),
('Meedaxa', 'Ahmed', 2, 1),
('Dylson', 'Oliveira', 2, 1),
('Jayssen', 'De Castro', 3, NULL);

