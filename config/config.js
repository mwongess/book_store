const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'bookStore'
})


connection.connect((error)=>{
    if(error){
        console.error('Error connecting to the database:' ,error)
    }
    console.log('Connected to the database!')
})

module.exports = connection