const mysql = require('mysql2');


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'jays123',
      database: 'employees'
    },
    console.log(`Connected to the employees database.`)
  );

  module.exports = db;