
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//create
app.post('/insert', (request, response) => {
 //const { name } = request.body;
//  const db = dbService.getDbServiceInstance();
//  const result = db.getAllData();
//  result
//  .then(data => response.json({data : data}))
//  .catch(err => console.log(err));
//  const result = db.insertNewName(name);
//  result
//  .then(data => response.json({success: true}))
//  .catch(err => console.log(err));


 console.log(request.body);

});


//read
app.get('/getAll', (request, response)=>{
     const db = dbService.getDbServiceInstance();
     const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

   

 
});

app.listen(process.env.PORT, () => console.log('app is running'));







