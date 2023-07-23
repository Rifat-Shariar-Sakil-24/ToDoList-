const mysql = require('mysql');
const dotenv = require('dotenv');
//const { rejects } = require('assert');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user:process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
    console.log('db '+ connection.state);
})

class DbService {
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }
    async getAllData() {
        
        try {
           const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";
                connection.query(query, (err, results) =>{
                     if(err) reject(new Error(err.message));
                     resolve(results);
                })
           });
           
           return response;
         // console.log(response);
        } catch(error){
             console.log(error);
        }
    }

    // async insertNewName(name){
    //     try{
    //         const dateAdded = new Date();
    //         const insertID = await new Promise((resolve, reject) => {
    //             const query = "INSERT INTO names (name,date_added) VALUES (?,?);";
    //             connectio.query(query, [name, dateAdded], (err, result) =>{
    //                  if(err) reject(new Error(err.message));
    //                  resolve(result.insertID);
    //             })
    //        });
    //        console.log(insertID);
    //        //return response;

    //     } catch(error){
    //         console.log(error);
    //     }
    // }
}

module.exports = DbService;