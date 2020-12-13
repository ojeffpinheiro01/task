const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (pass, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(pass, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        obterHash(req.body.pass, hash => {
            const pass = hash

            app.db('users')
                .insert({ 
                    name: req.body.name, 
                    email: req.body.email.toLowerCase(), 
                    pass 
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(400).json(err))
        })
    }

    return { save }
}