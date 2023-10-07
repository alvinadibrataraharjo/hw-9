var express = require('express')

var conn = require('./connection.js');
var router = express.Router();
const jwt = require("jsonwebtoken");

router.post('/', function(req, res){
    const { email, password } = req.body;

    conn.query('SELECT * FROM users WHERE email=$1 AND password=$2', 
    [email, password],(err, result) => {
        if(err){ 
            return res.status(500).json(err)
        }
        const token = jwt.sign(
            result.rows[0], 'token'
        )
        res.send(token)
    })
})

module.exports = router