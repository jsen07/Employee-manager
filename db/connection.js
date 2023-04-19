const mysql = require('mysql2');
const { init } = require('../index.js');


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'jays123',
      database: 'employees'
    },
    console.log(`Connected to the employees database.`)
  );

  init();
