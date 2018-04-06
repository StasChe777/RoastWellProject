const mysql = require('mysql');
const express = require('express')



//create connection 

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass",
  port: '3000',
  database: 'orders'
});

//Connect

con.connect(function(err) {
    if (err) {throw err;}
    console.log('MySQL connected')

  });


  const app = express()
  
  //create DB
  app.get('/orders', (req, res) => {
    let sql = 'CREATE DATABASE orders';
    con.query(sql, (err, result) => {
 if(err) throw err;
 res.send('database created...');
    });
  });


  app.listen(3000, () => {
    console.log('server running at port 3000')
  });

