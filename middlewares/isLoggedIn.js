const prisma = require('../prisma/index')
const jwt = require('jsonwebtoken')

const isLoggedIn = async (req,res,next) => {
    try {
        
        const token = req.cookies.token;
        // console.log(req,token);
        if (!token) {
            res.json({"message":'Please Login'});
            throw new Error('You are Not login')
        }

        // token present
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
        req.user = await prisma.user.findUnique({
            where:{
                id: decoded.userId
            }
        })

        next()

    } catch (error) {
        throw new Error(error);
    }
}

module.exports = isLoggedIn
