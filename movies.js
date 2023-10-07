var express = require('express')

var conn = require('./connection.js');
var authentication = require('./middleware/auth.js')
var router = express.Router();

const middleware = (req, res, next) => {
    res.set('Content-Type', 'application/json');
    if(req.headers['content-type'] !== 'application/json'){
        res.status(400).send('server requires application/json')
    } else {
        next()
    }
}

// get all data
router.get('/', function(req, res){
    conn.query(`select * from movies ${req.query.limit ? 'LIMIT ' + req.query.limit : ''}`, 
    (err, result) => {
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
})

// get spesific data 
router.get('/:id', function(req, res){
    // ambil req id
    const id = req.params.id;

    conn.query('select * from movies where id = $1',[id], (err, result) => {
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
})

// put
router.put('/:id', authentication, function(req, res){
    const id = req.params.id
    const title = req.body.title

    conn.query('update movies set title = $2 where id = $1', [id, title],(err, result) => {
        if(err){
            return res.status(500).json(error)
        }
        res.send('Movies updated')
    })
})

// post
router.post('/',middleware, function(req, res){
    const { title, genres, year } = req.body;

    conn.query('insert into movies (title, genres, year) values ($1, $2, $3)', 
    [title, genres, year],(err, result) => {
        if(err){
            throw err   
        }
        res.send('Movies berhasil terbuat')
    })
})

// delete
router.delete('/:id',authentication, function(req, res){
    const { id } = req.params;

    conn.query('delete from movies where id = $1', 
    [id],(err, result) => {
        if(err){
            throw err   
        }
        res.send('deleted movies')
    })
})

module.exports = router