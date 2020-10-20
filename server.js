const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  port: conf.port,
  user: conf.user,
  password: conf.password,
  database: conf.database
});

connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})

app.get('/api/customers', (req, res)=>{
  connection.query("SELECT * FROM customer", (err, rows)=>{
    res.send(rows);
  })
})

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res)=>{
  //upload.single('image') >> FormData 에 변수값을 따라간다.
  // console.log(req.body)
  let sql = 'INSERT INTO customer VALUES(null, ?, ?, ?, ? ,?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let job = req.body.job;
  let gender = req.body.gender;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,(err, rows)=>{
    res.send(rows);
  })
})

app.listen(port, ()=> console.log(`connet - ${port}`));
