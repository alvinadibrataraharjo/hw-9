var express = require('express')

var conn = require('./connection.js');
var router = express.Router();

router.post('/', function(req, res){
    const { id, email, gender, password, role } = req.body;

    conn.query('insert into users (id, email, gender, password, role) values ($1, $2, $3, $4, $5)', 
    [id, email, gender, password, role],(err, result) => {
        if(err){ 
            return res.status(500).json(err)
        }
        res.send('Data user berhasil bertambah')
    })
})

module.exports = router