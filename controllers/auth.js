
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors/index')

const register = async (req, res)=> {
    const user = await User.create({...req.body});
    res.status(StatusCodes.CREATED).json( {
        name : user.name,
        token: user.createJWT()
    })
}


const login = async (req, res)=> {
    const {email, password } = req.body
    if(!email || !password){ 
        throw new BadRequestError('Please Provide email and password')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    // compare password
    const isPasswordCorrect = await user.comparePass(password)
    if(isPasswordCorrect === false){ 
        throw new UnauthenticatedError('Invalid Credentials')
    }
    res.status(StatusCodes.OK).json({user: {name: user.name}  , token: user.createJWT() })
}


module.exports = {
    register, login
}