
const prisma = require('../prisma/index')
const cookieToken = require('../utils/cookieToken')


// user signup
exports.signup = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        // check
        if (!name || !email || !password) {
            throw new Error('please provide all field')
        }
        // creating user
        const user = await prisma.user.create({
            data: {
                name:name,
                email,
                password,
            }
        })
        // console.log(user);
        // send user a token
        cookieToken(user, res);

    } catch (error) {
        throw new Error(error)
    }
}

// login
exports.login = async (req,res,next) => {
    try {
        // take info from user
        const {email, password} = req.body;
        // console.log(email,password);
        if (!email || !password) {
            throw new Error("Please provide email and password");
        }

        // find user by email
        const user = await prisma.user.findUnique({
            where: {
                email,
                // password
            }
        })

        // where no user
        if(!user){
            throw new Error("No User FOund");
        }

        if (user.password !== password) {
            throw new Error("password is incorrect");
        }

        cookieToken(user,res);
        
    } catch (error) {
        throw new Error(error);
    }
}

// logout
exports.logout = async (req,res,next) => {
    // clearing cookies
    try {
        res.clearCookie('token');
        res.status(200).json({
            success:true
        })
    } catch (error) {
        throw new Error(error);
    }
}