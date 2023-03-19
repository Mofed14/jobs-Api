const { UnauthenticatedError } = require('../errors/index');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticationMiddleware = (req, res, next)=> {
    // check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication Invalid')
    }
    const token = authHeader.split(' ')[1]
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        // exclude the password select(-field) use (-) syntax
        // const user = User.findById(payload.id).select('-password')
        // req.user = user
        // console.log(user)
        
        // * attach the user data to the jobs route
        const { userId, name } = payload
        req.user = { userId, name }
        next()
    } catch (error) {
        throw UnauthenticatedError('Authentication Invalid')
    }
}


module.exports = authenticationMiddleware