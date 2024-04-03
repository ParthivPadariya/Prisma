const {getJwtToken} = require('../helpers/getJwtToken');


const cookieToken = (user, res) => {
    const {id} = user;
    const token = getJwtToken(id);
    const options = {
        expires: new Date(
            Date.now() + 3 *24 * 60 * 60 * 1000 // ms
        ),
        httpOnly: true // server only cookie user can not be manipulated
    }
    user.password = undefined;
    res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user
    })


}

module.exports = cookieToken