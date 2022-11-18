require('dotenv').config()
const {User} = require('../models/user')

module.exports = {
    getUserById: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).send(user)
        } catch (error) {
            console.log('ERROR IN getUserById')
            console.log(error)
            res.sendStatus(400)
        }
    }
}