const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    // ambil req token
    const token = req.headers.authorization
  
    if (!token) {
      return res.status(401).json({
        message: "invalid credential"
      })
    }
    
    // decode
    const decodeToken = jwt.verify(token, 'token')
  
    if (decodeToken.role !== 'admin') {
      return res.status(403).json({
        message: "Unauthorized user"
      })
    }
  
    next()
  }

  module.exports =  authentication ;