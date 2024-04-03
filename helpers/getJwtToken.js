const JWT = require('jsonwebtoken')

const getJwtToken = (userId) => {
    return JWT.sign({userId},process.env.JWT_SECRET, {expiresIn: '1 day'});
}


module.exports = {getJwtToken};