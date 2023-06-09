DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;
-- INITIALIZE DATABASE
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE employee_role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  CONSTRAINT FK_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT REFERENCES employee,
  CONSTRAINT FK_employee_role FOREIGN KEY (role_id) REFERENCES employee_role(id) ON DELETE SET NULL
);
