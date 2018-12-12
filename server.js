const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.json())

let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs',
    multipleStatements: true
})

mysqlConnection.connect( (error) => {
    if(!error)
        console.log('db terkoneksi')
    else
        console.log(error)
})

app.listen(3001, () => {
    console.log('sedang berjalan pada port 3001')
})

app.get('/API/user', (req, res) => {
    mysqlConnection.query('SELECT * FROM user', (error, rows, fields) => {
        if(!error) {
            res.send(rows)
        }            
        else
            console.log(error)
    })
})

app.get('/API/user/:id_user', (req, res) => {
    mysqlConnection.query('SELECT * FROM user WHERE id_user = ?', [req.params.id_user],(error, rows, fields) => {
        if(!error) {
            res.send(rows)
        }            
        else
            console.log(error)
    })
})

app.delete('/API/user/:id_user', (req, res) => {
    mysqlConnection.query('DELETE FROM user WHERE id_user = ?', [req.params.id_user], (error, rows, fields) => {
        if(!error)
            res.send('Delete data berhasil')
        else
            console.log(error)
    })
})

app.post('/API/user', (req, res) => {
    let user = req.body 
    //let sql = 'INSERT INTO user VALUE (?,?,?)'
    let sql = 'SET @id_user = ?; SET @nama_user = ?; SET @hp = ?; \
    CALL UserAddorEdit(@id_user, @nama_user, @hp);'
    
    mysqlConnection.query(sql, [user.id_user, user.nama_user, user.hp], (error, rows, fields) => {
        if(!error) 
            res.send('sukses insert data')
        else
            console.log(error)
    })
})

app.put('/API/user', (req, res) => {
    let user = req.body 
    //let sql = 'UPDATE user SET id_user=?, nama_user=?, hp=? WHERE id_user=?'
    let sql = 'SET @id_user = ?; SET @nama_user = ?; SET @hp = ?; \
    CALL UserAddorEdit(@id_user, @nama_user, @hp);'
    mysqlConnection.query(sql, [user.id_user, user.nama_user, user.hp], (error, rows, fields) => {
        if(!error) 
            res.send('sukses update data')
        else
            console.log(error)
    })
})
