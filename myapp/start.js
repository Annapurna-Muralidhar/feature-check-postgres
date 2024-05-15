const express = require('express');
const app = express();
const pg= require('pg');
const {Pool,Client}=pg
const connectionString=process.env.DATABASE_URL;

const client = new Client({
  connectionString,
  ssl:{
    rejectUnauthorized:false,
  }
})



app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/createtable',async function(req,res){
  await client.connect();
  try{
    await client.query('CREATE TABLE Persons (PersonID int,LastName varchar(255),FirstName varchar(255),Address varchar(255),City varchar(255))');
    res.send('table created');
  }catch(e){
    res.send('table already created');
  }
 
  //await client.end();
})

app.get('/insertdata',async function(req,res){
  const text = 'INSERT into Persons(PersonID,LastName,FirstName,Address,City) VALUES ($1,$2,$3,$4,$5);'
  const values=[1,'Annapurna','Pedditi','Telangana','Hyderabad']
  await client.query(text,values)
  res.send("DAta inserted")
})

app.get('/readdata',async function(req,res){
  result=await client.query('SELECT * from Persons')
  res.send(result)
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});
