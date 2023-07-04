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

});


//read
app.get('/getAll', (request, response)=>{
    const db = dbService.getDbServiceInstance();
    
    response.json({
        success: true
    })
});

app.listen(process.env.PORT, () => console.log('app is running'));