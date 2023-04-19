INSERT INTO department (id, department_name) VALUES 
(0,"University of Birmingham"),
(1,"Bootcamp"),
(2, "Zoom");


INSERT INTO employee_role (id, title, salary, department_id) VALUES
(0,'Head', 15.00, 0),
(1,'Teacher', 15.00, 1),
(2,'Teacher', 15.00, 1),
(3,'Student', 0.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Thembiswa', 'Zwane', 0, 1),
('Meedaxa', 'Ahmed', 1, 0),
('Dylson', 'Oliveira', 2, 0),
('Jayssen', 'De Castro', 3, 0);

