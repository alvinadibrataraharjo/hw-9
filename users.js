var express = require('express')
var authentication = require('./middleware/auth.js')
var conn = require('./connection.js');
var router = express.Router();

router.get('/', function(req, res) {
    // limit
    conn.query(`select * from users ${req.query.limit ? 'LIMIT ' + req.query.limit : ''}`, 
    (err, result) => {
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
})

router.get('/:id', function(req, res){
    // ambil req id
    const id = req.params.id;

    conn.query('select * from users where id = $1',[id], (err, result) => {
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
})

// delete
router.delete('/:id', authentication, function(req, res){
    const { id } = req.params;

    conn.query('delete from users where id = $1', 
    [id],(err, result) => {
        if(err){
            throw err   
        }
        res.send('data: ' + id + ' deleted')
    })
})

module.exports = router