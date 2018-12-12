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

app.get('/API', (req, res) => {
    mysqlConnection.query('SELECT * FROM user', (error, rows, fields) => {
        if(!error) {
            rows.forEach( element => {
                res.send(rows)
            })
        }            
        else
            console.log(error)
    })
})

app.get('/API/:id_user', (req, res) => {
    mysqlConnection.query('SELECT * FROM user WHERE id_user = ?', [req.params.id_user],(error, rows, fields) => {
        if(!error) {
            res.send(rows)
        }            
        else
            console.log(error)
    })
})

app.delete('/API/:id_user', (req, res) => {
    mysqlConnection.query('DELETE FROM user WHERE id_user = ?', [req.params.id_user], (error, rows, fields) => {
        if(!error)
            res.send('Delete data berhasil')
        else
            console.log(error)
    })
})

app.post('/API', (req, res) => {
    let tmp = req.body 
    let sql = 'INSERT INTO user VALUE (?,?,?)'
    mysqlConnection.query(sql, [tmp.id_user, tmp.nama_mk, tmp.sks], (error, rows, fields) => {
        if(!error) 
            res.send('sukses insert data')
        else
            console.log(error)
    })
})

app.put('/API', (req, res) => {
    let tmp = req.body 
    let sql = 'UPDATE user SET id_user=?, nama_mk=?, sks=? WHERE id_user=?'
    mysqlConnection.query(sql, [tmp.id_user, tmp.nama_mk, tmp.sks, tmp.id_user], (error, rows, fields) => {
        if(!error) 
            res.send('sukses update data')
        else
            console.log(error)
    })
})
