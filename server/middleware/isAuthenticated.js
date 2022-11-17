require('dotenv').config()

//encode json web token 
const jwt = require('jsonwebtoken')
//
const {SECRET} = process.env

//export isAuthenticated function
module.exports = {
    //express knows the order that req, res, and next are in and knows what they
    // of where they are called in the parenthesis
    isAuthenticated: (req, res, next) => {
        //set up a required header token
        const headerToken = req.get('Authorization')

        //if there is no header token log an 401 error
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }
        //set up token variable
        let token

        //CHECK IF TOKEN IS VERIFIED
        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }
        //if not verified token throw error
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }
        
        // next with move the request along to the appropriate function
        next()
    }
}